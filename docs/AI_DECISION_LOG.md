# RINON 2.0 — Reconciled AI decision log

This file records decisions accepted after ChatGPT/Claude review. It is not a scratchpad. Add an entry only after evidence/reconciliation.

## Status legend
- `ACCEPTED` — implemented/approved direction.
- `PROVISIONAL` — safest current direction; awaiting external evidence.
- `REJECTED` — considered and intentionally not adopted.

---

## D-001 — Production remains fail-closed
**Status:** ACCEPTED  
**Decision:** No agent may connect `rinon.cl`, enable indexation, production redirects, production lead writes or production tracking without explicit authorized cutover.  
**Evidence:** release contract + SEO migration risk.  

## D-002 — Human nav label vs SEO route
**Status:** ACCEPTED  
**Decision:** User-facing label is `Proyectos a medida`; SEO route/intent owner remains `/fabricacion-metalica`.  
**Reason:** reduces navigation ambiguity without sacrificing established search intent ownership.

## D-003 — Commercial evidence hierarchy
**Status:** ACCEPTED  
**Decision:** Real/verified evidence first; archive reference second; conceptual/render only when clearly labeled; technical diagrams are explanatory, not automatic commercial hero evidence.

## D-004 — Live URL migration quarantine
**Status:** PROVISIONAL  
**Decision:** Live-observed organic URLs remain protected from blanket 301 decisions until Search Console landing-page/query evidence is reconciled. Current machine-readable pending set: 36 URLs.  
**Reason:** zero-loss migration safety.

## D-005 — Claude/ChatGPT shared GitHub protocol
**Status:** ACCEPTED  
**Decision:** GitHub handoff files are the communication layer. ChatGPT owns `AI_HANDOFF_CHATGPT.md`; Claude owns `AI_HANDOFF_CLAUDE.md`; disagreements use explicit `CHALLENGE` blocks and are reconciled here.

---

## New decision template
### D-XXX — Title
**Status:** ACCEPTED | PROVISIONAL | REJECTED  
**Decision:**  
**Evidence:**  
**Trade-offs:**  
**Affected files/areas:**  
