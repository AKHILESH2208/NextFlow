import { NextResponse } from 'next/server';
import { tasks } from '@trigger.dev/sdk/v3';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const handle = await tasks.trigger('run-llm', body);
    return NextResponse.json({ success: true, id: handle.id });
  } catch (error: any) {
    console.error('Trigger execution error Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
