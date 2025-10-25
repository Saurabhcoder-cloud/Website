import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '../../../../lib/db';
import { authOptions } from '../../../../lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const documents = await prisma.document.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json({
    documents: documents.map((doc) => ({
      id: doc.id,
      kind: doc.kind,
      url: doc.blobKey,
      createdAt: doc.createdAt.toISOString()
    }))
  });
}
