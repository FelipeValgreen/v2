import Link from "next/link";

type Item={label:string;href:string;note:string};
const groups:Record<string,{label:string;items:Item[]}>= {
  "/camarote-con-escritorio":{label:"CAMAS Y CAMAROTES",items:[
    {label:"Ver categoría completa",href:"/camarotes",note:"Camas, camarotes y compras por volumen"},
    {label:"Compra para empresa",href:"/empresas",note:"Lotes, instituciones y fechas objetivo"},
    {label:"Preparar cotización",href:"/recursos/como-especificar-camarotes-compra-institucional",note:"Qué información conviene enviar"},
  ]},
  "/rejas-metalicas":{label:"CIERRES Y ACCESOS",items:[
    {label:"Cierres perimetrales",href:"/cierres-perimetrales",note:"Perímetros, divisiones y sistemas de cierre"},
    {label:"Portones metálicos",href:"/portones-metalicos",note:"Accesos corredizos o batientes evaluables"},
    {label:"Preparar levantamiento",href:"/recursos/como-cotizar-cierre-perimetral",note:"Medidas, terreno, accesos y ubicación"},
  ]},
  "/portones-metalicos":{label:"CIERRES Y ACCESOS",items:[
    {label:"Cierres perimetrales",href:"/cierres-perimetrales",note:"Perímetros, divisiones y sistemas de cierre"},
    {label:"Rejas metálicas",href:"/rejas-metalicas",note:"Protecciones y tramos fabricados a medida"},
    {label:"Preparar levantamiento",href:"/recursos/como-cotizar-cierre-perimetral",note:"Medidas, terreno, accesos y ubicación"},
  ]},
};

export function SolutionCrossNav({slug}:{slug:string}){
 const group=groups[slug]; if(!group)return null;
 return <nav className="v2-crossnav" aria-label="Soluciones relacionadas"><div className="container"><span>{group.label}</span><div>{group.items.map(item=><Link key={item.href} href={item.href}><strong>{item.label}</strong><small>{item.note}</small><b aria-hidden="true">→</b></Link>)}</div></div></nav>;
}
