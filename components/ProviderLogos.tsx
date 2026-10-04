export const AI_PLATFORMS = [
  { name: 'ChatGPT', mark: 'openai' },
  { name: 'Claude', mark: 'anthropic' },
  { name: 'Gemini', mark: 'gemini' },
  { name: 'Perplexity', mark: 'perplexity' },
  { name: 'Grok', mark: 'xai' },
  { name: 'Google AI Overviews', mark: 'google' },
  { name: 'Google AI Mode', mark: 'google' },
  { name: 'Meta AI', mark: 'meta-ai' },
];
export default function ProviderLogos() {
  return <ul className="provider-logos" aria-label="Eight AI answer platforms">{AI_PLATFORMS.map(p => <li key={p.name} className="provider-logo"><img src={'/images/providers/' + p.mark + '.svg'} alt="" width="21" height="21" loading="lazy" aria-hidden="true" /><span>{p.name}</span></li>)}</ul>;
}