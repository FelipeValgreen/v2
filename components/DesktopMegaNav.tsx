"use client";

import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {aboutNavItem,companyNavItem,isExactNavPath,navigationSection,productNavGroups,projectNavItem,serviceNavItems} from "@/lib/navigation";

type MenuName="products"|"services"|null;

export function DesktopMegaNav(){
  const [open,setOpen]=useState<MenuName>(null);
  const pathname=usePathname();
  const active=navigationSection(pathname);
  const wrapRef=useRef<HTMLDivElement>(null);
  const productTriggerRef=useRef<HTMLButtonElement>(null);
  const serviceTriggerRef=useRef<HTMLButtonElement>(null);
  const [ready,setReady]=useState(false);
  useEffect(()=>setReady(true),[]);
  useEffect(()=>setOpen(null),[pathname]);
  useEffect(()=>{
    const onPointer=(event:MouseEvent)=>{if(open&&!wrapRef.current?.contains(event.target as Node))setOpen(null)};
    const onKey=(event:KeyboardEvent)=>{
      if(event.key!=="Escape"||!open)return;
      const trigger=open==="products"?productTriggerRef.current:serviceTriggerRef.current;
      setOpen(null);
      window.requestAnimationFrame(()=>trigger?.focus());
    };
    document.addEventListener("mousedown",onPointer);document.addEventListener("keydown",onKey);
    return()=>{document.removeEventListener("mousedown",onPointer);document.removeEventListener("keydown",onKey)};
  },[open]);
  const closeMenu=()=>setOpen(null);
  return <div className="prd2-desktop-nav-shell" ref={wrapRef}>
    <nav className="prd2-desktop-nav" aria-label="Principal">
      <button ref={productTriggerRef} type="button" aria-haspopup="true" data-nav-ready={ready?"true":"false"} className={[open==="products"?"is-open":"",active==="products"?"is-active":""].filter(Boolean).join(" ")} aria-expanded={open==="products"} aria-controls="mega-products" onClick={()=>setOpen(open==="products"?null:"products")}>Productos <span aria-hidden="true">⌄</span></button>
      <Link className={active==="project"?"is-active":undefined} aria-current={isExactNavPath(pathname,projectNavItem.href)?"page":undefined} href={projectNavItem.href}>{projectNavItem.label}</Link>
      <Link className={active==="company"?"is-active":undefined} aria-current={isExactNavPath(pathname,companyNavItem.href)?"page":undefined} href={companyNavItem.href}>{companyNavItem.label}</Link>
      <button ref={serviceTriggerRef} type="button" aria-haspopup="true" data-nav-ready={ready?"true":"false"} className={[open==="services"?"is-open":"",active==="services"?"is-active":""].filter(Boolean).join(" ")} aria-expanded={open==="services"} aria-controls="mega-services" onClick={()=>setOpen(open==="services"?null:"services")}>Servicios <span aria-hidden="true">⌄</span></button>
      <Link className={active==="about"?"is-active":undefined} aria-current={isExactNavPath(pathname,aboutNavItem.href)?"page":undefined} href={aboutNavItem.href}>{aboutNavItem.label}</Link>
    </nav>
    {open==="products"?<div className="prd2-mega-menu prd2-mega-products" id="mega-products" role="region" aria-label="Productos RINON">
      <div className="prd2-mega-grid">
        {productNavGroups.map(group=><div className="prd2-mega-group" key={group.label}><span>{group.label}</span>{group.items.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} data-event="menu_product_click" data-product={item.label} key={item.href} href={item.href} onClick={closeMenu}><strong>{item.label}</strong><small>{item.description}</small></Link>)}</div>)}
      </div>
      <Link className="prd2-mega-all" href="/soluciones" onClick={closeMenu}>Ver todos los productos <span>↗</span></Link>
    </div>:null}
    {open==="services"?<div className="prd2-mega-menu prd2-mega-services" id="mega-services" role="region" aria-label="Servicios RINON">
      <div className="prd2-service-grid">{serviceNavItems.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} data-event="menu_service_click" data-service={item.label} key={item.href} href={item.href} onClick={closeMenu}><strong>{item.label}</strong><small>{item.description}</small><span>↗</span></Link>)}</div>
    </div>:null}
  </div>;
}
