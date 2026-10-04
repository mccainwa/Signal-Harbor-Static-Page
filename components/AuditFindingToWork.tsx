export default function AuditFindingToWork() {
  return <figure className="frame">
    <div className="frame-bar"><img src="/signal-harbor-emblem.png" alt="" width="18" height="22" className="h-5 w-auto" /><span className="text-xs font-semibold text-harbor">From evidence to execution</span></div>
    <ol className="grid md:grid-cols-2">
      <li className="relative p-6 sm:p-8">
        <p className="portal-kicker">Insights</p>
        <h3 className="mt-3 font-sora text-xl font-bold text-navy">Where are buyers overlooking you?</h3>
        <div className="my-6 flex items-center gap-3" aria-hidden="true"><span className="grid h-14 w-14 place-items-center rounded-full border border-[#B8DFEF] bg-[#E8F7FE] text-2xl text-harbor">?</span><div className="h-px flex-1 bg-gradient-to-r from-blue to-[#D4E9F3]" /><span className="grid h-14 w-14 place-items-center rounded-xl bg-[#F0F8FC] text-2xl text-harbor">↗</span></div>
        <ul className="space-y-3 text-sm text-navy/80">{['Buyer questions and recorded answers', 'Competitors named in the answer', 'Sources behind the recommendation'].map(t => <li key={t} className="flex gap-3"><span className="text-harbor" aria-hidden="true">✓</span>{t}</li>)}</ul>
      </li>
      <li className="border-t border-[#DDECF4] bg-[#F3FAFE] p-6 sm:p-8 md:border-l md:border-t-0">
        <p className="portal-kicker">Campaign</p>
        <h3 className="mt-3 font-sora text-xl font-bold text-navy">Turn the gap into prepared work.</h3>
        <div className="mt-5 rounded-xl border border-[#D3E8F3] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(0,140,195,.4)]"><p className="text-sm font-bold text-navy">Content built for your buyers</p><p className="mt-2 text-sm text-navy/75">A clear answer. Supported facts. Your review.</p><div className="paper-lines" aria-hidden="true"><span /><span /><span /></div><p className="text-xs font-semibold text-harbor">Prioritize <span className="mx-2" aria-hidden="true">→</span> Prepare <span className="mx-2" aria-hidden="true">→</span> Review</p></div>
      </li>
    </ol>
  </figure>;
}
