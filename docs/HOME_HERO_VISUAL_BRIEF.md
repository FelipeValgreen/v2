# RINON 2.0 · Visual brief — Home hero

Status: **P0 · final master required before visual approval**
Owner URL: `/`
Placement: Home hero
Current asset: `/visuals/home-hero-conceptual-welding.webp`
Current provenance: **conceptual-context** — temporary, constrained to a contained editorial slot.

## 1. Why This Blocker Exists

The current Home hero is not broken as a temporary composition, but its source is only **720 x 730**. It is acceptable only because the UI constrains its rendered size and labels it as conceptual. It cannot be promoted to final visual approval or reused as broad manufacturing proof.

The final Home master must make the first viewport feel like a real metal manufacturer in San Bernardo, not a generic industrial mood board. It should show tangible metalwork, a real process, or a clear manufactured object with enough detail for a buyer to trust that RINON fabricates.

## 2. What Must Be Seen

Preferred hierarchy:

1. Verified RINON photography of workshop, process or product.
2. Approved current-site RINON photography with provenance documented.
3. Conceptual-context image only if no real master exists, with visible conceptual labelling.

The image should include at least one of these tangible signals:

- metal frame, bunk bed, table, gate, structure or fabricated assembly with legible geometry;
- MIG welding or metalwork process with correct PPE and controlled context;
- workshop surface, fixtures, tools or material handling that reads as fabrication rather than decoration;
- finished metal surface, joint, profile or repeated production detail.

The visual must support the Home promise: **"Lo necesitas en metal. Lo fabricamos."**

## 3. Composition And Crop

- Master source minimum: **2400 x 1600 px** for a landscape master, or **2000 x 2000 px** for a square master that has an approved responsive crop.
- If the final design becomes full-bleed or wide editorial, source width must be at least **2200 px** at the delivered crop.
- Subject must remain legible at desktop **1440 px** and mobile **390 px**.
- Keep the main fabricated object/process inside the central 70% of the image unless the implemented crop proves otherwise.
- Camera should feel human and inspectable: close-medium or three-quarter view, not distant ambience.
- Avoid heavy blur, smoke, sparks or darkness that hide the metalwork.
- Leave enough quiet area for the current UI treatment if the composition remains paired with text.

## 4. What It Must Not Insinuate

Reject the image if it implies any of the following without explicit backing:

- a named client, faena, obra, institution, condominium or project executed by RINON;
- certified load capacity, structural calculation, welding certification, WPS/PQR, regulatory compliance or guaranteed durability;
- machine capacity, universal dimensions, delivery capability or production volume not documented elsewhere;
- real lead/customer data, license plates, worker identity, client logos or identifiable private property;
- a supplier/stock workshop presented as RINON;
- fake signage, fake uniforms or a fabricated RINON project plaque;
- construction-site context that suggests a client or location when none is approved.

If the image is conceptual, it must not be described as a real RINON workshop, product delivery or executed project.

## 5. Resolution And Quality Gate

Before integration:

- record source dimensions, derived dimensions and SHA-256;
- verify intrinsic resolution against rendered size, not only `naturalWidth`;
- inspect at 100% for AI artifacts, warped profiles, melted joints, duplicated tools, unreadable labels or impossible geometry;
- confirm the crop at **1440**, **1024**, **768**, **390** and **320** px;
- confirm the final asset is delivered through the approved asset pipeline, not as an unverified direct binary commit;
- keep the temporary blocker until desktop and mobile browser inspection pass.

## 6. Acceptance Criteria

The blocker `home-hero-final-master` can be removed only when all are true:

- the image immediately communicates real metal fabrication or an honest, labelled conceptual equivalent;
- the manufactured object/process remains legible in the implemented layout;
- provenance class and `sourceRef` are documented;
- no client, project, certification, capacity or performance claim is implied without evidence;
- the asset passes deterministic reconstruction, dimension and SHA checks when applicable;
- `npm run qa:static`, `npm run build`, local browser QA and remote browser QA pass against the explicit preview deployment.
