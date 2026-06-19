import { NextRequest, NextResponse } from "next/server";

import { getActiveSessionUser } from "@/lib/auth/session";
import { getErrorMessage } from "@/lib/error-utils";
import { isGuestSceneDraft } from "@/lib/guest-scene-draft";
import { createProjectFromGuestDraft } from "@/lib/projects/guest-project";

export async function POST(req: NextRequest) {
  try {
    const access = await getActiveSessionUser(req.headers);
    if (!access.ok) {
      return NextResponse.json(
        { error: access.error },
        { status: access.status }
      );
    }

    const payload = await req.json();
    if (!isGuestSceneDraft(payload)) {
      return NextResponse.json(
        { error: "Guest scene draft is invalid or missing" },
        { status: 400 }
      );
    }

    const result = await createProjectFromGuestDraft({
      userId: access.user.id,
      draft: payload,
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(error, "Failed to save guest scene project"),
      },
      { status: 500 }
    );
  }
}
