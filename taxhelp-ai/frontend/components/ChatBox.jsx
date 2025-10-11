import { useState } from 'react';

export default function ChatBox({ onSend, disabled = false }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    onSend?.(message.trim());
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        placeholder="Ask a question about your taxes..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}
