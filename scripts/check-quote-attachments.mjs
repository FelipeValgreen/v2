import {existsSync,readFileSync} from "node:fs";

const failures=[];
function read(path){if(!existsSync(path)){failures.push(`missing required file: ${path}`);return ""}return readFileSync(path,"utf8")}
function check(condition,message){if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}}

const form=read("components/QuoteForm.tsx");
const route=read("app/api/contacto/route.ts");
const security=read("lib/request-security.ts");
const storage=read("lib/lead-attachments.ts");
const intake=read("lib/public-intake.ts");
const leads=read("lib/leads.ts");
const adminRoute=read("app/admin/api/leads/[id]/attachments/[attachmentId]/route.ts");
const adminPage=read("app/admin/page.tsx");

check(form.includes('name="attachments"')&&form.includes('type="file"')&&form.includes("multiple"),"quote form exposes a multi-file attachment control");
check(form.includes("MAX_ATTACHMENTS=3")&&form.includes("MAX_ATTACHMENT_BYTES=5*1024*1024"),"client attachment limits are explicit: 3 files x 5 MB");
for(const mime of ["image/jpeg","image/png","image/webp","application/pdf"])check(form.includes(mime),`quote form accepts ${mime}`);
check(!form.includes("Adjuntos todavía no habilitados")&&!form.includes("próximamente"),"quote form no longer presents attachments as unavailable");
check(form.includes('fetch("/api/contacto",{method:"POST",body:fd})'),"quote submission sends FormData without overriding multipart Content-Type");

check(security.includes("readPublicMultipartWrite"),"public write security exposes bounded multipart parsing");
check(security.includes("validatePublicWriteOrigin"),"multipart and JSON writes share origin validation");
check(security.includes("raw.byteLength > maxBytes"),"multipart actual body bytes are checked, not only Content-Length");

check(route.includes("readPublicMultipartWrite")&&route.includes("storeLeadAttachments"),"contact API accepts bounded multipart and delegates private storage");
check(route.indexOf("validateLeadAttachments(attachments)")<route.indexOf("createLegacyLead({"),"attachments are validated before creating the lead");
check(route.indexOf("createLegacyLead({")<route.indexOf("storeLeadAttachments(leadId, attachments)"),"lead is created before any attachment is stored");
check(route.includes("attachment_warning"),"attachment failures preserve the valid lead and return a user-safe warning");

check(storage.includes('const BUCKET = "rinon-lead-attachments"'),"attachments target the dedicated private bucket contract");
check(storage.includes("MAX_FILES = 3")&&storage.includes("MAX_FILE_BYTES = 5 * 1024 * 1024"),"server attachment limits mirror the client limits");
check(storage.includes("SUPABASE_SERVICE_ROLE_KEY")&&storage.includes('import "server-only"'),"attachment storage is server-only and service-role authenticated");
check(storage.includes("crypto.randomUUID()"),"stored object names do not trust user filenames");
check(storage.includes("rollbackStored")&&storage.includes("bestEffortDeleteObject")&&storage.includes("bestEffortDeleteMetadata"),"multi-file attachment storage rolls back partial writes");
check(storage.includes("archivo_ids: stored.map"),"lead attachment IDs are linked only after the full batch succeeds");
check(storage.includes("getLeadAttachment")&&storage.includes("lead_id: `eq.${leadId}`")&&storage.includes("id: `eq.${attachmentId}`"),"admin attachment lookup binds file id to its lead id");
check(storage.includes("/storage/v1/object/authenticated/"),"private attachment reads use the authenticated Storage path");

check(intake.includes("PublicIntakeResult")&&intake.includes("id?: string"),"public intake client can receive a created lead identifier");
check(leads.includes("const result = await sendPublicIntake")&&leads.includes("identificador de lead válido"),"lead creation requires a valid returned UUID before attachment association");
check(leads.includes("archivo_ids?: string[] | null"),"admin lead model exposes only stored attachment ids");

check(adminRoute.includes("isAdminEnabled()")&&adminRoute.includes("isValidAdminToken"),"private attachment route requires the existing admin gate and token");
check(adminRoute.includes('"Cache-Control": "private, no-store"'),"private attachment responses are never cacheable");
check(adminRoute.includes("getLeadAttachment(id, attachmentId)")&&adminRoute.includes("fetchLeadAttachmentContent"),"admin route resolves metadata before streaming private content");
check(adminRoute.includes('"X-Content-Type-Options": "nosniff"')&&adminRoute.includes('"Cross-Origin-Resource-Policy": "same-origin"'),"private file response applies browser hardening headers");
check(adminPage.includes("Adjuntos privados")&&adminPage.includes("lead.archivo_ids.slice(0,3)"),"commercial admin exposes the lead's private attachments without public URLs");
check(adminPage.includes("/admin/api/leads/${lead.id}/attachments/${attachmentId}"),"admin attachment links stay behind the authenticated route");

if(failures.length){console.error(`\nRINON QUOTE ATTACHMENT CONTRACT FAILED (${failures.length} issue${failures.length===1?"":"s"}).`);for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log("\nRINON QUOTE ATTACHMENT CONTRACT PASSED: private, bounded, atomic, preview-safe and admin-authenticated attachment flow is wired.");
