# RINON 2.0 — Product / Growth Release Candidate

Application: Next.js 16.2.9 / React 19.2.4  
Release: 1.0.0-rc.7  
Mode: **SAFE PRE-CUTOVER**

## Current preproduction scope
- Human-first navigation: Productos, Proyectos a medida, Empresas, Servicios, Nosotros, Cotizar.
- Product mega menu organized by user mental models: descanso, mobiliario/equipamiento, cierres/accesos and structures/projects.
- Services menu exposes commercial services only: MIG welding, cutting/dimensioning, powder coating, installation/mounting and repairs.
- `/fabricacion-metalica` remains an SEO owner while visible UX uses `Proyectos a medida`.
- Header/footer logos are direct static assets and footer links have explicit RINON styling.
- Home CRO paths, Soluciones, Empresas, Nosotros and Contacto are task-first and conversion-oriented.
- Nosotros/Contacto share one canonical `#ubicacion` anchor and expose tracked Google Maps/Waze actions.
- Commercial pages use evidence panels rather than invented project photography when verified media is unavailable.
- `/cotizar` is a progressive three-step wizard: need → context → contact, with category-specific qualification.
- Quote submissions support up to 3 private attachments, maximum 5 MB each, limited to JPEG/PNG/WebP/PDF.
- Attachment upload is origin/size/MIME bounded, server-only, UUID-named, private in Supabase Storage and batch-rollback safe.
- Admin attachment access is authenticated and streamed through a no-store route; no public Storage URL is exposed.
- Lead intake stores 22 structured CRM/attribution fields while retaining a human-readable legacy summary.
- Supabase public intake re-sanitizes an explicit field whitelist and keeps persistent intake rate limiting.
- Production attribution preserves consented landing/referrer/UTM/Google/Meta identifiers and quote-funnel semantics.
- Admin shows structured qualification, campaign attribution and private attachment access per lead.
- New intent owners are available for camas, camas balinesas, mesas, escritorios, Malla 3D, mallas separadoras, Soldadura MIG, Corte, Instalación and Reparaciones.
- Pintura electrostática is a confirmed commercial service with bounded technical claims.
- Migration, SEO/CRO, visual provenance, attachment, structured CRM and production preflight contracts run inside the Vercel build.
- **50** live-observed/current organic URLs are quarantined as `REVIEW / GSC-PENDING` before broad redirect families.
- Production preflight reads the machine-readable `VISUAL_CUTOVER_BLOCKERS` registry and refuses authorized cutover while final visual blockers remain.
- Three user-provided cobertizo renders were dimension/SHA audited as reference-only assets; `COBERTIZO SALA.jpg` is the strongest current contextual candidate but is not represented as a completed RINON project.

## Remaining pre-cutover work / external evidence
- Reconcile the complete live crawl with an exported Google Search Console landing-page/query dataset and resolve all **50** `REVIEW / GSC-PENDING` URLs.
- Resolve the two final visual blockers:
  1. `home-hero-final-master` — replace the constrained 720×730 temporary Home hero master.
  2. `structures-residential-final-master` — replace the generic industrial structures visual with the accepted premium residential cobertizo/pergola direction.
- Where available, promote verified RINON photography for Nosotros/workshop, Empresas/B2B, welding and powder coating; evidence-panel fallbacks remain acceptable until authentic evidence exists.
- Complete final visual acceptance across desktop/tablet/mobile after final masters are installed.
- Obtain explicit production cutover authorization before changing domain/indexation/redirect/write/tracking flags.

## Safe preproduction defaults
- Indexation disabled (`RINON_INDEXABLE=false`).
- Commercial migration redirects disabled.
- Legacy blog redirects disabled.
- Lead writes disabled unless explicitly enabled for a controlled environment or authorized production release.
- Production tracking disabled until the production release is authorized and consent-gated.
- URL inventory completion remains false until crawl + GSC reconciliation.
- Visual cutover blocker list is non-empty until final masters pass provenance + QA.
- Existing production `rinon.cl` is not modified by this repository.
- Production cutover remains blocked behind explicit authorization and all hard gates.
