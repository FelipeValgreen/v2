"use client";
import Link from "next/link";
import {KeyboardEvent as ReactKeyboardEvent,useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {aboutNavItem,companyNavItem,isExactNavPath,navigationSection,productNavGroups,projectNavItem,serviceNavItems} from "@/lib/navigation";
import {whatsappUrl} from "@/lib/whatsapp";

export function MobileNav(){
 const [open,setOpen]=useState(false); const pathname=usePathname(); const active=navigationSection(pathname); const toggleRef=useRef<HTMLButtonElement>(null); const panelRef=useRef<HTMLDivElement>(null); const whatsapp=whatsappUrl();
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(!open)return;const prev=document.body.style.overflow;document.body.style.overflow="hidden";window.requestAnimationFrame(()=>panelRef.current?.querySelector<HTMLElement>("a,button,summary")?.focus());const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);window.requestAnimationFrame(()=>toggleRef.current?.focus())}};document.addEventListener("keydown",onKey);return()=>{document.removeEventListener("keydown",onKey);document.body.style.overflow=prev}},[open]);
 function trapFocus(event:ReactKeyboardEvent<HTMLDivElement>){if(event.key!=="Tab")return;const f=Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a,button,summary,[tabindex]:not([tabindex="-1"])')??[]).filter(n=>!n.hasAttribute("disabled"));if(!f.length)return;const first=f[0],last=f[f.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
 return <div className="mobile-nav-wrap prd2-mobile-nav">
  <button ref={toggleRef} type="button" className="mobile-nav-toggle" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"Cerrar menú":"Abrir menú"} onClick={()=>setOpen(value=>!value)}><span aria-hidden="true">Menú</span></button>
  {open?<div ref={panelRef} role="dialog" aria-modal="true" aria-label="Navegación" className="mobile-nav-panel" id="mobile-navigation" onKeyDown={trapFocus}>
   <div className="mobile-nav-top"><Link href="/" onClick={()=>setOpen(false)} aria-label="RINON inicio"><img src="/brand/logo-rinon-horizontal-transparent.png" alt="RINON Soluciones Metálicas" width="174" height="48"/></Link><button type="button" className="mobile-nav-close" onClick={()=>{setOpen(false);window.requestAnimationFrame(()=>toggleRef.current?.focus())}} aria-label="Cerrar menú">×</button></div>
   <div className="mobile-nav-sections">
    <details><summary className={active==="products"?"is-active":undefined}>Productos <span>+</span></summary><div className="mobile-nav-groups">{productNavGroups.map(group=><div key={group.label}><b>{group.label}</b>{group.items.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} key={item.href} href={item.href} data-event="menu_product_click" data-product={item.label} onClick={()=>setOpen(false)}>{item.label}</Link>)}</div>)}</div></details>
   </div>
   <nav className="mobile-nav-primary" aria-label="Navegación móvil principal">
    <Link className={active==="project"?"is-active":undefined} aria-current={isExactNavPath(pathname,projectNavItem.href)?"page":undefined} href={projectNavItem.href} onClick={()=>setOpen(false)}><span>01</span>{projectNavItem.label}</Link>
    <Link className={active==="company"?"is-active":undefined} aria-current={isExactNavPath(pathname,companyNavItem.href)?"page":undefined} href={companyNavItem.href} onClick={()=>setOpen(false)}><span>02</span>{companyNavItem.label}</Link>
   </nav>
   <div className="mobile-nav-sections mobile-nav-services">
    <details><summary className={active==="services"?"is-active":undefined}>Servicios <span>+</span></summary><div className="mobile-nav-groups one">{serviceNavItems.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} key={item.href} href={item.href} data-event="menu_service_click" data-service={item.label} onClick={()=>setOpen(false)}>{item.label}</Link>)}</div></details>
   </div>
   <nav className="mobile-nav-primary mobile-nav-secondary" aria-label="Información de RINON"><Link className={active==="about"?"is-active":undefined} aria-current={isExactNavPath(pathname,aboutNavItem.href)?"page":undefined} href={aboutNavItem.href} onClick={()=>setOpen(false)}><span>03</span>{aboutNavItem.label}</Link></nav>
   <div className="mobile-nav-actions">
    {whatsapp?<a className="mobile-nav-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="contact_whatsapp" data-cta-location="mobile_menu">WhatsApp ↗</a>:null}
    <Link className="mobile-nav-quote" href="/cotizar" data-event="quote_start" data-cta-location="mobile_menu" onClick={()=>setOpen(false)}>Cotizar ↗</Link>
   </div>
  </div>:null}
 </div>
}
