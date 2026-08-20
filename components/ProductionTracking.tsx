"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CONSENT_KEY = "rinon_cookie_consent";
const VISITOR_KEY = "rinon_analytics_visitor";
const SESSION_KEY = "rinon_analytics_session";
export const ATTRIBUTION_KEY = "rinon_attribution_v1";

declare global { interface Window { dataLayer?: Array<Record<string, unknown>> } }
function hasAnalyticsConsent() { try { const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null"); return saved?.value === "all"; } catch { return false; } }
function getAnonymousId(storage: Storage, key: string) { const saved = storage.getItem(key); if (saved) return saved; const value = crypto.randomUUID().replaceAll("-", ""); storage.setItem(key, value); return value; }
function storeAttribution(){
  try{
    const params=new URLSearchParams(window.location.search);
    const values={utm_source:params.get("utm_source")||undefined,utm_medium:params.get("utm_medium")||undefined,utm_campaign:params.get("utm_campaign")||undefined,utm_content:params.get("utm_content")||undefined,utm_term:params.get("utm_term")||undefined,gclid:params.get("gclid")||undefined};
    if(Object.values(values).some(Boolean))sessionStorage.setItem(ATTRIBUTION_KEY,JSON.stringify(values));
  }catch{}
}
function sendAnalyticsEvent(eventName: "page_view" | "contact_whatsapp" | "contact_phone" | "generate_lead") {
  const visitorId = getAnonymousId(localStorage, VISITOR_KEY); const sessionId = getAnonymousId(sessionStorage, SESSION_KEY);
  let referrerHost = ""; try { referrerHost = document.referrer ? new URL(document.referrer).hostname : ""; } catch {}
  const payload = JSON.stringify({ eventName, pagePath: window.location.pathname, pageTitle: document.title, referrerHost, visitorId, sessionId });
  if (navigator.sendBeacon) navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
  else void fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true });
}

export function ProductionTracking() {
  const rawGtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const rawClarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const gtmId = rawGtmId && /^GTM-[A-Z0-9]+$/i.test(rawGtmId) ? rawGtmId : undefined;
  const clarityId = rawClarityId && /^[a-z0-9]+$/i.test(rawClarityId) ? rawClarityId : undefined;
  const pathname = usePathname(); const [enabled, setEnabled] = useState(false);
  useEffect(() => { const syncConsent = () => setEnabled(hasAnalyticsConsent()); syncConsent(); window.addEventListener("rinon-cookie-consent", syncConsent); return () => window.removeEventListener("rinon-cookie-consent", syncConsent); }, []);
  useEffect(() => { if (!enabled) return; storeAttribution(); sendAnalyticsEvent("page_view"); }, [enabled, pathname]);
  useEffect(() => {
    if (!enabled) return;
    const trackClick = (event: MouseEvent) => {
      const target=(event.target as HTMLElement); const link=target.closest<HTMLAnchorElement>("a"); const tracked=target.closest<HTMLElement>("[data-event]");
      if(tracked){const eventName=tracked.dataset.event;if(eventName && !["whatsapp_click"].includes(eventName)){window.dataLayer=window.dataLayer??[];window.dataLayer.push({event:eventName,page_path:window.location.pathname,cta_location:tracked.dataset.ctaLocation||"unknown",quote_category:tracked.dataset.quoteCategory||undefined});}}
      if (!link) return; const href=link.href;
      const eventName = href.includes("wa.me/") ? "contact_whatsapp" : href.startsWith("tel:") ? "contact_phone" : null;
      if (!eventName) return; window.dataLayer=window.dataLayer??[];window.dataLayer.push({event:eventName,page_path:window.location.pathname,link_text:link.textContent?.trim().slice(0,80)||eventName,quote_category:tracked?.dataset.quoteCategory||undefined,cta_location:tracked?.dataset.ctaLocation||undefined}); sendAnalyticsEvent(eventName);
    };
    const trackForm = () => { window.dataLayer=window.dataLayer??[]; window.dataLayer.push({event:"generate_lead",page_path:window.location.pathname}); sendAnalyticsEvent("generate_lead"); };
    const semantic=(event:Event)=>{const detail=(event as CustomEvent<Record<string,unknown>>).detail||{};const eventName=detail.event;if(typeof eventName!=="string"||eventName==="generate_lead")return;const allowed={event:eventName,page_path:window.location.pathname,quote_category:typeof detail.quote_category==="string"?detail.quote_category:undefined,cta_location:typeof detail.cta_location==="string"?detail.cta_location:undefined,file_type:typeof detail.file_type==="string"?detail.file_type:undefined,file_size_bucket:typeof detail.file_size_bucket==="string"?detail.file_size_bucket:undefined,lead_transport:typeof detail.lead_transport==="string"?detail.lead_transport:undefined};window.dataLayer=window.dataLayer??[];window.dataLayer.push(allowed);};
    document.addEventListener("click",trackClick); window.addEventListener("rinon-lead-submitted",trackForm); window.addEventListener("rinon-semantic-event",semantic);
    return()=>{document.removeEventListener("click",trackClick);window.removeEventListener("rinon-lead-submitted",trackForm);window.removeEventListener("rinon-semantic-event",semantic)};
  },[enabled]);
  if (!enabled) return null;
  return <>
    {gtmId ? <><Script id="gtm-data-layer" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`}</Script><Script id="google-tag-manager" src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} strategy="afterInteractive" /></> : null}
    {clarityId ? <Script id="microsoft-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}</Script> : null}
  </>;
}
