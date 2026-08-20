"use client";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

const baseCategories = [
  ["fabricacion","Fabricación metálica"],
  ["estructuras","Estructura metálica"],
  ["cierres","Cierre / reja / portón"],
  ["camarotes","Cama / camarote"],
  ["equipamiento","Equipamiento metálico"],
  ["especiales","Fabricación especial"],
] as const;
const ATTRIBUTION_KEY="rinon_attribution_v1";
const detailLabels:Record<string,string>={reja:"Reja",porton:"Portón",cierre:"Cierre perimetral",camarote_escritorio:"Camarote con escritorio"};

function emit(event:string,payload:Record<string,unknown>={}){ window.dispatchEvent(new CustomEvent("rinon-semantic-event",{detail:{event,...payload}})); }
function attribution(){try{return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY)||"{}") as Record<string,unknown>}catch{return {}}}

export function QuoteForm({leadWriteEnabled=false,powderCoatingEnabled=false}:{leadWriteEnabled?:boolean;powderCoatingEnabled?:boolean}){
 const params=useSearchParams();
 const categories=useMemo(()=>powderCoatingEnabled?[...baseCategories,["pintura","Pintura electrostática"] as const]:baseCategories,[powderCoatingEnabled]);
 const requestedCategory=params.get("category")||"";
 const requestedClient=params.get("client")||"";
 const requestedDetail=params.get("detail")||"";
 const initial=useMemo(()=>requestedCategory==="pintura"&&!powderCoatingEnabled?"":requestedCategory,[requestedCategory,powderCoatingEnabled]);
 const [category,setCategory]=useState(initial);
 const [closureType,setClosureType]=useState(requestedDetail==="reja"?"Reja":requestedDetail==="porton"?"Portón":requestedDetail==="cierre"?"Cierre perimetral":"");
 const [status,setStatus]=useState("");
 const [submitting,setSubmitting]=useState(false);
 const started=useRef(false);
 function start(){if(started.current)return;started.current=true;emit("quote_start",{quote_category:category||"unselected",quote_detail:requestedDetail||"unspecified"})}
 function changeCategory(value:string){setCategory(value);if(value!=="cierres")setClosureType("")}
 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault();const form=e.currentTarget;
   if(!form.checkValidity()){form.reportValidity();setStatus("Revisa los campos obligatorios.");return;}
   if(!leadWriteEnabled){emit("quote_submit_validated",{quote_category:category||"unselected",quote_detail:requestedDetail||"unspecified",lead_transport:"preview_validation_only"});setStatus("Formulario revisado correctamente. En este modo de demostración los datos no se envían ni se guardan.");return;}
   setSubmitting(true);setStatus("Enviando solicitud…");
   try{
     const fd=new FormData(form);const payload:Record<string,unknown>={};
     for(const [key,value] of fd.entries()){if(typeof value==="string" && key!=="privacidad")payload[key]=value;}
     payload.acepta_privacidad=fd.get("privacidad")==="on";
     payload.pagina_origen=window.location.pathname;
     Object.assign(payload,attribution());
     const response=await fetch("/api/contacto",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
     const result=await response.json().catch(()=>({}));
     if(!response.ok)throw new Error(typeof result?.error==="string"?result.error:"No pudimos enviar tu solicitud.");
     window.dispatchEvent(new Event("rinon-lead-submitted"));
     setStatus("Solicitud recibida. Te contactaremos usando los datos enviados.");
     form.reset();setCategory("");setClosureType("");started.current=false;
   }catch(error){setStatus(error instanceof Error?error.message:"No pudimos enviar tu solicitud. Intenta por WhatsApp.")}
   finally{setSubmitting(false)}
 }
 const requestedDetailLabel=detailLabels[requestedDetail]||"";
 return <form className="quote-form" onSubmit={submit} onFocusCapture={start} noValidate={false}>
  <div className="honeypot" aria-hidden="true"><label>Website<input name="empresa_web" tabIndex={-1} autoComplete="off" /></label></div>
  <div className="quote-form-heading wide"><span>01</span><b>Datos de contacto</b><small>Para responder y entender quién solicita la evaluación.</small></div>
  <label>Nombre *<input name="nombre" autoComplete="name" required /></label>
  <label>Tipo de cliente *<select name="tipo_cliente" required defaultValue={requestedClient==="b2b"?"Empresa":""}><option value="" disabled>Selecciona</option><option value="Particular">Particular</option><option value="Empresa">Empresa</option><option value="Institución">Institución</option></select></label>
  <label>Empresa / institución<input name="empresa" autoComplete="organization" /></label>
  {requestedClient==="b2b"?<label>Modalidad<select name="modo_compra" defaultValue="Compra por volumen"><option>Compra por volumen</option><option>Proyecto / obra</option><option>Fabricación bajo plano</option><option>Requerimiento recurrente</option></select></label>:null}
  <label>Correo<input type="email" name="email" autoComplete="email" /></label>
  <label>WhatsApp *<input type="tel" name="telefono" autoComplete="tel" required /></label>

  <div className="quote-form-heading wide"><span>02</span><b>Requerimiento</b><small>La categoría cambia las preguntas para pedir solo antecedentes útiles.</small></div>
  {requestedCategory==="pintura"&&!powderCoatingEnabled?<p className="wide status">Pintura electrostática todavía no está habilitada como categoría de cotización pública. Puedes enviar una consulta general mientras se valida el servicio.</p>:null}
  {requestedDetailLabel?<div className="wide quote-context"><b>Vienes desde:</b><span>{requestedDetailLabel}</span></div>:null}
  <label className="wide">Qué necesitas *<select name="categoria" required value={category} onChange={(e:ChangeEvent<HTMLSelectElement>)=>changeCategory(e.target.value)}><option value="">Selecciona</option>{categories.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
  {(category==="estructuras"||category==="fabricacion"||category==="especiales")&&<><label>¿Tienes plano?<select name="plano"><option>Por definir</option><option>Sí</option><option>No</option></select></label><label>Uso<input name="uso" placeholder="Ej. soporte, plataforma, pieza" /></label><label>Medidas aproximadas<input name="medidas" placeholder="Ej. 2,4 × 1,2 m o referencia" /></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric" /></label></>}
  {category==="cierres"&&<><label>Tipo<select name="tipo_cierre" value={closureType} onChange={(e:ChangeEvent<HTMLSelectElement>)=>setClosureType(e.target.value)}><option value="">Por definir</option><option>Cierre perimetral</option><option>Reja</option><option>Portón</option><option>Otro</option></select></label><label>¿Requiere instalación?<select name="instalacion"><option>Por definir</option><option>Sí</option><option>No</option></select></label>{closureType==="Portón"?<><label>Ancho × alto del vano<input name="medidas" placeholder="Medidas aproximadas" /></label><label>Tipo de apertura<select name="apertura"><option>Por definir</option><option>Corredera</option><option>Abatible</option><option>Otra</option></select></label></>:<><label>Longitud aproximada<input name="longitud" placeholder="Ej. 18 m" /></label><label>Altura aproximada<input name="altura" placeholder="Ej. 1,8 m" /></label></>}</>}
  {category==="camarotes"&&<><label>Modelo / referencia<input name="modelo_referencia" defaultValue={requestedDetail==="camarote_escritorio"?"Camarote con escritorio":""} placeholder="Ej. desmontable, con escritorio" /></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric" /></label><label>Destino / uso<input name="uso" placeholder="Ej. faena, residencia, dormitorio" /></label><label>Espacio o medida relevante<input name="medidas" placeholder="Si aplica" /></label></>}
  {category==="equipamiento"&&<><label>Uso<input name="uso" placeholder="Ej. almacenamiento, apoyo operativo" /></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric" /></label><label>Espacio disponible<input name="medidas" placeholder="Medidas o restricciones" /></label><label>¿Requiere instalación?<select name="instalacion"><option>Por definir</option><option>Sí</option><option>No</option></select></label></>}
  {category==="pintura"&&<><label>Cantidad de piezas<input name="piezas" inputMode="numeric" /></label><label>Estado<select name="estado"><option>Por definir</option><option>Metal nuevo</option><option>Pintado</option><option>Con oxidación</option></select></label></>}
  <label>Ubicación *<input name="ubicacion" autoComplete="address-level2" required /></label><label>Fecha objetivo<input type="date" name="fecha_objetivo" /></label>
  <div className="quote-form-heading wide"><span>03</span><b>Contexto y antecedentes</b><small>No necesitas dominar términos técnicos; describe el uso, medidas y restricciones relevantes.</small></div>
  <label className="wide">Descripción *<textarea name="mensaje" required placeholder="Uso, restricciones, terminación esperada y cualquier antecedente útil" /></label>
  <div className="wide upload-note"><b>¿Tienes plano o foto?</b><span>Menciónalo en la descripción. Te pediremos el archivo durante el seguimiento o puedes compartirlo por WhatsApp; no simulamos un upload mientras el almacenamiento seguro no esté habilitado.</span></div>
  <label className="wide consent"><input type="checkbox" name="privacidad" required /><span>Acepto el uso de estos datos para evaluar y responder mi solicitud. Consulta la <Link href="/politica-de-privacidad">política de privacidad</Link>. *</span></label>
  <button className="button primary wide v5-quote-submit" type="submit" disabled={submitting} data-event="quote_submit_attempt" data-quote-category={category||"unselected"}>{submitting?"Enviando…":"Solicitar evaluación"}</button>
  <div className="wide quote-alt"><span>¿Prefieres conversar primero?</span><WhatsAppCTA category={category || undefined} location="quote_form" label="Abrir WhatsApp" /></div>
  <p className="wide status" aria-live="polite">{status}</p>
 </form>
}
