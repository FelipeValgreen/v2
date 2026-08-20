import { readPublicJsonWrite } from "@/lib/request-security";
import { ANALYTICS_EVENTS, createAnalyticsEvent, type AnalyticsEventName } from "@/lib/analytics";

const ID_PATTERN = /^[a-zA-Z0-9_-]{8,80}$/;
function cleanText(value: unknown, maxLength: number) { return typeof value === "string" ? value.trim().slice(0, maxLength) : ""; }

export async function POST(request: Request) {
  const requestBody = await readPublicJsonWrite(request, 8_000);
  if (!requestBody.ok) return requestBody.response;
  try {
    const body = requestBody.body;
    const eventName = cleanText(body.eventName, 40) as AnalyticsEventName;
    const pagePath = cleanText(body.pagePath, 500);
    const visitorId = cleanText(body.visitorId, 80);
    const sessionId = cleanText(body.sessionId, 80);
    if (!ANALYTICS_EVENTS.includes(eventName) || !pagePath.startsWith("/") || !ID_PATTERN.test(visitorId) || !ID_PATTERN.test(sessionId)) return Response.json({ ok: false }, { status: 400 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await createAnalyticsEvent({
      event_name: eventName,
      page_path: pagePath,
      page_title: cleanText(body.pageTitle, 300),
      referrer_host: cleanText(body.referrerHost, 200),
      visitor_id: visitorId,
      session_id: sessionId,
    }, ip);
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
