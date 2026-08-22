"use client";
import {ChangeEvent,FormEvent,useMemo,useRef,useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {WhatsAppCTA} from "@/components/WhatsAppCTA";

const baseCategories=[
 ["camarotes","Camas / camarotes"],["equipamiento","Mesas / escritorios / equipamiento"],["cierres","Cierre / reja / portón / malla"],["estructuras","Estructura metálica"],["fabricacion","Fabricación / soldadura / corte / reparación"],["especiales","Fabricación especial"],
] as const;
const ATTRIBUTION_KEY="rinon_attribution_v1";
const MAX_ATTACHMENTS=3;
const MAX_ATTACHMENT_BYTES=5*1024*1024;
const ALLOWED_ATTACHMENT_TYPES=new Set(["image/jpeg","image/png","image/webp","application/pdf"]);
const detailLabels:Record<string,string>={
 reja:"Reja",porton:"Portón",cierre:"Cierre perimetral",camarote_escritorio:"Camarote con escritorio",malla_3d:"Malla 3D",mallas_separadoras:"Mallas separadoras",camarote_nido:"Camarote nido",camarote_triple:"Camarote triple",camarote_desmontable:"Camarote desmontable",camarote_2_plazas:"Camarote 2 plazas",camarote_plaza_media:"Camarote plaza y media",
 "camas-metalicas":"Camas metálicas","camas-balinesas":"Camas balinesas","mesas-metalicas":"Mesas metálicas","escritorios-metalicos":"Escritorios metálicos","soldadura-mig":"Soldadura MIG","corte-metalico":"Corte metálico",instalacion:"Instalación","reparaciones-metalicas":"Reparaciones metálicas",
};
function emit(event:string,payload:Record<string,unknown>={}){window.dispatchEvent(new CustomEvent("rinon-semantic-event",{detail:{event,...payload}}))}
function attribution(){try{return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY)||"{}") as Record<string,unknown>}catch{return {}}}

type QuoteStep=1|2|3;

