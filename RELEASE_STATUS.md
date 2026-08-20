# RINON 2.0 — Product / Growth Release Candidate

Application: Next.js 16.2.9 / React 19.2.4
Release: 1.0.0-rc.6

## Current preproduction scope
- Unified Products + Services mega navigation.
- Rebuilt mobile navigation and 4-column footer.
- Logo/asset visual gate strengthened.
- Home CRO entry paths added.
- Premium conceptual residential structure visual integrated.
- Nosotros rebuilt around workshop, process and location.
- Google Maps + Waze directions integrated.
- Contact journey simplified.
- New intent owners: camas, camas balinesas, mesas, escritorios, Soldadura MIG, Corte, Instalación and Reparaciones.
- Pintura electrostática confirmed as a commercial service with bounded technical claims.
- Quote flow reorganized around requirement → context → contact.
- Product/Service schema split for expanded catalog.
- Migration contract and production preflight enforced inside Vercel build.

## Safe preproduction defaults
- Indexation disabled (`RINON_INDEXABLE=false`).
- Commercial migration redirects disabled.
- Legacy blog redirects disabled.
- Lead writes disabled unless explicitly enabled for a controlled environment.
- Production tracking disabled until the production release is authorized.
- Existing production `rinon.cl` is not modified by this repository.
- Production cutover remains blocked behind explicit authorization.
