"use client";

import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {productNavGroups,serviceNavItems,primaryStandaloneNav} from "@/lib/navigation";

type MenuName="products"|"services"|null;

export function DesktopMegaNav(){
  const [open,setOpen]=useState<MenuName>(null);
  const pathname=usePathname();
  const wrapRef=useRef<HTMLDivElement>(null);
  useEffect(()=>setOpen(null),[pathname]);
  useEffect(()=>{
    const onPointer=(event:MouseEvent)=>{if(open&&!wrapRef.current?.contains(event.target as Node))setOpen(null)};
    const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(null)};
    document.addEventListener("mousedown",onPointer);document.addEventListener("keydown",onKey);
    return()=>{document.removeEventListener("mousedown",onPointer);document.removeEventListener("keydown",onKey)};
  },[open]);
  return <div className="prd2-desktop-nav-shell" ref={wrapRef}>
    <nav className="prd2-desktop-nav" aria-label="Principal">
      <button type="button" className={open==="products"?"is-open":""} aria-expanded={open==="products"} aria-controls="mega-products" onClick={()=>setOpen(open==="products"?null:"products")}>Productos <span aria-hidden="true">⌄</span></button>
      <button type="button" className={open==="services"?"is-open":""} aria-expanded={open==="services"} aria-controls="mega-services" onClick={()=>setOpen(open==="services"?null:"services")}>Servicios <span aria-hidden="true">⌄</span></button>
      {primaryStandaloneNav.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}
    </nav>
    {open==="products"?<div className="prd2-mega-menu prd2-mega-products" id="mega-products" role="region" aria-label="Productos RINON">
      <div className="prd2-mega-grid">
        {productNavGroups.map(group=><div className="prd2-mega-group" key={group.label}><span>{group.label}</span>{group.items.map(item=><Link data-event="menu_product_click" data-product={item.label} key={item.href} href={item.href}><strong>{item.label}</strong><small>{item.description}</small></Link>)}</div>)}
      </div>
      <Link className="prd2-mega-all" href="/soluciones">Ver todas las soluciones <span>↗</span></Link>
    </div>:null}
    {open==="services"?<div className="prd2-mega-menu prd2-mega-services" id="mega-services" role="region" aria-label="Servicios RINON">
      <div className="prd2-service-grid">{serviceNavItems.map(item=><Link data-event="menu_service_click" data-service={item.label} key={item.href} href={item.href}><strong>{item.label}</strong><small>{item.description}</small><span>↗</span></Link>)}</div>
    </div>:null}
  </div>;
}
