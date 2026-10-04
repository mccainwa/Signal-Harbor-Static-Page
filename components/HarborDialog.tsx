'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

/** Native modal semantics: contained focus, Escape, inert background, and focus return. */
export default function HarborDialog({ title, trigger, children, drawer = false, triggerClass = 'harbor-dialog-trigger', fallbackHref }: { title: string; trigger: ReactNode; children: ReactNode; drawer?: boolean; triggerClass?: string; fallbackHref?: string }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const node = dialog.current;
    const previous = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    node.querySelector<HTMLElement>('[data-dialog-title]')?.focus();
    return () => { node.close(); document.body.style.overflow = previous; button.current?.focus(); };
  }, [open]);
  return <>
    {ready ? <button ref={button} type="button" className={triggerClass} aria-haspopup="dialog" onClick={() => setOpen(true)}>{trigger}</button> : <a href={fallbackHref ?? '#founders'} className={triggerClass}>{trigger}</a>}
    <dialog ref={dialog} className={'harbor-dialog ' + (drawer ? 'harbor-dialog-drawer' : '')} aria-labelledby={titleId} onCancel={e => { e.preventDefault(); setOpen(false); }} onClose={() => setOpen(false)} onClick={e => { if (e.target !== e.currentTarget) return; const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) setOpen(false); }}>
      <div className="harbor-dialog-heading"><h2 id={titleId} data-dialog-title tabIndex={-1}>{title}</h2><button type="button" onClick={() => setOpen(false)} className="dialog-close" aria-label="Close panel"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div>
      {children}
    </dialog>
  </>;
}
