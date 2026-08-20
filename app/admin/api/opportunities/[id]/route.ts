import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminEnabled, isValidAdminToken } from "@/lib/admin-auth";
import { isLeadStatus } from "@/lib/leads";
import { isRevenueOpsEnabled, updateOpportunity } from "@/lib/revenue";
function clean(v:FormDataEntryValue|null,max=1000){return typeof v==="string"?v.trim().slice(0,max):"";}
function num(v:FormDataEntryValue|null){const n=Number(clean(v,30));return Number.isFinite(n)&&n>=0?n:null;}
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
  if(!isAdminEnabled())return new NextResponse("No disponible",{status:404,headers:{"Cache-Control":"no-store"}});
  if(!isValidAdminToken((await cookies()).get(ADMIN_COOKIE)?.value))return new NextResponse("No autorizado",{status:401});
  if(!isRevenueOpsEnabled())return new NextResponse("Revenue Ops no habilitado",{status:503});
  const {id}=await params;if(!/^[0-9a-f-]{30,40}$/i.test(id))return new NextResponse("ID inválido",{status:400});
  const f=await request.formData(); const stage=clean(f.get("stage"),60); if(!isLeadStatus(stage))return new NextResponse("Etapa inválida",{status:400});
  await updateOpportunity(id,{stage,owner:clean(f.get("owner"),120)||null,next_action_at:clean(f.get("next_action_at"),40)||null,estimated_net_sale:num(f.get("estimated_net_sale")),estimated_gross_margin:num(f.get("estimated_gross_margin")),estimated_gross_margin_pct:num(f.get("estimated_gross_margin_pct")),loss_reason:clean(f.get("loss_reason"),180)||null,loss_note:clean(f.get("loss_note"),1000)||null});
  return NextResponse.redirect(new URL(`/admin/oportunidades/${id}`,request.url),303);
}
