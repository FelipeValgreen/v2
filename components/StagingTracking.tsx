"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function push(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...payload, event_environment: "staging", staging: true });
}

function currentAttribution(){
  try{
    const params=new URLSearchParams(window.location.search);
    return {
      utm_source:params.get("utm_source")||undefined,
      utm_medium:params.get("utm_medium")||undefined,
      utm_campaign:params.get("utm_campaign")||undefined,
      utm_content:params.get("utm_content")||undefined,
      utm_term:params.get("utm_term")||undefined,
      gclid:params.get("gclid")?"present":undefined,
    };
  }catch{return {}}
}

export function StagingTracking(){
 const pathname=usePathname();
 useEffect(()=>{
   // Local/dataLayer mirror only. Production release must preserve the current consent gate before loading analytics vendors.
   push({event:"page_view",page_path:pathname,...currentAttribution()});
 },[pathname]);
 useEffect(()=>{
   const handler=(e:MouseEvent)=>{
     const target=e.target as HTMLElement;
     const tracked=target.closest<HTMLElement>("[data-event]");
     const anchor=target.closest<HTMLAnchorElement>("a");

     if(tracked){
       const eventName=tracked.dataset.event||"interaction";
       const detail={
         event:eventName,
         cta_location:tracked.dataset.ctaLocation||"unknown",
         quote_category:tracked.dataset.quoteCategory||undefined,
         page_path:location.pathname,
         ...currentAttribution(),
       };
       push(detail);
       if(eventName==="whatsapp_click") push({...detail,event:"contact_whatsapp",event_alias_of:eventName});
     }

     if(anchor?.href?.startsWith("tel:")){
       push({event:"contact_phone",page_path:location.pathname,link_text:anchor.textContent?.trim().slice(0,80)||"phone",...currentAttribution()});
     }
   };
   const custom=(e:Event)=>{
     const detail=(e as CustomEvent<Record<string,unknown>>).detail||{};
     push({...detail,page_path:location.pathname,...currentAttribution()});
   };
   document.addEventListener("click",handler);
   window.addEventListener("rinon-semantic-event",custom);
   return()=>{document.removeEventListener("click",handler);window.removeEventListener("rinon-semantic-event",custom)}
 },[]);
 return null;
}
