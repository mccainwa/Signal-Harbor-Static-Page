import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, symlink, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a8N8AAAAASUVORK5CYII=', 'base64');

const run = (cwd, url) => new Promise((resolve) => {
  const child = spawn(process.execPath, ['scripts/sync-blog.mjs', url], { cwd });
  let output = '';
  child.stdout.on('data', (chunk) => { output += chunk; });
  child.stderr.on('data', (chunk) => { output += chunk; });
  child.on('close', (code) => resolve({ code, output }));
});

const item = (slug, title, html, description = '') => `<item><title>${title}</title><description>${description}</description><link>https://signalharbor.beehiiv.com/p/${slug}</link><pubDate>Fri, 02 Oct 2026 14:00:00 GMT</pubDate><content:encoded><![CDATA[${html}]]></content:encoded></item>`;

// Exercises the actual CLI against a local feed and new images, without
// changing committed production content or contacting Beehiiv.
test('automatic import handles new images, preserves the archive, and rejects incomplete feeds', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'signal-harbor-blog-'));
  let xml;
  const server = createServer((request, response) => {
    if (request.url === '/feed.xml') {
      response.setHeader('content-type', 'application/xml');
      response.end(xml);
    } else {
      response.setHeader('content-type', 'image/png');
      response.end(png);
    }
  });
  try {
    await mkdir(path.join(directory, 'scripts'));
    await mkdir(path.join(directory, 'content/blog'), { recursive: true });
    await copyFile(path.join(root, 'scripts/sync-blog.mjs'), path.join(directory, 'scripts/sync-blog.mjs'));
    await symlink(path.join(root, 'node_modules'), path.join(directory, 'node_modules'));
    const archived = { slug: 'older-issue', title: 'Older issue', description: 'Older article.', date: '2026-08-01T14:00:00.000Z', displayDate: 'August 1, 2026', sourceUrl: 'https://signalharbor.beehiiv.com/p/older-issue', html: '<p>Previously published article.</p>' };
    const postsPath = path.join(directory, 'content/blog/posts.json');
    await writeFile(postsPath, JSON.stringify([archived]));
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    xml = `<rss xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel>${item('new-issue', 'New issue', `<p>New article body.</p><img src='${base}/image-one.png' alt='A supplied image description'><img src="${base}/image-two.png"><script>alert(1)</script>`)}</channel></rss>`;
    const first = await run(directory, `${base}/feed.xml`);
    assert.equal(first.code, 0, first.output);
    const posts = JSON.parse(await readFile(postsPath, 'utf8'));
    assert.equal(posts.length, 2);
    assert.deepEqual(posts[1], archived);
    assert.equal(posts[0].description, 'New article body.');
    assert.match(posts[0].html, /alt="A supplied image description"/);
    assert.match(posts[0].html, /alt="Image accompanying the article: New issue"/);
    assert.doesNotMatch(posts[0].html, /<script|alert\(1\)/);
    const imageSources = [...posts[0].html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(imageSources).size, 2, 'Different non-Beehiiv URLs must not overwrite one another');
    for (const source of imageSources) assert.deepEqual(await readFile(path.join(directory, 'public', source)), png);
    const snapshot = await readFile(postsPath, 'utf8');
    assert.equal((await run(directory, `${base}/feed.xml`)).code, 0);
    assert.equal(await readFile(postsPath, 'utf8'), snapshot, 'Repeated imports must be deterministic');
    xml = `<rss xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel>${item('invalid-issue', 'Invalid issue', '')}</channel></rss>`;
    assert.notEqual((await run(directory, `${base}/feed.xml`)).code, 0);
    assert.equal(await readFile(postsPath, 'utf8'), snapshot, 'An incomplete feed must not replace published content');
    xml = `<rss xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel>${item('duplicate', 'Duplicate', '<p>Body</p>')}${item('duplicate', 'Duplicate', '<p>Body</p>')}</channel></rss>`;
    assert.notEqual((await run(directory, `${base}/feed.xml`)).code, 0);
    assert.equal(await readFile(postsPath, 'utf8'), snapshot);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
});
