# RINON 2.0 — Product / Growth Release Candidate

Application: Next.js 16.2.9 / React 19.2.4
Release: 1.0.0-rc.7

## Current preproduction scope
- Human-first top navigation: Products, Projects to measure, Companies, Services, About, Quote.
- Product mega menu reorganized around user mental models: beds/rest, furniture/equipment, closures/access, structures.
- Services menu reduced to true services only: MIG welding, cutting/dimensioning, powder coating, installation/mounting, repairs.
- `/fabricacion-metalica` preserved as SEO owner while visible UX is repositioned as `Proyectos a medida`.
- Desktop and mobile navigation rebuilt around tasks instead of internal production taxonomy.
- Header and footer logos are served as direct static assets to avoid optimizer regressions.
- Desktop floating conversion dock removed; compact-screen WhatsApp + Quote actions remain persistent.
- Home CRO entry paths simplified and low-resolution pergola asset removed.
- Home structure chapter now uses a quality-gated reconstructed visual until the final premium residential asset is approved.
- Google Stitch design brief added at `docs/STITCH_RC7_MASTER_PROMPT.md` for visual exploration without changing SEO architecture.
- Remote Chromium support added so browser QA can run against the actual Vercel deployment, not only local `next start`.
- Browser QA now checks responsive widths, direct-logo delivery, no-upscaling of the main structure visual, mobile navigation and desktop dock duplication.
- Nosotros remains built around workshop, process, location, Google Maps and Waze.
- New intent owners remain available: camas, camas balinesas, mesas, escritorios, Soldadura MIG, Corte, Instalación and Reparaciones.
- Pintura electrostática remains a confirmed commercial service with bounded technical claims.
- Migration contract and production preflight remain enforced inside Vercel build.

## Remaining RC.7 visual work
- Produce and approve the final high-resolution residential pergola/cobertizo visual for the Home/Structures story.
- Replace TechnicalVisual-first heroes on priority commercial pages with verified RINON photography or approved contextual visuals.
- Rework Soluciones as a visual product finder.
- Rebuild Empresas and Nosotros hero evidence around real manufacturing/taller imagery.
- Convert the quote experience from a visually segmented long form into a true progressive wizard once upload/storage and privacy flow are ready.

## Safe preproduction defaults
- Indexation disabled (`RINON_INDEXABLE=false`).
- Commercial migration redirects disabled.
- Legacy blog redirects disabled.
- Lead writes disabled unless explicitly enabled for a controlled environment.
- Production tracking disabled until the production release is authorized.
- Existing production `rinon.cl` is not modified by this repository.
- Production cutover remains blocked behind explicit authorization.
