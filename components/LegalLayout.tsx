import Header from './Header';
import Footer from './Footer';

/**
 * Shared shell for the static legal pages (/privacy, /terms) on the white
 * canvas. Child content is styled via arbitrary child selectors so no
 * typography plugin is required (keeps the static export lightweight).
 */
export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="container-x py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-3">Legal</p>
            <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-navy/70">Last updated: August 2026</p>
            <div className="mt-8 space-y-5 leading-relaxed text-navy/75 [&_a]:font-medium [&_a]:text-[#0369A1] [&_a]:underline [&_h2]:mb-2 [&_h2]:mt-9 [&_h2]:font-sora [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_li]:mt-1.5 [&_strong]:text-navy [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
