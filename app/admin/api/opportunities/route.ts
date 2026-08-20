import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminEnabled, isValidAdminToken } from "@/lib/admin-auth";
import { createOpportunity, findOpportunityByLead, isRevenueOpsEnabled } from "@/lib/revenue";
import { commercialCategoryLabel } from "@/lib/commercial";

function clean(v:FormDataEntryValue|null,max=1000){return typeof v==="string"?v.trim().slice(0,max):"";}
export async function POST(request:Request){
  if(!isAdminEnabled())return new NextResponse("No disponible",{status:404,headers:{"Cache-Control":"no-store"}});
  if(!isValidAdminToken((await cookies()).get(ADMIN_COOKIE)?.value))return new NextResponse("No autorizado",{status:401});
  if(!isRevenueOpsEnabled())return new NextResponse("Revenue Ops no habilitado",{status:503});
  const f=await request.formData(); const leadId=clean(f.get("lead_id"),100); const service=clean(f.get("servicio"),120);
  if(!leadId||!service)return new NextResponse("Datos incompletos",{status:400});
  const existing=await findOpportunityByLead(leadId); if(existing)return NextResponse.redirect(new URL(`/admin/oportunidades/${existing.id}`,request.url),303);
  const opportunity=await createOpportunity({lead_id:leadId,category:commercialCategoryLabel(service),client_type:clean(f.get("tipo_cliente"),60)||null,company_name:clean(f.get("empresa"),160)||null,requirement_summary:clean(f.get("mensaje"),3000)||null,location:clean(f.get("ubicacion"),160)||null,landing_page:clean(f.get("pagina_origen"),300)||null,stage:"nuevo"});
  return NextResponse.redirect(new URL(`/admin/oportunidades/${opportunity.id}`,request.url),303);
}
