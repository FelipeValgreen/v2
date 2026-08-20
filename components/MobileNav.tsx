"use client";
import Image from "next/image";
import Link from "next/link";
import {KeyboardEvent as ReactKeyboardEvent,useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {productNavGroups,serviceNavItems,primaryStandaloneNav} from "@/lib/navigation";

export function MobileNav(){
 const [open,setOpen]=useState(false); const pathname=usePathname(); const toggleRef=useRef<HTMLButtonElement>(null); const panelRef=useRef<HTMLDivElement>(null);
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(!open)return;const prev=document.body.style.overflow;document.body.style.overflow="hidden";window.requestAnimationFrame(()=>panelRef.current?.querySelector<HTMLElement>("a,button,summary")?.focus());const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);window.requestAnimationFrame(()=>toggleRef.current?.focus())}};document.addEventListener("keydown",onKey);return()=>{document.removeEventListener("keydown",onKey);document.body.style.overflow=prev}},[open]);
 function trapFocus(event:ReactKeyboardEvent<HTMLDivElement>){if(event.key!=="Tab")return;const f=Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a,button,summary,[tabindex]:not([tabindex="-1"])')??[]).filter(n=>!n.hasAttribute("disabled"));if(!f.length)return;const first=f[0],last=f[f.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
 return <div className="mobile-nav-wrap prd2-mobile-nav">
  <button ref={toggleRef} type="button" className="mobile-nav-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(true)}><span className="sr-only">Abrir menú</span><span aria-hidden="true">Menú</span></button>
  {open?<div ref={panelRef} role="dialog" aria-modal="true" aria-label="Navegación" className="mobile-nav-panel" id="mobile-navigation" onKeyDown={trapFocus}>
   <div className="mobile-nav-top"><Link href="/" onClick={()=>setOpen(false)} aria-label="RINON inicio"><Image src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width={174} height={48}/></Link><button type="button" className="mobile-nav-close" onClick={()=>{setOpen(false);window.requestAnimationFrame(()=>toggleRef.current?.focus())}} aria-label="Cerrar menú">×</button></div>
   <div className="mobile-nav-sections">
    <details><summary>Productos <span>+</span></summary><div className="mobile-nav-groups">{productNavGroups.map(group=><div key={group.label}><b>{group.label}</b>{group.items.map(item=><Link key={item.href} href={item.href} data-event="menu_product_click" data-product={item.label} onClick={()=>setOpen(false)}>{item.label}</Link>)}</div>)}</div></details>
    <details><summary>Servicios <span>+</span></summary><div className="mobile-nav-groups one">{serviceNavItems.map(item=><Link key={item.href} href={item.href} data-event="menu_service_click" data-service={item.label} onClick={()=>setOpen(false)}>{item.label}</Link>)}</div></details>
   </div>
   <nav aria-label="Navegación móvil">{primaryStandaloneNav.map((item,index)=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)}><span>0{index+1}</span>{item.label}</Link>)}</nav>
   <Link className="mobile-nav-quote" href="/cotizar" data-event="quote_start" data-cta-location="mobile_menu" onClick={()=>setOpen(false)}>Cotizar proyecto ↗</Link>
  </div>:null}
 </div>
}
