import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    return NextResponse.json({
      success: true,
      vibe: {
        id: crypto.randomUUID(),
        eventId: body?.eventId ?? null,
        caption: body?.caption ?? null,
        rating: Number(body?.rating ?? 0),
        createdAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}