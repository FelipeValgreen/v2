import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminEnabled, isValidAdminToken } from "@/lib/admin-auth";
import { isRevenueOpsEnabled } from "@/lib/revenue";

export default async function AdminLayout({children}:{children:React.ReactNode}){
  if(!isAdminEnabled())return children;
  const authenticated=isValidAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if(!authenticated)return children;
  const revenueEnabled=isRevenueOpsEnabled();
  return <>
    <div className="border-b border-gray-200 bg-white"><nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 text-sm" aria-label="Administración RINON"><span className="mr-2 font-bold text-gray-950">RINON Admin</span><Link href="/admin" className="rounded-lg px-3 py-2 font-semibold text-gray-700 no-underline hover:bg-gray-100">Panel</Link><Link href="/admin/analitica" className="rounded-lg px-3 py-2 font-semibold text-gray-700 no-underline hover:bg-gray-100">Analítica</Link>{revenueEnabled?<Link href="/admin/oportunidades" className="rounded-lg px-3 py-2 font-semibold text-gray-700 no-underline hover:bg-gray-100">Oportunidades y margen</Link>:null}</nav></div>
    {children}
  </>;
}
