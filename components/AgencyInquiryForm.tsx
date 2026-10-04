'use client';

import Link from 'next/link';
import { useId, useRef, useState, type FormEvent } from 'react';
import { SITE } from '@/lib/site';
import { analyticsEnabled, track } from '@/lib/analytics';

/** Public endpoint only. Delivery credentials and recipient routing belong to the service. */
const ENDPOINT = process.env.NEXT_PUBLIC_AGENCY_FORM_ENDPOINT ?? `https://formsubmit.co/ajax/${SITE.email}`;
const POST_ACTION = ENDPOINT.replace('formsubmit.co/ajax/', 'formsubmit.co/');

export default function AgencyInquiryForm() {
  const prefix = useId();
  const form = useRef<HTMLFormElement>(null);
  const sending = useRef(false);
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(sending.current) return;
    const node = e.currentTarget;
    if(!node.reportValidity()) return;
    const fields = new FormData(node);
    if(fields.get('_honey')) return;
    sending.current = true; setStatus('sending');
    const controller = new AbortController(); const timer = window.setTimeout(()=>controller.abort(),20000);
    try {
      if(!ENDPOINT) throw new Error('No delivery endpoint');
      const payload = Object.fromEntries(fields.entries());
      const response = await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
      const body = await response.json();
      if(!response.ok || !(body.success===true || body.success==='true') || body.error || /activat|confirm your email/i.test(String(body.message??''))) throw new Error('Delivery was not accepted');
      setStatus('sent');node.reset();if(analyticsEnabled())track('agency_inquiry_submitted',{form_type:'agency'});
    } catch {setStatus('error');} finally {window.clearTimeout(timer);sending.current=false;}
  }
  if(status==='sent') return <div className="inquiry-success" role="status"><span aria-hidden="true">✓</span><h3>Thanks. Let’s build your agency program.</h3><p>Your inquiry has been submitted. The Signal Harbor team will follow up using the email you provided.</p><button type="button" className="harbor-text-link" onClick={()=>setStatus('idle')}>Send another inquiry</button></div>;
  return <form ref={form} onSubmit={submit} action={POST_ACTION} method="post" className="agency-inquiry-form">
    <p className="text-sm leading-relaxed text-navy/85">Tell us a little about your agency. We’ll follow up to discuss your clients, portal needs, and scope.</p>
    <div className="inquiry-fields mt-6"><div><label htmlFor={prefix+'-name'}>Your name</label><input id={prefix+'-name'} name="name" autoComplete="name" required maxLength={100} /></div><div><label htmlFor={prefix+'-email'}>Work email</label><input id={prefix+'-email'} name="email" type="email" autoComplete="email" required maxLength={254} /></div><div><label htmlFor={prefix+'-agency'}>Agency name</label><input id={prefix+'-agency'} name="agency" autoComplete="organization" required maxLength={150} /></div><div><label htmlFor={prefix+'-clients'}>Client companies <span>(optional)</span></label><select id={prefix+'-clients'} name="client_companies" defaultValue=""><option value="">Choose a range</option><option>1 to 5</option><option>6 to 20</option><option>21 to 50</option><option>51+</option><option>Still exploring</option></select></div><div className="inquiry-message"><label htmlFor={prefix+'-message'}>What would you like to build? <span>(optional)</span></label><textarea id={prefix+'-message'} name="message" rows={3} maxLength={2000} /></div></div>
    <div hidden aria-hidden="true"><label htmlFor={prefix+'-honey'}>Leave this blank</label><input id={prefix+'-honey'} name="_honey" tabIndex={-1} autoComplete="off" /></div><input type="hidden" name="_subject" value="Signal Harbor agency partnership inquiry" /><input type="hidden" name="_template" value="table" />
    <p className="mt-4 text-xs leading-relaxed text-navy/80">We use these details to respond to your inquiry. <Link href="/privacy/" className="font-semibold text-harbor underline underline-offset-2">Privacy policy</Link>.</p>
    {status==='error'&&<p className="inquiry-error mt-4" role="alert">We couldn’t confirm that your inquiry was sent. Your details are still here. Please try again, or <a href={SITE.mailto}>contact Signal Harbor</a>.</p>}
    <button type="submit" disabled={status==='sending'} className="harbor-form-submit mt-6">{status==='sending'?'Sending…':'Send agency inquiry'}<span aria-hidden="true">→</span></button>
  </form>;
}
