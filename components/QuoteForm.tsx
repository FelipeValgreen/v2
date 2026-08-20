"use client";
import {ChangeEvent,FormEvent,useMemo,useRef,useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {WhatsAppCTA} from "@/components/WhatsAppCTA";

const baseCategories=[
 ["camarotes","Camas / camarotes"],["equipamiento","Mesas / escritorios / equipamiento"],["cierres","Cierre / reja / portón / malla"],["estructuras","Estructura metálica"],["fabricacion","Fabricación / soldadura / corte / reparación"],["especiales","Fabricación especial"],
] as const;
const ATTRIBUTION_KEY="rinon_attribution_v1";
const detailLabels:Record<string,string>={
 reja:"Reja",porton:"Portón",cierre:"Cierre perimetral",camarote_escritorio:"Camarote con escritorio",malla_3d:"Malla 3D",mallas_separadoras:"Mallas separadoras",camarote_nido:"Camarote nido",camarote_triple:"Camarote triple",camarote_desmontable:"Camarote desmontable",camarote_2_plazas:"Camarote 2 plazas",camarote_plaza_media:"Camarote plaza y media",
 "camas-metalicas":"Camas metálicas","camas-balinesas":"Camas balinesas","mesas-metalicas":"Mesas metálicas","escritorios-metalicos":"Escritorios metálicos","soldadura-mig":"Soldadura MIG","corte-metalico":"Corte metálico",instalacion:"Instalación","reparaciones-metalicas":"Reparaciones metálicas",
};
function emit(event:string,payload:Record<string,unknown>={}){window.dispatchEvent(new CustomEvent("rinon-semantic-event",{detail:{event,...payload}}))}
function attribution(){try{return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY)||"{}") as Record<string,unknown>}catch{return {}}}

