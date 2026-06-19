import { NextRequest, NextResponse } from "next/server";

import { generateGuestScene, GuestSceneInputError } from "@/lib/guest-scene";
import { getErrorMessage } from "@/lib/error-utils";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const result = await generateGuestScene(payload);

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(
          error,
          "Failed to generate the guest scene preview"
        ),
        code: error instanceof GuestSceneInputError ? error.code : "UNKNOWN",
      },
      { status: 400 }
    );
  }
}
