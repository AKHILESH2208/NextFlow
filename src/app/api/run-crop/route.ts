import { NextResponse } from 'next/server';
import { tasks } from '@trigger.dev/sdk/v3';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let host = req.headers.get("host") || "127.0.0.1:3000";
    if (host.includes('localhost')) {
      host = host.replace('localhost', '127.0.0.1'); 
    }
    const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
    
    if (body.imageUrl && body.imageUrl.startsWith('/')) {
      body.imageUrl = `${protocol}://${host}${body.imageUrl}`;
    }

    const handle = await tasks.trigger('crop-image', body);
    return NextResponse.json({ success: true, id: handle.id });
  } catch (error: any) {
    console.error('Trigger execution error Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}