export function QuoteForm({leadWriteEnabled=false,powderCoatingEnabled=false}:{leadWriteEnabled?:boolean;powderCoatingEnabled?:boolean}){
 const params=useSearchParams();
 const categories=useMemo(()=>powderCoatingEnabled?[...baseCategories,["pintura","Pintura electrostática"] as const]:baseCategories,[powderCoatingEnabled]);
 const requestedCategory=params.get("category")||"";const requestedClient=params.get("client")||"";const requestedDetail=params.get("detail")||"";
 const initialCategory=useMemo(()=>requestedCategory==="pintura"&&!powderCoatingEnabled?"":requestedCategory,[requestedCategory,powderCoatingEnabled]);
 const initialRequestType=requestedClient==="b2b"?"Empresa":requestedCategory?["fabricacion","estructuras","especiales"].includes(requestedCategory)?"Proyecto a medida":"Producto":"";
 const [requestType,setRequestType]=useState(initialRequestType);const [clientType,setClientType]=useState(requestedClient==="b2b"?"Empresa":"");const [category,setCategory]=useState(initialCategory);
 const [closureType,setClosureType]=useState(requestedDetail==="reja"?"Reja":requestedDetail==="porton"?"Portón":requestedDetail==="cierre"?"Cierre perimetral":requestedDetail==="malla_3d"?"Malla 3D":requestedDetail==="mallas_separadoras"?"Mallas separadoras":"");
 const [step,setStep]=useState<QuoteStep>(1);const [status,setStatus]=useState("");const [submitting,setSubmitting]=useState(false);const [attachmentCount,setAttachmentCount]=useState(0);const started=useRef(false);const formRef=useRef<HTMLFormElement>(null);
 function start(){if(started.current)return;started.current=true;emit("quote_start",{quote_category:category||"unselected",quote_detail:requestedDetail||"unspecified",request_type:requestType||"unselected"})}
 function changeCategory(value:string){setCategory(value);if(value!=="cierres")setClosureType("");emit("quote_step",{quote_step:"category",quote_category:value})}
 function validateCurrentStep(){const panel=formRef.current?.querySelector<HTMLElement>(`[data-quote-step="${step}"]`);if(!panel)return true;const controls=[...panel.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>("input,select,textarea")].filter(control=>!control.disabled);for(const control of controls){if(!control.checkValidity()){control.reportValidity();control.focus();setStatus("Completa los campos obligatorios para continuar.");return false}}setStatus("");return true}
 function goTo(next:QuoteStep){setStep(next);setStatus("");emit("quote_step",{quote_step:next===1?"requirement":next===2?"context":"contact",quote_category:category||"unselected",request_type:requestType||"unselected"});requestAnimationFrame(()=>formRef.current?.scrollIntoView({behavior:"smooth",block:"start"}))}
 function advance(){if(!validateCurrentStep())return;goTo(Math.min(3,step+1) as QuoteStep)}
 function changeAttachments(e:ChangeEvent<HTMLInputElement>){const files=[...(e.target.files??[])];if(files.length>MAX_ATTACHMENTS){e.target.value="";setAttachmentCount(0);setStatus(`Puedes adjuntar hasta ${MAX_ATTACHMENTS} archivos.`);return}if(files.some(file=>file.size>MAX_ATTACHMENT_BYTES)){e.target.value="";setAttachmentCount(0);setStatus("Cada archivo puede pesar como máximo 5 MB.");return}if(files.some(file=>!ALLOWED_ATTACHMENT_TYPES.has(file.type))){e.target.value="";setAttachmentCount(0);setStatus("Solo se permiten JPG, PNG, WebP o PDF.");return}setAttachmentCount(files.length);setStatus(files.length?`${files.length} ${files.length===1?"archivo listo":"archivos listos"} para adjuntar.`:"");emit("quote_step",{quote_step:"attachments",attachment_count:files.length,quote_category:category||"unselected"})}
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(step<3){advance();return}const form=e.currentTarget;if(!form.checkValidity()){form.reportValidity();setStatus("Revisa los campos obligatorios.");return}if(!leadWriteEnabled){emit("quote_submit_validated",{quote_category:category||"unselected",quote_detail:requestedDetail||"unspecified",lead_transport:"preview_validation_only",attachment_count:attachmentCount});setStatus("Formulario revisado correctamente. En este modo de demostración los datos no se envían ni se guardan.");return}setSubmitting(true);setStatus("Enviando solicitud…");try{const fd=new FormData(form);fd.set("pagina_origen",window.location.pathname);for(const [key,value] of Object.entries(attribution())){if(typeof value==="string"&&value)fd.set(key,value)}const response=await fetch("/api/contacto",{method:"POST",body:fd});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(typeof result?.error==="string"?result.error:"No pudimos enviar tu solicitud.");window.dispatchEvent(new Event("rinon-lead-submitted"));const uploaded=typeof result?.attachments_uploaded==="number"?result.attachments_uploaded:0;emit("quote_submit",{quote_category:category,request_type:requestType,attachment_count:uploaded});const warning=typeof result?.attachment_warning==="string"?result.attachment_warning:"";setStatus(warning||`Solicitud recibida${uploaded?` con ${uploaded} ${uploaded===1?"archivo adjunto":"archivos adjuntos"}`:""}. Te contactaremos usando los datos enviados.`);form.reset();setRequestType("");setClientType("");setCategory("");setClosureType("");setAttachmentCount(0);setStep(1);started.current=false}catch(error){setStatus(error instanceof Error?error.message:"No pudimos enviar tu solicitud. Intenta por WhatsApp.")}finally{setSubmitting(false)}}
 const requestedDetailLabel=detailLabels[requestedDetail]||requestedDetail.replaceAll("_"," ").replaceAll("-"," ");
 return <form ref={formRef} className="quote-form rinon-quote-flow" noValidate onSubmit={submit} onFocusCapture={start}>
  <div className="honeypot" aria-hidden="true"><label>Website<input name="empresa_web" tabIndex={-1} autoComplete="off"/></label></div>
  <input type="hidden" name="detalle_origen" value={requestedDetail}/>
  <div className="quote-progress wide" aria-label="Etapas de cotización">
   <span className={step===1?"active":step>1?"done":""} aria-current={step===1?"step":undefined}><b>{step>1?"✓":"01"}</b><i>Qué necesitas</i></span>
   <span className={step===2?"active":step>2?"done":""} aria-current={step===2?"step":undefined}><b>{step>2?"✓":"02"}</b><i>Contexto</i></span>
   <span className={step===3?"active":""} aria-current={step===3?"step":undefined}><b>03</b><i>Contacto</i></span>
  </div>

  <fieldset className="quote-step-panel wide" data-quote-step="1" hidden={step!==1}>
   <legend><span>01</span><b>¿Qué necesitas?</b><small>Primero ubicamos tu solicitud. Solo después pedimos los datos que realmente ayudan a cotizar.</small></legend>
   <div className="quote-step-grid">
    {requestedDetailLabel?<div className="wide quote-context"><b>Vienes desde:</b><span>{requestedDetailLabel}</span></div>:null}
    <label>Quiero cotizar *<select name="tipo_solicitud" required value={requestType} onChange={e=>{setRequestType(e.target.value);emit("quote_step",{quote_step:"request_type",request_type:e.target.value})}}><option value="">Selecciona una opción</option><option value="Producto">Un producto</option><option value="Proyecto a medida">Un proyecto a medida</option><option value="Empresa">Compra para empresa / volumen</option></select></label>
    <label>Producto o servicio *<select name="categoria" required value={category} onChange={(e:ChangeEvent<HTMLSelectElement>)=>changeCategory(e.target.value)}><option value="">Selecciona una categoría</option>{categories.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
    {category==="cierres"&&<><label>Tipo<select name="tipo_cierre" value={closureType} onChange={(e:ChangeEvent<HTMLSelectElement>)=>setClosureType(e.target.value)}><option value="">Por definir</option><option>Cierre perimetral</option><option>Reja</option><option>Portón</option><option>Malla 3D</option><option>Mallas separadoras</option><option>Otro</option></select></label><label>¿Requiere instalación?<select name="instalacion"><option>Por definir</option><option>Sí</option><option>No</option></select></label>{closureType==="Portón"?<><label>Ancho × alto del vano<input name="medidas" placeholder="Medidas aproximadas"/></label><label>Tipo de apertura<select name="apertura"><option>Por definir</option><option>Corredera</option><option>Abatible</option><option>Otra</option></select></label></>:<><label>Longitud aproximada<input name="longitud" placeholder="Ej. 18 m"/></label><label>Altura aproximada<input name="altura" placeholder="Ej. 1,8 m"/></label></>}</>}
    {category==="camarotes"&&<><label>Modelo / referencia<input name="modelo_referencia" defaultValue={requestedDetailLabel} placeholder="Ej. cama, nido, desmontable"/></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric"/></label><label>Destino / uso<input name="uso" placeholder="Ej. hogar, faena, residencia"/></label><label>Espacio o medida relevante<input name="medidas" placeholder="Si aplica"/></label></>}
    {category==="equipamiento"&&<><label>Referencia<input name="modelo_referencia" defaultValue={requestedDetailLabel} placeholder="Ej. mesa, escritorio, rack"/></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric"/></label><label>Medidas / espacio<input name="medidas" placeholder="Medidas o restricciones"/></label><label>Uso<input name="uso" placeholder="Hogar, oficina, operación"/></label></>}
    {(category==="estructuras"||category==="fabricacion"||category==="especiales")&&<><label>¿Tienes plano?<select name="plano"><option>Por definir</option><option>Sí</option><option>No</option></select></label><label>Uso<input name="uso" placeholder="Ej. cobertizo, soporte, reparación"/></label><label>Medidas aproximadas<input name="medidas" placeholder="Ej. 2,4 × 1,2 m"/></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric"/></label></>}
    {category==="pintura"&&<><label>Cantidad de piezas<input name="piezas" inputMode="numeric"/></label><label>Medidas principales<input name="medidas" placeholder="Dimensiones aproximadas"/></label><label>Estado<select name="estado"><option>Por definir</option><option>Metal nuevo</option><option>Pintado</option><option>Con oxidación</option></select></label><label>Color / terminación<input name="modelo_referencia" placeholder="Si está definido"/></label></>}
   </div>
   <div className="quote-step-actions"><span>Paso 1 de 3</span><button type="button" className="button primary" onClick={advance}>Continuar <b>→</b></button></div>
  </fieldset>

  <fieldset className="quote-step-panel wide" data-quote-step="2" hidden={step!==2}>
   <legend><span>02</span><b>Danos contexto.</b><small>No necesitas una memoria técnica: ubicación, uso, medidas y una explicación breve suelen ser suficientes.</small></legend>
   <div className="quote-step-grid">
    <label>Ubicación *<input name="ubicacion" autoComplete="address-level2" required placeholder="Comuna / región"/></label><label>Fecha objetivo<input type="date" name="fecha_objetivo"/></label>
    <label className="wide">Cuéntanos qué necesitas resolver *<textarea name="mensaje" required placeholder="Ej. necesito fabricar un cobertizo para dos vehículos, tengo medidas aproximadas y una foto del espacio"/></label>
    <div className="wide quote-upload-shell" aria-label="Adjuntar fotos, planos o PDF"><div><b>Foto, plano o PDF</b><span>Hasta 3 archivos · 5 MB cada uno · JPG, PNG, WebP o PDF.</span></div><label className="quote-file-control">Adjuntar archivos<input type="file" name="attachments" multiple accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf" onChange={changeAttachments}/><small>{attachmentCount?`${attachmentCount} seleccionado${attachmentCount===1?"":"s"}`:"Opcional"}</small></label></div>
   </div>
   <div className="quote-step-actions"><button type="button" className="quote-back" onClick={()=>goTo(1)}>← Atrás</button><span>Paso 2 de 3</span><button type="button" className="button primary" onClick={advance}>Continuar <b>→</b></button></div>
  </fieldset>

  <fieldset className="quote-step-panel wide" data-quote-step="3" hidden={step!==3}>
   <legend><span>03</span><b>¿Cómo te contactamos?</b><small>Pedimos solo los datos necesarios para responder tu solicitud y saber quién está cotizando.</small></legend>
   <div className="quote-step-grid">
    <label>Nombre *<input name="nombre" autoComplete="name" required/></label>
    <label>Tipo de cliente *<select name="tipo_cliente" required value={clientType} onChange={e=>setClientType(e.target.value)}><option value="">Selecciona</option><option value="Particular">Particular</option><option value="Empresa">Empresa</option><option value="Institución">Institución</option></select></label>
    {(clientType==="Empresa"||clientType==="Institución"||requestType==="Empresa")&&<><label>Empresa / institución<input name="empresa" autoComplete="organization"/></label><label>Modalidad<select name="modo_compra" defaultValue={requestedClient==="b2b"?"Compra por volumen":"Por definir"}><option>Por definir</option><option>Compra por volumen</option><option>Proyecto / obra</option><option>Fabricación bajo requerimiento</option><option>Requerimiento recurrente</option></select></label></>}
    <label>WhatsApp *<input type="tel" name="telefono" autoComplete="tel" required placeholder="+56 9 ..."/></label><label>Correo<input type="email" name="email" autoComplete="email"/></label>
    <label className="wide consent"><input type="checkbox" name="privacidad" required/><span>Acepto el uso de estos datos para evaluar y responder mi solicitud. Consulta la <Link href="/politica-de-privacidad">política de privacidad</Link>. *</span></label>
   </div>
   <div className="quote-step-actions quote-step-submit"><button type="button" className="quote-back" onClick={()=>goTo(2)}>← Atrás</button><span>Paso 3 de 3</span><button className="button primary v5-quote-submit" type="submit" disabled={submitting} data-event="quote_submit_attempt" data-quote-category={category||"unselected"}>{submitting?"Enviando…":"Solicitar cotización"}</button></div>
   <div className="quote-alt"><span>¿Prefieres conversar primero?</span><WhatsAppCTA category={category||undefined} location="quote_form" label="Abrir WhatsApp"/></div>
  </fieldset>
  <p className="wide status quote-status" aria-live="polite">{status}</p>
 </form>
}
