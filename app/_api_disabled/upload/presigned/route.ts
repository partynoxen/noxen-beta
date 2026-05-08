export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { generatePresignedUploadUrl } from '@/lib/s3';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileName, contentType, isPublic } = body ?? {};
    if (!fileName || !contentType) {
      return NextResponse.json({ error: 'Missing fileName or contentType' }, { status: 400 });
    }
    const result = await generatePresignedUploadUrl(fileName, contentType, isPublic ?? true);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
