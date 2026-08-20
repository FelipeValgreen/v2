import "server-only";
import type { LeadStatus } from "@/lib/leads";

export type Opportunity = {
  id: string;
  lead_id: string | null;
  created_at: string;
  updated_at: string;
  stage: LeadStatus;
  client_type: string | null;
  company_name: string | null;
  category: string;
  requirement_summary: string | null;
  quantity_text: string | null;
  location: string | null;
  target_date: string | null;
  owner: string | null;
  next_action_at: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  landing_page: string | null;
  click_id: string | null;
  estimated_net_sale: number | null;
  estimated_gross_margin: number | null;
  estimated_gross_margin_pct: number | null;
  won_net_sale: number | null;
  won_gross_margin: number | null;
  won_gross_margin_pct: number | null;
  loss_reason: string | null;
  loss_note: string | null;
  won_at: string | null;
  lost_at: string | null;
};

export type QuoteEconomics = {
  id: string;
  opportunity_id: string;
  revision: number;
  status: "draft" | "review" | "issued" | "accepted" | "rejected" | "expired" | "superseded";
  created_at: string;
  issued_at: string | null;
  valid_until: string | null;
  net_sale: number;
  material_cost: number;
  subcontract_cost: number;
  direct_labor_cost: number;
  freight_cost: number;
  installation_cost: number;
  other_direct_cost: number;
  discount_amount: number;
  assumptions: string | null;
  exclusions: string | null;
  payment_terms: string | null;
  lead_time_text: string | null;
  approved_by: string | null;
  direct_cost_total: number;
  gross_margin_amount: number;
  gross_margin_pct: number | null;
};

function config(){
  const url=process.env.SUPABASE_URL; const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key) throw new Error("Supabase no está configurado");
  return {url:url.replace(/\/$/,""),key};
}
function headers(key:string){return {apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"};}
export function isRevenueOpsEnabled(){return process.env.RINON_REVENUE_OPS_ENABLED==="true" && Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY);}
function finiteNumber(value: unknown){const n=typeof value==="number"?value:Number(value);return Number.isFinite(n)?n:null;}

export async function listOpportunities():Promise<Opportunity[]>{
  const c=config(); const r=await fetch(`${c.url}/rest/v1/rinon_opportunities?select=*&order=updated_at.desc&limit=1000`,{headers:headers(c.key),cache:"no-store"});
  if(!r.ok) throw new Error(`No fue posible cargar oportunidades (${r.status})`); return r.json() as Promise<Opportunity[]>;
}
export async function getOpportunity(id:string):Promise<Opportunity|null>{
  const c=config(); const r=await fetch(`${c.url}/rest/v1/rinon_opportunities?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,{headers:headers(c.key),cache:"no-store"});
  if(!r.ok) throw new Error(`No fue posible cargar la oportunidad (${r.status})`); const rows=await r.json() as Opportunity[]; return rows[0]??null;
}
export async function findOpportunityByLead(leadId:string):Promise<Opportunity|null>{
  const c=config(); const r=await fetch(`${c.url}/rest/v1/rinon_opportunities?lead_id=eq.${encodeURIComponent(leadId)}&select=*&limit=1`,{headers:headers(c.key),cache:"no-store"});
  if(!r.ok) throw new Error(`No fue posible revisar la oportunidad (${r.status})`); const rows=await r.json() as Opportunity[]; return rows[0]??null;
}
export async function createOpportunity(input:Partial<Opportunity>&{category:string}){
  const c=config(); const payload={...input,updated_at:new Date().toISOString()};
  const r=await fetch(`${c.url}/rest/v1/rinon_opportunities`,{method:"POST",headers:{...headers(c.key),Prefer:"return=representation"},body:JSON.stringify(payload),cache:"no-store"});
  if(!r.ok) throw new Error(`No fue posible crear la oportunidad (${r.status})`); const rows=await r.json() as Opportunity[]; return rows[0];
}
export async function updateOpportunity(id:string,input:Partial<Opportunity>){
  const c=config(); const safe={...input,updated_at:new Date().toISOString()}; delete (safe as Partial<Opportunity>).id; delete (safe as Partial<Opportunity>).created_at;
  const r=await fetch(`${c.url}/rest/v1/rinon_opportunities?id=eq.${encodeURIComponent(id)}`,{method:"PATCH",headers:{...headers(c.key),Prefer:"return=representation"},body:JSON.stringify(safe),cache:"no-store"});
  if(!r.ok) throw new Error(`No fue posible actualizar la oportunidad (${r.status})`); const rows=await r.json() as Opportunity[]; return rows[0]??null;
}
export async function listQuotes(opportunityId:string):Promise<QuoteEconomics[]>{
  const c=config(); const r=await fetch(`${c.url}/rest/v1/rinon_quote_economics?opportunity_id=eq.${encodeURIComponent(opportunityId)}&select=*&order=revision.desc`,{headers:headers(c.key),cache:"no-store"});
  if(!r.ok) throw new Error(`No fue posible cargar cotizaciones (${r.status})`); return r.json() as Promise<QuoteEconomics[]>;
}
export async function createQuote(input:{opportunity_id:string;net_sale:number;material_cost:number;subcontract_cost:number;direct_labor_cost:number;freight_cost:number;installation_cost:number;other_direct_cost:number;discount_amount:number;assumptions?:string;exclusions?:string;payment_terms?:string;lead_time_text?:string}){
  const c=config(); const existing=await listQuotes(input.opportunity_id); const revision=Math.max(0,...existing.map(q=>q.revision))+1;
  const payload={...input,revision,status:"draft"};
  const r=await fetch(`${c.url}/rest/v1/rinon_quotes`,{method:"POST",headers:{...headers(c.key),Prefer:"return=representation"},body:JSON.stringify(payload),cache:"no-store"});
  if(!r.ok) throw new Error(`No fue posible crear la cotización (${r.status})`); return (await r.json() as QuoteEconomics[])[0];
}
export function revenueSummary(opportunities:Opportunity[]){
  const open=opportunities.filter(o=>!["ganado","perdido","entregado"].includes(o.stage));
  const pipeline=open.reduce((sum,o)=>sum+(finiteNumber(o.estimated_net_sale)??0),0);
  const weighted=open.reduce((sum,o)=>{
    const weight:Record<string,number>={nuevo:.05,contactado:.1,calificado:.2,requerimiento_completo:.35,cotizando:.45,cotizado:.55,seguimiento:.65,negociacion:.8,produccion:1};
    return sum+(finiteNumber(o.estimated_net_sale)??0)*(weight[o.stage]??0);
  },0);
  const won=opportunities.filter(o=>["ganado","produccion","entregado"].includes(o.stage));
  return {openCount:open.length,pipeline,weighted,wonRevenue:won.reduce((s,o)=>s+(finiteNumber(o.won_net_sale)??0),0),wonMargin:won.reduce((s,o)=>s+(finiteNumber(o.won_gross_margin)??0),0)};
}
