'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User, Mic, MicOff } from 'lucide-react';
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
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

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

    // Initialize Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsRecording(false);
          // Auto-send if transcript is clear
          setTimeout(() => handleSend(transcript), 500);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // Slightly higher pitch for "Siri" feel
      // Try to find a nice female voice
      const voices = window.speechSynthesis.getVoices();
      const siriVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha') || v.name.includes('Female'));
      if (siriVoice) utterance.voice = siriVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setInputValue('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleSend = async (forcedValue?: string) => {
    const textToSend = forcedValue || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responseText = generateAIResponse(textToSend);
      const aiResponse: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
      speak(responseText);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Siri-like greetings
    if (lowerQuery === 'hi' || lowerQuery === 'hello' || lowerQuery.includes('hey')) {
      return "Hello! I'm here to help you manage Kivoc Dynamic Technology. What's on your mind?";
    }

    // Stats-aware responses (Polished for Siri-style)
    if (lowerQuery.includes('how many projects') || lowerQuery.includes('project count')) {
      if (stats) {
        return `You have ${stats.projectCount} active projects in the system right now.`;
      }
      return 'Let me check that for you... You have several projects currently active.';
    }

    if (lowerQuery.includes('revenue') || lowerQuery.includes('money') || lowerQuery.includes('wealth')) {
      if (stats) {
        return `Kivoc's total revenue currently stands at R ${stats.totalRevenue.toLocaleString()}. Business is looking good!`;
      }
      return 'Accounting is still processing the latest figures. Please check back in a second.';
    }

    if (lowerQuery.includes('how many clients') || lowerQuery.includes('client count')) {
      if (stats) {
        return `You currently have ${stats.clientCount} clients registered in your database.`;
      }
      return 'I\'m fetching your client list now.';
    }

    // System understanding responses
    if (lowerQuery.includes('project') || lowerQuery.includes('create project')) {
      return 'To start a new project, just head over to the Projects page and click "New Project". I\'ll track the milestones for you.';
    }

    if (lowerQuery.includes('client') || lowerQuery.includes('add client')) {
      return 'Adding a client is easy. Go to the Clients page, click "Add Client", and I\'ll store all their details securely.';
    }

    if (lowerQuery.includes('service') || lowerQuery.includes('pricing')) {
      return 'We offer Web Dev, Mobile Apps, Cloud Services, and UI Design. Web development starts at R45,000. Check the Services page for the full catalog.';
    }

    if (lowerQuery.includes('support') || lowerQuery.includes('ticket')) {
      return 'Your support tickets are all managed in the Support tab. You can respond to clients and track resolved issues there.';
    }

    if (lowerQuery.includes('dashboard') || lowerQuery.includes('overview')) {
      return 'The dashboard gives you a bird\'s-eye view of Kivoc, including revenue charts and recent project activity.';
    }

    if (lowerQuery.includes('mobile') || lowerQuery.includes('phone')) {
      return 'Yes, I\'m fully responsive! You can take your business management anywhere on your phone.';
    }

    if (lowerQuery.includes('database') || lowerQuery.includes('prisma')) {
      return 'I\'m powered by Prisma and a secure local database. Your data is safe and reachable at all times.';
    }

    if (lowerQuery.includes('help') || lowerQuery.includes('how')) {
      return 'I can help you manage projects, add clients, check your revenue, or navigate the ticket system. Just ask!';
    }

    // Default fallback
    return `I'm not quite sure about that, but I can help you with your Kivoc projects, clients, or revenue. Would you like to check your active projects?`;
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
            <button className={styles.closeBtn} onClick={() => {
              setIsOpen(false);
              window.speechSynthesis.cancel();
            }}>
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
            <button 
              className={`${styles.micBtn} ${isRecording ? styles.recording : ''}`}
              onClick={toggleRecording}
              disabled={isLoading}
              title={isRecording ? 'Stop Recording' : 'Start Voice Input'}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <input
              type="text"
              placeholder={isRecording ? "Listening..." : "Ask me anything..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button onClick={() => handleSend()} disabled={isLoading || !inputValue.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

