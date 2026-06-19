import { NextRequest, NextResponse } from "next/server";

import { getActiveSessionUser } from "@/lib/auth/session";
import { getErrorMessage } from "@/lib/error-utils";
import { listUserProjectSummaries } from "@/lib/projects/guest-project";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const access = await getActiveSessionUser(req.headers);
    if (!access.ok) {
      return NextResponse.json(
        { error: access.error },
        { status: access.status }
      );
    }

    const projects = await listUserProjectSummaries({
      userId: access.user.id,
    });

    return NextResponse.json(
      { projects },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(error, "Failed to load projects"),
      },
      { status: 500 }
    );
  }
}
