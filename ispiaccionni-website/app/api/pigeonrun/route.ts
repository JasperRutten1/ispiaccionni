import { NextResponse } from "next/server";

const LEADERBOARD_ID = "pigeonrun";
const LOOTLOCKER_API_KEY = process.env.LOOTLOCKER_API_KEY;

export async function POST(request: Request) {
  if (!LOOTLOCKER_API_KEY) {
    return NextResponse.json(
      { error: "Server misconfiguration: LOOTLOCKER_API_KEY is not set." },
      { status: 500 }
    );
  }

  let body: { name?: string; score?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const score = typeof body.score === "number" ? body.score : NaN;

  if (!name) {
    return NextResponse.json({ error: "Player name is required." }, { status: 400 });
  }

  if (Number.isNaN(score)) {
    return NextResponse.json({ error: "Score must be a number." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.lootlocker.io/v1/leaderboards/${LEADERBOARD_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": LOOTLOCKER_API_KEY,
        },
        body: JSON.stringify({
          member_id: name,
          score,
          metadata: { name },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error ?? data.message ?? "Failed to submit score." },
        { status: response.status || 502 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: (error instanceof Error ? error.message : "Unable to submit score.") },
      { status: 502 }
    );
  }
}
