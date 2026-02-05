'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addNote(ticketId: number, content: string, type: string = 'Response') {
  await prisma.ticketNote.create({
    data: {
      ticketId,
      content,
      type,
      author: 'Agent' // In a real app, this would be the logged-in user
    }
  });

  // If agent responds, update status to "In Progress" or "Resolved" maybe?
  if (type === 'Response') {
      await prisma.supportTicket.update({
          where: { id: ticketId },
          data: { status: 'In Progress' }
      });
  }

  revalidatePath('/support');
}

export async function createTicket(subject: string, clientId: number, priority: string, category: string) {
    const ticket = await prisma.supportTicket.create({
        data: {
            subject,
            clientId,
            priority,
            category,
            status: 'Open'
        }
    });
    
    await prisma.ticketNote.create({
        data: {
            ticketId: ticket.id,
            content: 'Ticket created manually by Agent',
            type: 'System',
            author: 'System'
        }
    });

    revalidatePath('/support');
}
