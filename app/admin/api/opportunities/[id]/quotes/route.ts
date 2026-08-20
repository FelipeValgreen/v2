import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminEnabled, isValidAdminToken } from "@/lib/admin-auth";
import { createQuote, isRevenueOpsEnabled } from "@/lib/revenue";
function clean(v:FormDataEntryValue|null,max=2000){return typeof v==="string"?v.trim().slice(0,max):"";}
function money(v:FormDataEntryValue|null){const n=Number(clean(v,40));return Number.isFinite(n)&&n>=0?n:0;}
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
  if(!isAdminEnabled())return new NextResponse("No disponible",{status:404,headers:{"Cache-Control":"no-store"}});
  if(!isValidAdminToken((await cookies()).get(ADMIN_COOKIE)?.value))return new NextResponse("No autorizado",{status:401});
  if(!isRevenueOpsEnabled())return new NextResponse("Revenue Ops no habilitado",{status:503});
  const {id}=await params;if(!/^[0-9a-f-]{30,40}$/i.test(id))return new NextResponse("ID inválido",{status:400});
  const f=await request.formData(); const netSale=money(f.get("net_sale")); if(netSale<=0)return new NextResponse("Venta neta inválida",{status:400});
  await createQuote({opportunity_id:id,net_sale:netSale,material_cost:money(f.get("material_cost")),subcontract_cost:money(f.get("subcontract_cost")),direct_labor_cost:money(f.get("direct_labor_cost")),freight_cost:money(f.get("freight_cost")),installation_cost:money(f.get("installation_cost")),other_direct_cost:money(f.get("other_direct_cost")),discount_amount:money(f.get("discount_amount")),assumptions:clean(f.get("assumptions"))||undefined,exclusions:clean(f.get("exclusions"))||undefined,payment_terms:clean(f.get("payment_terms"),500)||undefined,lead_time_text:clean(f.get("lead_time_text"),500)||undefined});
  return NextResponse.redirect(new URL(`/admin/oportunidades/${id}`,request.url),303);
}
