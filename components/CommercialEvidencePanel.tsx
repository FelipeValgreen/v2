type EvidenceItem={label:string;body:string};

export function CommercialEvidencePanel({title,items,note}:{title:string;items:readonly EvidenceItem[];note?:string}){
 return <aside className="rinon-proof-panel commercial-evidence-panel" aria-label={title}>
  <span>{title}</span>
  {items.map((item,index)=><div key={`${item.label}-${index}`}><b>{String(index+1).padStart(2,"0")}</b><strong>{item.label}</strong><p>{item.body}</p></div>)}
  {note?<small>{note}</small>:null}
 </aside>;
}
