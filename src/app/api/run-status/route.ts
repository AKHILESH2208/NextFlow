import { NextResponse } from 'next/server';
import { runs } from '@trigger.dev/sdk/v3';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'No run id provided' }, { status: 400 });
    }

    const runInstance = await runs.retrieve(id);

    return NextResponse.json({ 
      status: runInstance.status,
      output: runInstance.output
    });

  } catch (error: any) {
    console.error('Trigger polling error:', error);
    
    // If trigger says Not Found yet, it's just race-condition buffering. Let it say QUEUED safely.
    if (error.status === 404 || error.message?.includes('Not found')) {
      return NextResponse.json({ status: 'QUEUED', output: null });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
