'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';
import styles from './AIAssistant.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Kivoc AI Assistant. I can help you with managing projects, clients, services, and answer questions about the system. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/ai/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch AI stats:', err);
      }
    };
    fetchStats();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Stats-aware responses
    if (lowerQuery.includes('how many projects') || lowerQuery.includes('project count')) {
      if (stats) {
        return `There are currently ${stats.projectCount} projects in the system.`;
      }
      return 'I\'m currently calculating the projects... Try asking again in a moment!';
    }

    if (lowerQuery.includes('revenue') || lowerQuery.includes('money')) {
      if (stats) {
        return `The total revenue across all projects is R ${stats.totalRevenue.toLocaleString()}.`;
      }
      return 'I\'m fetching the latest financial data... Try asking again in a moment!';
    }

    if (lowerQuery.includes('how many clients')) {
      if (stats) {
        return `We currently have ${stats.clientCount} clients registered in the system.`;
      }
      return 'I\'m counting the clients... Try asking again in a moment!';
    }

    // System understanding responses
    if (lowerQuery.includes('project') || lowerQuery.includes('create project')) {
      return 'To create a new project, navigate to the Projects page and click the "New Project" button. You\'ll need to select a client, add services, set a budget, and choose a start date. The system automatically tracks project status (Active, Completed, Pending, or On Hold).';
    }

    if (lowerQuery.includes('client') || lowerQuery.includes('add client')) {
      return 'You can add a new client from the Clients page. Click "Add Client" and fill in their name, email, company, and phone number. Each client card shows their active projects and support tickets for easy tracking.';
    }

    if (lowerQuery.includes('service') || lowerQuery.includes('pricing')) {
      return 'Our service catalog includes Web Development (R45,000), Mobile App Development (R95,000), Cloud Services (R35,000), and UI/UX Design (R25,000). You can customize these or add new services from the Services page.';
    }

    if (lowerQuery.includes('support') || lowerQuery.includes('ticket')) {
      return 'The Support system allows you to manage customer tickets. You can view all tickets, respond to customer queries, and track conversation history. Each ticket has a status (Open, In Progress, Resolved, Closed) and priority level.';
    }

    if (lowerQuery.includes('dashboard') || lowerQuery.includes('overview')) {
      return 'The Dashboard provides a real-time overview of your business: Total Revenue, Active Projects, Client Count, Monthly Revenue charts, Service Distribution, and Recent Projects. All metrics update automatically when you add or modify data.';
    }

    if (lowerQuery.includes('mobile') || lowerQuery.includes('phone')) {
      return 'This system is fully mobile-responsive! The sidebar converts to a hamburger menu on mobile devices, and all pages adapt to smaller screens. You can manage your business from any device.';
    }

    if (lowerQuery.includes('database') || lowerQuery.includes('prisma')) {
      return 'The system uses Prisma ORM with SQLite for development. All data is stored locally and persists between sessions. For production, you can easily switch to PostgreSQL or MySQL by updating the DATABASE_URL in your .env file.';
    }

    if (lowerQuery.includes('help') || lowerQuery.includes('how')) {
      return 'I can help you with:\n• Creating and managing projects\n• Adding and tracking clients\n• Understanding the service catalog\n• Managing support tickets\n• Navigating the system\n• Database and technical questions\n\nJust ask me anything!';
    }

    // Default fallback with system knowledge
    return `I understand you're asking about "${query}". While I'm still learning, I can help you navigate Kivoc Dynamic Technology's management system. Try asking me about projects, clients, services, support tickets, or how to use specific features. What would you like to know more about?`;
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button className={styles.fab} onClick={() => setIsOpen(true)}>
          <Sparkles size={24} />
          <span className={styles.fabText}>AI Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <Bot size={24} />
              <div>
                <h3>Kivoc AI Assistant</h3>
                <span className={styles.status}>
                  <div className={styles.statusDot}></div>
                  Online
                </span>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                }`}
              >
                <div className={styles.messageIcon}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={styles.messageContent}>
                  <p>{msg.content}</p>
                  <span className={styles.timestamp}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.messageIcon}>
                  <Bot size={18} />
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.typing}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Ask me anything about Kivoc..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !inputValue.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
