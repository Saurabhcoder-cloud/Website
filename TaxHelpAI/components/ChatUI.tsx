'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { locales, type Locale } from '../lib/i18n';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: { title: string; url: string }[];
};

export default function ChatUI() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<Locale>('en');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: session?.user?.id,
          question: userMessage.content,
          language
        })
      });

      const data = await response.json();
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.answer,
        citations: data.citations
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Something went wrong. Please try again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">IRS Chat Assistant</h2>
        <select
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm"
          value={language}
          onChange={(event) => setLanguage(event.target.value as Locale)}
        >
          {locales.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        {messages.length === 0 && <p className="text-sm text-slate-400">Ask any tax question to get started.</p>}
        {messages.map((message) => (
          <div key={message.id} className={`rounded-xl p-3 ${message.role === 'user' ? 'bg-primary-600/60 text-white' : 'bg-slate-800/70 text-slate-100'}`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            {message.citations && (
              <ul className="mt-2 list-inside list-disc text-xs text-primary-200">
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
        {loading && <p className="text-xs text-slate-300">TaxHelp AI is typing...</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
          placeholder="Ask about deductions, credits, deadlines..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
