import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projectCount = await (prisma as any).project.count();
    const clientCount = await (prisma as any).client.count();
    const serviceCount = await (prisma as any).service.count();
    const ticketCount = await (prisma as any).supportTicket.count();
    
    const projects = await (prisma as any).project.findMany({
      select: { budget: true }
    });
    const totalRevenue = projects.reduce((sum: number, p: any) => sum + (p.budget || 0), 0);

    return NextResponse.json({
      projectCount,
      clientCount,
      serviceCount,
      ticketCount,
      totalRevenue,
      status: 'Online',
      lastUpdate: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch system stats' }, { status: 500 });
  }
}
