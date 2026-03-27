import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, nodes, edges } = body;

    let workflow;
    
    if (id) {
       workflow = await prisma.workflow.update({
         where: { id: id, userId: userId },
         data: { name, nodes, edges }
       });
    } else {
       workflow = await prisma.workflow.create({
         data: {
           userId,
           name: name || 'Untitled Workflow',
           nodes: nodes || [],
           edges: edges || []
         }
       });
    }

    return NextResponse.json({ success: true, workflow: { ...workflow, _id: workflow.id } });
  } catch (error: any) {
    console.error('Save Workflow error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workflows = await prisma.workflow.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' }
    });

    const mappedWorkflows = workflows.map((w: any) => ({ ...w, _id: w.id }));

    return NextResponse.json({ workflows: mappedWorkflows });
  } catch (error: any) {
    console.error('Fetch Workflows error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
