'use client';

import { useState } from 'react';
import styles from '@/app/support/page.module.css';
import { Send, User, Clock, AlertCircle, ChevronLeft } from 'lucide-react';
import { addNote } from '@/app/support/actions';

interface Note {
  id: number;
  content: string;
  type: string;
  author: string;
  createdAt: Date;
}

interface Client {
  id: number;
  name: string;
  company: string | null;
}

interface Ticket {
  id: number;
  subject: string;
  status: string;
  priority: string;
  category: string;
  createdAt: Date;
  client: Client;
  notes: Note[];
}

export default function AgentInterface({ tickets }: { tickets: Ticket[] }) {
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Sorting: Most recent updates first? Or consistent order.
  const sortedTickets = [...tickets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const selectedTicket = sortedTickets.find(t => t.id === selectedTicketId);

  async function handleSendMessage() {
    if (!selectedTicketId || !message.trim()) return;

    setIsSending(true);
    try {
      await addNote(selectedTicketId, message);
      setMessage('');
    } catch (error) {
      console.error("Failed to send content:", error);
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <div className={styles.grid}>
      {/* Ticket List */}
      <div className={`${styles.ticketList} ${selectedTicketId ? styles.hidden : ''}`}>
        <div className={styles.listHeader}>
          Active Tickets ({sortedTickets.length})
        </div>
        <div className={styles.scrollArea}>
          {sortedTickets.map(ticket => (
            <div
              key={ticket.id}
              className={`${styles.ticketItem} ${selectedTicketId === ticket.id ? styles.selected : ''}`}
              onClick={() => setSelectedTicketId(ticket.id)}
            >
              <div className={styles.ticketHeader}>
                <div className={styles.ticketSubject}>{ticket.subject}</div>
                <div className={`${styles.tag} ${ticket.priority.toLowerCase()}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                  {ticket.priority}
                </div>
              </div>
              <div className={styles.ticketMeta}>
                <span>#{ticket.id}</span>
                <span>•</span>
                <span>{ticket.client.name}</span>
                <span>•</span>
                <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className={`${styles.detailView} ${!selectedTicketId ? styles.hidden : ''}`}>
        {selectedTicket ? (
          <>
            <div className={styles.detailHeader}>
              <button className={styles.backBtn} onClick={() => setSelectedTicketId(null)}>
                <ChevronLeft size={18} /> Back to List
              </button>
              <div className={styles.detailTitle}>{selectedTicket.subject}</div>
              <div className={styles.tags}>
                <span className={`${styles.tag} ${selectedTicket.priority.toLowerCase()}`}>
                  {selectedTicket.priority} Priority
                </span>
                <span className={styles.tag} style={{ background: '#E2E8F0', color: '#475569' }}>
                  {selectedTicket.status}
                </span>
                <span className={styles.tag} style={{ background: '#E2E8F0', color: '#475569' }}>
                  {selectedTicket.category}
                </span>
              </div>
              <div style={{ marginTop: '12px', fontSize: '14px', color: '#64748B' }}>
                Client: <b>{selectedTicket.client.name}</b> ({selectedTicket.client.company})
              </div>
            </div>

            <div className={styles.messagesArea}>
              {selectedTicket.notes.map(note => (
                <div key={note.id} className={`${styles.message} ${note.author === 'Agent' ? styles.agent : note.author === 'System' ? styles.system : styles.client}`}>
                  <div>{note.content}</div>
                  <div className={styles.messageMeta}>
                    {note.author} • {new Date(note.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.inputArea}>
              <textarea
                className={styles.textarea}
                placeholder="Type your response..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                disabled={isSending}
              />
              <button
                className="btn btn-primary"
                onClick={handleSendMessage}
                disabled={isSending || !message.trim()}
                style={{ height: 'fit-content', alignSelf: 'flex-end' }}
              >
                <Send size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <User size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
            <h3>Select a ticket</h3>
            <p>Choose an active inquiry from the list.</p>
          </div>
        )}
      </div>
    </div>
  );
}
