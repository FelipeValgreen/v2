import {canonicalUrl,SEO_BASE_URL} from "@/lib/seo";

export type CommercialFaq={q:string;a:string};

type CommercialServiceJsonLdInput={
 path:string;
 name:string;
 description:string;
 faqs:readonly CommercialFaq[];
};

export function buildCommercialServiceJsonLd({path,name,description,faqs}:CommercialServiceJsonLdInput){
 const url=canonicalUrl(path);
 return [
  {
   "@context":"https://schema.org",
   "@type":"Service",
   "@id":`${url}#service`,
   name,
   description,
   url,
   provider:{"@id":`${SEO_BASE_URL}/#organization`},
   areaServed:{"@type":"AdministrativeArea",name:"Región Metropolitana de Santiago"},
  },
  {
   "@context":"https://schema.org",
   "@type":"BreadcrumbList",
   itemListElement:[
    {"@type":"ListItem",position:1,name:"RINON",item:SEO_BASE_URL},
    {"@type":"ListItem",position:2,name,item:url},
   ],
  },
  {
   "@context":"https://schema.org",
   "@type":"FAQPage",
   mainEntity:faqs.map(faq=>({
    "@type":"Question",
    name:faq.q,
    acceptedAnswer:{"@type":"Answer",text:faq.a},
   })),
  },
 ];
}
