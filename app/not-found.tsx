import Link from "next/link";

export default function NotFound(){return <main><section className="hero"><div className="container article-narrow"><div className="eyebrow">404 · RINON</div><h1>No encontramos esta página.</h1><p className="lead">Puede que la dirección haya cambiado. Puedes volver al inicio, revisar nuestras soluciones o enviarnos directamente lo que necesitas cotizar.</p><div className="actions"><Link className="button secondary" href="/">Ir al inicio</Link><Link className="button primary" href="/cotizar">Cotizar proyecto</Link></div></div></section></main>}
