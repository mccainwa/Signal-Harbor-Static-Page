import { SITE } from '@/lib/site';

/**
 * Thin trust band under the hero. Shows the AI answer surfaces we audit —
 * NOT client logos (we don't fabricate those). Renders as pill chips.
 */
export default function TrustStrip() {
  return (
    <div className="border-b border-white/10 bg-navy-deep">
      <div className="container-x py-7">
        <p className="text-center text-sm text-white/55">
          We test the AI answer surfaces where customers are already asking for
          recommendations.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {SITE.aiSystems.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-sora text-sm font-semibold tracking-tight text-white/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
