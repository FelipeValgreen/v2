export type NavItem={label:string;href:string;description?:string};
export type NavGroup={label:string;items:readonly NavItem[]};

export const productNavGroups:readonly NavGroup[]=[
  {label:"Camas y descanso",items:[
    {label:"Camarotes",href:"/camarotes",description:"Camas y camarotes metálicos."},
    {label:"Camas metálicas",href:"/camas-metalicas",description:"Camas para hogar, instituciones y volumen."},
    {label:"Camas balinesas",href:"/camas-balinesas",description:"Estructuras metálicas para terrazas y exterior."},
  ]},
  {label:"Mobiliario y equipamiento",items:[
    {label:"Mesas",href:"/mesas-metalicas",description:"Mesas con estructura metálica."},
    {label:"Escritorios",href:"/escritorios-metalicos",description:"Escritorios para hogar y empresa."},
    {label:"Equipamiento",href:"/equipamiento-metalico",description:"Racks, soportes, lockers y equipamiento."},
  ]},
  {label:"Cierres y accesos",items:[
    {label:"Cierres",href:"/cierres-perimetrales",description:"Soluciones para perímetros."},
    {label:"Rejas",href:"/rejas-metalicas",description:"Rejas fabricadas según medida y uso."},
    {label:"Portones",href:"/portones-metalicos",description:"Accesos metálicos."},
    {label:"Malla 3D",href:"/mallas-3d",description:"Paneles para cierres y delimitaciones."},
    {label:"Divisiones",href:"/mallas-separadoras",description:"Separaciones para espacios y bodegas."},
  ]},
  {label:"Estructuras",items:[
    {label:"Estructuras metálicas",href:"/estructuras-metalicas",description:"Pérgolas, cobertizos, escaleras, plataformas y estructuras."},
    {label:"Fabricaciones especiales",href:"/fabricaciones-especiales",description:"Piezas y conjuntos no estándar."},
  ]},
] as const;

export const serviceNavItems:readonly NavItem[]=[
  {label:"Soldadura MIG",href:"/soldadura-mig",description:"Soldadura para piezas, conjuntos y reparaciones."},
  {label:"Corte y dimensionado",href:"/corte-metalico",description:"Preparación de piezas según medidas y requerimiento."},
  {label:"Pintura electrostática",href:"/pintura-electrostatica",description:"Terminación electrostática al horno."},
  {label:"Instalación y montaje",href:"/instalacion",description:"Montaje según proyecto, ubicación y acceso."},
  {label:"Reparaciones",href:"/reparaciones-metalicas",description:"Reparación, modificación y recuperación."},
] as const;

export const projectNavItem:NavItem={label:"Proyectos a medida",href:"/fabricacion-metalica",description:"Parte con una foto, plano, croquis, muestra o medidas."};
export const companyNavItem:NavItem={label:"Empresas",href:"/empresas",description:"Volumen, proyectos, instituciones y requerimientos B2B."};
export const aboutNavItem:NavItem={label:"Nosotros",href:"/nosotros",description:"Taller, proceso, ubicación y cómo llegar."};

export const primaryStandaloneNav:readonly NavItem[]=[projectNavItem,companyNavItem,aboutNavItem] as const;

export const footerProductItems:readonly NavItem[]=[
  {label:"Camarotes",href:"/camarotes"},{label:"Camas metálicas",href:"/camas-metalicas"},{label:"Camas balinesas",href:"/camas-balinesas"},
  {label:"Mesas",href:"/mesas-metalicas"},{label:"Escritorios",href:"/escritorios-metalicos"},{label:"Cierres",href:"/cierres-perimetrales"},
  {label:"Rejas",href:"/rejas-metalicas"},{label:"Portones",href:"/portones-metalicos"},
] as const;