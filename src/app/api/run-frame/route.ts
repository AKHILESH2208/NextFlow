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
    
    if (body.videoUrl && body.videoUrl.startsWith('/')) {
      // NOTE: Using a public proxy like ngrok is recommended for deployed triggers.
      // But if user is running ngrok url in browser, host will be the ngrok URL.
      body.videoUrl = `${protocol}://${host}${body.videoUrl}`;
    }

    const handle = await tasks.trigger('extract-frame', body);
    return NextResponse.json({ success: true, id: handle.id });
  } catch (error: any) {
    console.error('Trigger execution error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}