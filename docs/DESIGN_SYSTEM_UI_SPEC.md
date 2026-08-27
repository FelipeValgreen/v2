# RINON 2.0 — Design System & UI Specification

**Release:** RC7  
**Source of truth:** implemented Next.js UI + `app/styles/part-*.css`.  
**Objective:** preserve a premium industrial, precise and commercial visual language while keeping the interface fast, legible and conversion-led.

## 1. Brand tokens

| Token | Value | Use |
|---|---|---|
| Ink | `#161616` | primary text / dark surfaces |
| Graphite | `#384148` | secondary industrial surfaces |
| Metal | `#CCCDD2` | dividers / metal reference |
| Orange | `#F58220` | primary CTA, focus, active state |
| Paper | `#F7F7F5` | default page background |
| White | `#FFFFFF` | cards / high-contrast text |
| Line | `#D9D9D4` | neutral borders |
| Muted | `#6D6F70` | supporting copy |
| Max content | `1240px` | `.container` maximum |

Typography: Raleway via local Next font. System fallbacks are allowed only after Raleway. Mono text is reserved for technical labels/identifiers.

## 2. Visual principles

1. Dark graphite/ink establishes industrial authority; orange is an action color, not decoration.
2. One dominant visual message per viewport. Do not stack multiple competing logos, badges or CTAs.
3. Commercial names in navigation are short. Full SEO language belongs inside the landing.
4. Photography is evidence. Never present conceptual imagery as a completed RINON project.
5. If verified photography is unavailable, use an explicit evidence panel rather than fake proof.
6. No browser-default blue/underlined navigation or footer links.
7. Avoid unnecessary rounded SaaS-card aesthetics; use restrained radii and precise borders.
8. Motion must be subtle and fully disabled under `prefers-reduced-motion`.

## 3. Layout

- `.container`: `min(1240px, viewport - 40px)`; 28px side allowance on compact mobile.
- Desktop commercial layouts: 2-column split only when both columns carry useful information.
- Section vertical rhythm: approximately 64–90px depending on hierarchy.
- Critical content and CTA must remain visible without horizontal scroll at 320, 360, 375, 390, 430, 768, 1024 and 1440px QA widths.

## 4. Type hierarchy

- H1: large editorial/commercial headline, `clamp(42px,6vw,80px)` baseline; hero variants may extend higher when tested.
- H2: `clamp(30px,4vw,52px)` baseline.
- Eyebrow: 10–12px, high weight, tracking, uppercase; use for context, not core meaning.
- Body/lead: readable line-height 1.5–1.7; muted copy must keep accessible contrast.
- Technical microcopy: 8–11px only for labels/support, never essential instructions alone.

## 5. Header / navigation

Desktop required order:
`Productos ▼ | Proyectos a medida | Empresas | Servicios ▼ | Nosotros | Cotizar`.

Rules:
- header logo uses `/brand/logo-rinon-horizontal-transparent.png`; the asset must decode in Chromium and render on the dark header without the image optimizer;
- direct static source, no image optimizer dependency for logo;
- Products and Services are accessible buttons with `aria-expanded` and controlled mega panels;
- mega menu items are real landing links, not inert labels;
- keyboard and focus-visible support mandatory;
- mobile menu is task-led and must not reproduce the desktop mega menu as an unusable wall of links.

## 6. Primary CTA system

Primary commercial action: **Cotizar / Cotizar proyecto**.  
Secondary high-intent action: **WhatsApp**.

- Primary uses RINON orange and dark text.
- Secondary may be text/link or outlined action depending on context.
- Every money page needs at least one primary and one secondary conversion path.
- CTA copy adapts to intent (`Cotizar camarotes`, `Cotizar cierre`, etc.) while preserving semantic tracking.
- Do not claim instant price, guaranteed response time or guaranteed feasibility.

## 7. Cards and evidence panels

Cards:
- neutral/white or dark surface;
- 1px structural border;
- minimal shadow;
- hover movement <=2px;
- content first, decoration second.

Evidence panels:
- identify what RINON can evaluate/fabricate/do;
- never imply that a generic/generated contextual image is a verified RINON job;
- real project/workshop proof requires `real-rinon` provenance.

## 8. Image specification

Full-bleed commercial imagery: source width >=2200px preferred.  
Contextual editorial masters: >=2400×1600 preferred.  
Product/evidence image must not render wider than its natural resolution.

Provenance categories:
- `real-rinon`
- `user-drive-reference`
- `conceptual-context`
- `explanatory-only`

Conceptual contexts must carry an honest label when a user could reasonably interpret them as executed work.

## 9. Forms

Quote flow: 3 steps.
1. Qué necesitas
2. Contexto
3. Contacto

Rules:
- show only fields relevant to selected category;
- native validation and visible status messages;
- persistent semantic events `quote_start`, `quote_step`, `quote_submit`;
- private attachments: max 3; max 5 MB each; JPEG/PNG/WebP/PDF;
- privacy acceptance mandatory before write;
- staging validates without persisting when write gate is OFF;
- WhatsApp remains available as alternate path.

## 10. Local trust / maps

`/nosotros` and `/contacto`:
- exactly one `#ubicacion` region;
- address: Portezuelo 1506, San Bernardo;
- one embedded Google Map;
- explicit Google Maps and Waze direction links;
- `maps_click` and `waze_click` tracking;
- map/actions must remain usable on mobile without overflow.

## 11. Footer

Four logical blocks:
1. RINON logo/value proposition/quote CTA
2. Products
3. Services
4. RINON/contact/local trust

Bottom bar: legal identity, privacy/cookies/data request, local entity context.

No browser-default link styling. Phone, WhatsApp and directions must be actionable.

## 12. Accessibility baseline

Mandatory:
- skip link;
- `:focus-visible` 3px orange outline;
- semantic headings and landmarks;
- labels for form controls;
- no meaning conveyed only by color;
- reduced-motion support;
- mobile touch targets approximately >=44px where practical;
- no horizontal overflow.

## 13. Acceptance criteria

A UI change is not approved unless:
- header/footer/logo render correctly;
- CSS and Raleway are loaded;
- 320px mobile has no unintended overflow;
- focus and keyboard behavior work;
- CTA hierarchy remains explicit;
- imagery respects provenance and resolution gates;
- no unsupported commercial/technical claim is introduced;
- Playwright and served-build QA remain green.
