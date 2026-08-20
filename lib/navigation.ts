export type NavItem={label:string;href:string;description?:string};
export type NavGroup={label:string;items:readonly NavItem[]};

export const productNavGroups:readonly NavGroup[]=[
  {label:"Descanso",items:[
    {label:"Camarotes",href:"/camarotes",description:"Camas y camarotes metálicos."},
    {label:"Camas",href:"/camas-metalicas",description:"Camas metálicas para hogar e instituciones."},
    {label:"Camas balinesas",href:"/camas-balinesas",description:"Estructuras para exterior y terrazas."},
  ]},
  {label:"Mobiliario",items:[
    {label:"Mesas",href:"/mesas-metalicas",description:"Mesas con estructura metálica."},
    {label:"Escritorios",href:"/escritorios-metalicos",description:"Escritorios para hogar y empresa."},
    {label:"Equipamiento",href:"/equipamiento-metalico",description:"Racks, soportes y equipamiento."},
  ]},
  {label:"Cierres",items:[
    {label:"Cierres",href:"/cierres-perimetrales",description:"Soluciones para perímetros."},
    {label:"Rejas",href:"/rejas-metalicas",description:"Rejas fabricadas a medida."},
    {label:"Portones",href:"/portones-metalicos",description:"Accesos metálicos."},
    {label:"Malla 3D",href:"/mallas-3d",description:"Panel electrosoldado."},
    {label:"Mallas separadoras",href:"/mallas-separadoras",description:"Divisiones para espacios y bodegas."},
  ]},
  {label:"Proyectos",items:[
    {label:"Estructuras",href:"/estructuras-metalicas",description:"Estructuras metálicas a medida."},
    {label:"Fabricaciones especiales",href:"/fabricaciones-especiales",description:"Piezas y conjuntos no estándar."},
  ]},
] as const;

export const serviceNavItems:readonly NavItem[]=[
  {label:"Fabricación a medida",href:"/fabricacion-metalica",description:"Desde plano, foto, croquis o referencia."},
  {label:"Soldadura MIG",href:"/soldadura-mig",description:"Soldadura dentro de trabajos y fabricaciones."},
  {label:"Corte",href:"/corte-metalico",description:"Corte y dimensionado según requerimiento."},
  {label:"Pintura electrostática",href:"/pintura-electrostatica",description:"Terminación electrostática al horno."},
  {label:"Instalación",href:"/instalacion",description:"Montaje e instalación según proyecto."},
  {label:"Reparaciones",href:"/reparaciones-metalicas",description:"Reparación, modificación y recuperación."},
] as const;

export const primaryStandaloneNav:readonly NavItem[]=[
  {label:"A medida",href:"/fabricacion-metalica"},
  {label:"Empresas",href:"/empresas"},
  {label:"Proyectos",href:"/proyectos"},
  {label:"Contacto",href:"/contacto"},
] as const;

export const footerProductItems:readonly NavItem[]=[
  {label:"Camarotes",href:"/camarotes"},{label:"Camas",href:"/camas-metalicas"},{label:"Camas balinesas",href:"/camas-balinesas"},
  {label:"Mesas",href:"/mesas-metalicas"},{label:"Escritorios",href:"/escritorios-metalicos"},{label:"Cierres",href:"/cierres-perimetrales"},
  {label:"Rejas",href:"/rejas-metalicas"},{label:"Portones",href:"/portones-metalicos"},
] as const;