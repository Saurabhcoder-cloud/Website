import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: 'Hello! I am your TaxHelp AI assistant. How can I help you today?'
    }
  ]);
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const languageOptions = useMemo(
    () => [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
      { value: 'hi', label: 'हिन्दी' },
      { value: 'zh', label: '中文' },
      { value: 'ar', label: 'العربية' },
      { value: 'ru', label: 'Русский' },
      { value: 'fa', label: 'فارسی' },
      { value: 'fr', label: 'Français' },
      { value: 'de', label: 'Deutsch' },
      { value: 'pt', label: 'Português' }
    ],
    []
  );

  const apiBaseUrl = useMemo(() => process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000', []);

  const handleSend = async (content) => {
    if (!content?.trim()) return;

    const userMessage = { id: Date.now(), role: 'user', text: content };
    const placeholderId = Date.now() + 1;

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: placeholderId, role: 'assistant', text: 'Processing question...', citations: [] }
    ]);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1,
          message: content,
          language
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Unable to contact AI assistant.');
      }

      const data = await response.json();

      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? {
                ...message,
                text: data.answer,
                citations: data.citations,
                language: data.language
              }
            : message
        )
      );
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? {
                ...message,
                text: 'Sorry, I could not reach the AI assistant right now. Please try again shortly.'
              }
            : message
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-14">
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">AI Chat Assistant</h1>
          <p className="text-sm text-slate-600">
            Ask tax questions in your preferred language. Answers are generated via OpenAI and grounded in IRS resources.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <label htmlFor="language" className="font-medium text-slate-700">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {isLoading && <span className="text-indigo-600">Generating answer…</span>}
          </div>
        </header>

        <section className="flex flex-1 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex-1 space-y-3 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  message.role === 'assistant' ? 'self-start bg-indigo-50 text-slate-700' : 'self-end bg-indigo-600 text-white'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                {message.role === 'assistant' && message.citations?.length ? (
                  <div className="mt-2 space-y-1 text-xs">
                    <p className="font-medium text-slate-600">Citations:</p>
                    <ul className="list-disc space-y-1 pl-4 text-slate-500">
                      {message.citations.map((citation) => (
                        <li key={`${message.id}-${citation.id}`}>
                          <a href={citation.url} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                            [{citation.id}] {citation.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <ChatBox onSend={handleSend} disabled={isLoading} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