export function QuoteForm({leadWriteEnabled=false,powderCoatingEnabled=false}:{leadWriteEnabled?:boolean;powderCoatingEnabled?:boolean}){
 const params=useSearchParams();
 const categories=useMemo(()=>powderCoatingEnabled?[...baseCategories,["pintura","Pintura electrostática"] as const]:baseCategories,[powderCoatingEnabled]);
 const requestedCategory=params.get("category")||"";const requestedClient=params.get("client")||"";const requestedDetail=params.get("detail")||"";
 const initialCategory=useMemo(()=>requestedCategory==="pintura"&&!powderCoatingEnabled?"":requestedCategory,[requestedCategory,powderCoatingEnabled]);
 const initialRequestType=requestedClient==="b2b"?"Empresa":requestedCategory?["fabricacion","estructuras","especiales"].includes(requestedCategory)?"Proyecto a medida":"Producto":"";
 const [requestType,setRequestType]=useState(initialRequestType);const [clientType,setClientType]=useState(requestedClient==="b2b"?"Empresa":"");const [category,setCategory]=useState(initialCategory);
 const [closureType,setClosureType]=useState(requestedDetail==="reja"?"Reja":requestedDetail==="porton"?"Portón":requestedDetail==="cierre"?"Cierre perimetral":requestedDetail==="malla_3d"?"Malla 3D":requestedDetail==="mallas_separadoras"?"Mallas separadoras":"");
 const [status,setStatus]=useState("");const [submitting,setSubmitting]=useState(false);const started=useRef(false);
 function start(){if(started.current)return;started.current=true;emit("quote_start",{quote_category:category||"unselected",quote_detail:requestedDetail||"unspecified",request_type:requestType||"unselected"})}
 function changeCategory(value:string){setCategory(value);if(value!=="cierres")setClosureType("");emit("quote_step",{quote_step:"category",quote_category:value})}
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;if(!form.checkValidity()){form.reportValidity();setStatus("Revisa los campos obligatorios.");return}if(!leadWriteEnabled){emit("quote_submit_validated",{quote_category:category||"unselected",quote_detail:requestedDetail||"unspecified",lead_transport:"preview_validation_only"});setStatus("Formulario revisado correctamente. En este modo de demostración los datos no se envían ni se guardan.");return}setSubmitting(true);setStatus("Enviando solicitud…");try{const fd=new FormData(form);const payload:Record<string,unknown>={};for(const [key,value] of fd.entries()){if(typeof value==="string"&&key!=="privacidad")payload[key]=value}payload.acepta_privacidad=fd.get("privacidad")==="on";payload.pagina_origen=window.location.pathname;Object.assign(payload,attribution());const response=await fetch("/api/contacto",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(typeof result?.error==="string"?result.error:"No pudimos enviar tu solicitud.");window.dispatchEvent(new Event("rinon-lead-submitted"));emit("quote_submit",{quote_category:category,request_type:requestType});setStatus("Solicitud recibida. Te contactaremos usando los datos enviados.");form.reset();setRequestType("");setClientType("");setCategory("");setClosureType("");started.current=false}catch(error){setStatus(error instanceof Error?error.message:"No pudimos enviar tu solicitud. Intenta por WhatsApp.")}finally{setSubmitting(false)}}
 const requestedDetailLabel=detailLabels[requestedDetail]||requestedDetail.replaceAll("_"," ").replaceAll("-"," ");
 return <form className="quote-form rinon-quote-flow" onSubmit={submit} onFocusCapture={start}>
  <div className="honeypot" aria-hidden="true"><label>Website<input name="empresa_web" tabIndex={-1} autoComplete="off"/></label></div>
  <input type="hidden" name="detalle_origen" value={requestedDetail}/>
  <div className="quote-progress wide" aria-label="Etapas de cotización"><span className="active"><b>01</b>Requerimiento</span><span><b>02</b>Contexto</span><span><b>03</b>Contacto</span></div>

  <div className="quote-form-heading wide"><span>01</span><b>Qué necesitas</b><small>Primero ubicamos el requerimiento. Después pedimos solo el contexto que aporta.</small></div>
  {requestedDetailLabel?<div className="wide quote-context"><b>Vienes desde:</b><span>{requestedDetailLabel}</span></div>:null}
  <label>Tipo de solicitud *<select name="tipo_solicitud" required value={requestType} onChange={e=>{setRequestType(e.target.value);emit("quote_step",{quote_step:"request_type",request_type:e.target.value})}}><option value="">Selecciona</option><option value="Producto">Producto</option><option value="Proyecto a medida">Proyecto a medida</option><option value="Empresa">Empresa / volumen</option></select></label>
  <label>Producto o servicio *<select name="categoria" required value={category} onChange={(e:ChangeEvent<HTMLSelectElement>)=>changeCategory(e.target.value)}><option value="">Selecciona</option>{categories.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
  {category==="cierres"&&<><label>Tipo<select name="tipo_cierre" value={closureType} onChange={(e:ChangeEvent<HTMLSelectElement>)=>setClosureType(e.target.value)}><option value="">Por definir</option><option>Cierre perimetral</option><option>Reja</option><option>Portón</option><option>Malla 3D</option><option>Mallas separadoras</option><option>Otro</option></select></label><label>¿Requiere instalación?<select name="instalacion"><option>Por definir</option><option>Sí</option><option>No</option></select></label>{closureType==="Portón"?<><label>Ancho × alto del vano<input name="medidas" placeholder="Medidas aproximadas"/></label><label>Tipo de apertura<select name="apertura"><option>Por definir</option><option>Corredera</option><option>Abatible</option><option>Otra</option></select></label></>:<><label>Longitud aproximada<input name="longitud" placeholder="Ej. 18 m"/></label><label>Altura aproximada<input name="altura" placeholder="Ej. 1,8 m"/></label></>}</>}
  {category==="camarotes"&&<><label>Modelo / referencia<input name="modelo_referencia" defaultValue={requestedDetailLabel} placeholder="Ej. cama, nido, desmontable"/></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric"/></label><label>Destino / uso<input name="uso" placeholder="Ej. hogar, faena, residencia"/></label><label>Espacio o medida relevante<input name="medidas" placeholder="Si aplica"/></label></>}
  {category==="equipamiento"&&<><label>Referencia<input name="modelo_referencia" defaultValue={requestedDetailLabel} placeholder="Ej. mesa, escritorio, rack"/></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric"/></label><label>Medidas / espacio<input name="medidas" placeholder="Medidas o restricciones"/></label><label>Uso<input name="uso" placeholder="Hogar, oficina, operación"/></label></>}
  {(category==="estructuras"||category==="fabricacion"||category==="especiales")&&<><label>¿Tienes plano?<select name="plano"><option>Por definir</option><option>Sí</option><option>No</option></select></label><label>Uso<input name="uso" placeholder="Ej. cobertizo, soporte, reparación"/></label><label>Medidas aproximadas<input name="medidas" placeholder="Ej. 2,4 × 1,2 m"/></label><label>Cantidad aproximada<input name="cantidad" inputMode="numeric"/></label></>}
  {category==="pintura"&&<><label>Cantidad de piezas<input name="piezas" inputMode="numeric"/></label><label>Medidas principales<input name="medidas" placeholder="Dimensiones aproximadas"/></label><label>Estado<select name="estado"><option>Por definir</option><option>Metal nuevo</option><option>Pintado</option><option>Con oxidación</option></select></label><label>Color / terminación<input name="modelo_referencia" placeholder="Si está definido"/></label></>}

  <div className="quote-form-heading wide"><span>02</span><b>Contexto del proyecto</b><small>Medidas, ubicación y una explicación breve ayudan más que una descripción técnica inventada.</small></div>
  <label>Ubicación *<input name="ubicacion" autoComplete="address-level2" required placeholder="Comuna / región"/></label><label>Fecha objetivo<input type="date" name="fecha_objetivo"/></label>
  <label className="wide">Descripción *<textarea name="mensaje" required placeholder="Cuéntanos el uso, restricciones, terminación esperada y cualquier antecedente útil"/></label>
  <div className="wide upload-note"><b>¿Tienes foto, plano o croquis?</b><span>Menciónalo aquí. Te pediremos el archivo durante el seguimiento o puedes compartirlo por WhatsApp mientras el almacenamiento seguro no esté habilitado.</span></div>

  <div className="quote-form-heading wide"><span>03</span><b>Cómo te contactamos</b><small>Solo lo necesario para responder y entender quién solicita la evaluación.</small></div>
  <label>Nombre *<input name="nombre" autoComplete="name" required/></label>
  <label>Tipo de cliente *<select name="tipo_cliente" required value={clientType} onChange={e=>setClientType(e.target.value)}><option value="">Selecciona</option><option value="Particular">Particular</option><option value="Empresa">Empresa</option><option value="Institución">Institución</option></select></label>
  {(clientType==="Empresa"||clientType==="Institución"||requestType==="Empresa")&&<><label>Empresa / institución<input name="empresa" autoComplete="organization"/></label><label>Modalidad<select name="modo_compra" defaultValue={requestedClient==="b2b"?"Compra por volumen":"Por definir"}><option>Por definir</option><option>Compra por volumen</option><option>Proyecto / obra</option><option>Fabricación bajo requerimiento</option><option>Requerimiento recurrente</option></select></label></>}
  <label>WhatsApp *<input type="tel" name="telefono" autoComplete="tel" required/></label><label>Correo<input type="email" name="email" autoComplete="email"/></label>
  <label className="wide consent"><input type="checkbox" name="privacidad" required/><span>Acepto el uso de estos datos para evaluar y responder mi solicitud. Consulta la <Link href="/politica-de-privacidad">política de privacidad</Link>. *</span></label>
  <button className="button primary wide v5-quote-submit" type="submit" disabled={submitting} data-event="quote_submit_attempt" data-quote-category={category||"unselected"}>{submitting?"Enviando…":"Solicitar evaluación"}</button>
  <div className="wide quote-alt"><span>¿Prefieres conversar primero?</span><WhatsAppCTA category={category||undefined} location="quote_form" label="Abrir WhatsApp"/></div>
  <p className="wide status" aria-live="polite">{status}</p>
 </form>
}
