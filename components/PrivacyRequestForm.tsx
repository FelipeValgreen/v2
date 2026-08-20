"use client";
import { FormEvent, useState } from "react";

const types = [
  ["access", "Acceso a mis datos"],
  ["rectification", "Rectificación / actualización"],
  ["deletion", "Eliminación o supresión"],
  ["opposition", "Oposición o limitación"],
  ["other", "Otra solicitud de privacidad"],
] as const;

export function PrivacyRequestForm(){
  const [status,setStatus]=useState<"idle"|"sending"|"ok"|"error">("idle");
  const [message,setMessage]=useState("");
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); setStatus("sending"); setMessage("");
    const form=event.currentTarget;
    const fd=new FormData(form);
    const payload={
      request_type:String(fd.get("request_type")||""), nombre:String(fd.get("nombre")||""),
      email:String(fd.get("email")||""), telefono:String(fd.get("telefono")||""),
      details:String(fd.get("details")||""), empresa_web:String(fd.get("empresa_web")||""),
      acepta_tratamiento:fd.get("acepta_tratamiento")==="on", source_path:window.location.pathname,
    };
    try{
      const response=await fetch("/api/privacidad",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const data=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(data.error||"No pudimos registrar la solicitud.");
      setStatus("ok"); setMessage("Solicitud recibida. Conserva el contexto y correo utilizados para facilitar el seguimiento."); form.reset();
    }catch(error){setStatus("error"); setMessage(error instanceof Error?error.message:"No pudimos registrar la solicitud.");}
  }
  return <form className="quote-form privacy-request-form" onSubmit={submit} noValidate>
    <div className="form-field"><label htmlFor="privacy-type">Tipo de solicitud</label><select id="privacy-type" name="request_type" required defaultValue=""><option value="" disabled>Selecciona una opción</option>{types.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>
    <div className="form-row"><div className="form-field"><label htmlFor="privacy-name">Nombre</label><input id="privacy-name" name="nombre" autoComplete="name" maxLength={120} required /></div><div className="form-field"><label htmlFor="privacy-email">Correo de respuesta</label><input id="privacy-email" name="email" type="email" autoComplete="email" maxLength={160} required /></div></div>
    <div className="form-field"><label htmlFor="privacy-phone">Teléfono <span>(opcional)</span></label><input id="privacy-phone" name="telefono" autoComplete="tel" maxLength={30}/></div>
    <div className="form-field"><label htmlFor="privacy-details">Describe tu solicitud</label><textarea id="privacy-details" name="details" required minLength={10} maxLength={3000} rows={7} placeholder="Indica qué datos o interacción con RINON quieres revisar. No adjuntes documentos de identidad en este primer contacto." /></div>
    <div className="honeypot" aria-hidden="true"><label>Empresa<input name="empresa_web" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="check-row"><input type="checkbox" name="acepta_tratamiento" required/><span>Autorizo el uso de los datos enviados únicamente para tramitar y responder esta solicitud de privacidad.</span></label>
    <button className="button primary" disabled={status==="sending"} type="submit">{status==="sending"?"Enviando…":"Enviar solicitud"}</button>
    <p className={`form-status ${status}`} role="status" aria-live="polite">{message}</p>
    <p className="field-help">RINON puede solicitar información adicional para verificar identidad cuando sea necesario. No envíes cédula u otros documentos sensibles en el formulario inicial.</p>
  </form>;
}
