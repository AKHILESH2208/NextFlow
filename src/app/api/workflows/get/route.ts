import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const workflow = await prisma.workflow.findUnique({
      where: { id: id }
    });

    if (!workflow || workflow.userId !== userId) {
         return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }

    return NextResponse.json({ workflow: { ...workflow, _id: workflow.id } });
  } catch (error: any) {
    console.error('Fetch Workflow error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
