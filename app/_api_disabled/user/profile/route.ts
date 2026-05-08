import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    id: 'demo-user',
    name: 'Demo User',
    email: 'demo@vybe.app',
    avatarUrl: null,
    savedCount: 0,
    likedCount: 0,
    vibeCount: 0,
  });
}