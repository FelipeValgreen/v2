"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
const KEY = "rinon_cookie_consent";

type Choice = "necessary" | "all";
const OPTIONAL_LOCAL_KEYS = ["rinon_analytics_visitor"];
const OPTIONAL_SESSION_KEYS = ["rinon_analytics_session", "rinon_attribution_v1"];
const OPTIONAL_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_gcl", "_clck", "_clsk"];

function clearOptionalMeasurementStorage() {
  try { OPTIONAL_LOCAL_KEYS.forEach((key) => localStorage.removeItem(key)); } catch {}
  try { OPTIONAL_SESSION_KEYS.forEach((key) => sessionStorage.removeItem(key)); } catch {}
  try {
    const names = document.cookie.split(";").map((item) => item.split("=")[0]?.trim()).filter(Boolean) as string[];
    const domains: Array<string | null> = [null, location.hostname, ".rinon.cl"];
    for (const name of names) {
      if (!OPTIONAL_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) continue;
      for (const domain of domains) {
        const domainPart = domain ? `; Domain=${domain}` : "";
        document.cookie = `${name}=; Max-Age=0; Path=/${domainPart}; SameSite=Lax`;
      }
    }
  } catch {}
}

function savedChoice(): Choice | null {
  try { const saved=JSON.parse(localStorage.getItem(KEY)??"null"); return saved?.value==="all"||saved?.value==="necessary"?saved.value:null; } catch { return null; }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [choice,setChoice]=useState<Choice|null>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => { const saved=savedChoice(); setChoice(saved); setVisible(!saved); }, 0);
    const open=()=>setVisible(true);
    window.addEventListener("rinon-open-cookie-preferences",open);
    return () => { window.clearTimeout(timer); window.removeEventListener("rinon-open-cookie-preferences",open); };
  }, []);

  function choose(value: Choice) {
    const previous=savedChoice();
    localStorage.setItem(KEY, JSON.stringify({ value, date: new Date().toISOString() }));
    setChoice(value); setVisible(false);
    if(value==="necessary") clearOptionalMeasurementStorage();
    window.dispatchEvent(new CustomEvent("rinon-cookie-consent", { detail: value }));
    if(previous==="all"&&value==="necessary")window.location.reload();
  }

  if (!visible) return <button className="cookie-reopen" type="button" onClick={()=>setVisible(true)} aria-label="Abrir preferencias de cookies">Cookies{choice?` · ${choice==="all"?"medición aceptada":"solo necesarias"}`:""}</button>;

  return <aside aria-label="Preferencias de cookies" className="cookie-consent">
    <h2>Tu privacidad importa</h2>
    <p>Usamos almacenamiento necesario para recordar tus preferencias. La medición opcional se activa solo si la aceptas.</p>
    <div className="cookie-actions"><button onClick={() => choose("all")} className="button primary">Aceptar medición</button><button onClick={() => choose("necessary")} className="button secondary">Solo necesarias</button><Link href="/politica-de-cookies">Ver política</Link></div>
  </aside>;
}
