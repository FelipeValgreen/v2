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
- Home structure chapter uses a quality-gated reconstructed visual until the final premium residential asset is approved.
- Soluciones is now a human product finder instead of a flat internal catalog.
- Empresas, Nosotros and Contacto were rebuilt around concrete commercial evidence, location and task-first conversion paths.
- Rejas, Portones, Malla 3D and Mallas separadoras no longer use technical diagrams as primary commercial evidence.
- Generic `SolutionPage` no longer promotes a `TechnicalVisual` to hero when photography is missing; it falls back to an honest commercial evidence panel.
- `/cotizar` is now a true progressive three-step wizard: need → context → contact.
- Quote fields remain conditional by category and preserve incoming commercial context from product/service landings.
- Preview submissions validate the full journey without storing or sending personal data while lead writes remain disabled.
- Attachment UX is prepared but intentionally disabled until upload storage, privacy and retention are explicitly provisioned.
- Google Stitch design brief exists at `docs/STITCH_RC7_MASTER_PROMPT.md` for visual exploration without changing SEO architecture.
- Remote Chromium support allows browser QA to run against the actual Vercel deployment, not only local `next start`.
- Browser QA covers responsive widths, direct-logo delivery, no-upscaling, mobile navigation, conversion dock behavior, quote progression and evidence-led money-page heroes.
- Served-build QA verifies critical commercial routes, assets/MIME types, noindex robots, sitemap ownership and real 404 behavior.
- New intent owners remain available: camas, camas balinesas, mesas, escritorios, Soldadura MIG, Corte, Instalación and Reparaciones.
- Pintura electrostática remains a confirmed commercial service with bounded technical claims.
- Migration contract and production preflight remain enforced inside Vercel build.

## Remaining RC.7 visual / release work
- Produce and approve the final high-resolution residential pergola/cobertizo visual for the Home/Structures story.
- Replace evidence-panel fallbacks with verified RINON photography where authentic source material is available, prioritizing Nosotros, Empresas, welding, powder coating and expanded product lines.
- Complete the visual asset provenance inventory: real RINON / product reference / contextual conceptual / explanatory only.
- Activate file uploads only after storage, privacy, retention and deletion behavior are provisioned and tested.
- Run final visual acceptance across desktop/tablet/mobile before any cutover discussion.

## Safe preproduction defaults
- Indexation disabled (`RINON_INDEXABLE=false`).
- Commercial migration redirects disabled.
- Legacy blog redirects disabled.
- Lead writes disabled unless explicitly enabled for a controlled environment.
- Production tracking disabled until the production release is authorized.
- Existing production `rinon.cl` is not modified by this repository.
- Production cutover remains blocked behind explicit authorization.
