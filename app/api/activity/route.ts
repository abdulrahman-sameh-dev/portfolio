import { getGitActivity } from "@/lib/activity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const activity = await getGitActivity();
  return Response.json(activity, {
    headers: { "Cache-Control": "no-store" },
  });
}