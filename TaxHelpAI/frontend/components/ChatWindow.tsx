'use client';

import { useEffect, useRef, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import { SUPPORTED_LANGUAGES } from '../lib/languages';

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: { title: string; url: string }[];
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;
    const userMessage: Message = { id: crypto.randomUUID(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const { data } = await api.post('/chat/ask', {
        user_id: user.id,
        question: userMessage.text,
        language
      });
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'assistant',
        text: data.answer,
        citations: data.citations
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: 'assistant', text: 'Something went wrong. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 p-4">
        <h2 className="text-lg font-semibold">AI Chat Assistant</h2>
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="rounded border border-slate-300 px-3 py-1 text-sm"
        >
          {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-100 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-xl rounded-lg px-4 py-3 text-sm shadow ${
              message.sender === 'user'
                ? 'ml-auto bg-primary text-white'
                : 'bg-white text-slate-700'
            }`}
          >
            <p>{message.text}</p>
            {message.citations && (
              <ul className="mt-2 space-y-1 text-xs underline">
                {message.citations.map((citation) => (
                  <li key={citation.url}>
                    <a href={citation.url} target="_blank" rel="noreferrer">
                      {citation.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {loading && <p className="text-center text-sm text-slate-500">Assistant is typing…</p>}
        <div ref={endRef} />
      </div>
      <div className="border-t border-slate-200 p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Ask the IRS anything about your taxes"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-secondary disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
