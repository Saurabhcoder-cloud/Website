'use client';

import { useEffect, useState } from 'react';

type DocumentItem = {
  id: number;
  kind: string;
  url: string;
  createdAt: string;
};

export default function DocumentList() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocuments() {
      try {
        const response = await fetch('/api/tax/documents');
        if (!response.ok) {
          throw new Error('Failed to load documents');
        }
        const data = await response.json();
        setDocuments(data.documents ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDocuments();
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-400">Loading documents…</p>;
  }

  if (documents.length === 0) {
    return <p className="text-sm text-slate-400">No documents yet. Upload a W-2 or 1099 to generate your first PDF.</p>;
  }

  return (
    <ul className="space-y-3">
      {documents.map((doc) => (
        <li key={doc.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-white">{doc.kind}</p>
            <p className="text-xs text-slate-400">Generated {new Date(doc.createdAt).toLocaleString()}</p>
          </div>
          <a className="text-sm text-primary-300" href={doc.url} target="_blank" rel="noreferrer">
            Download
          </a>
        </li>
      ))}
    </ul>
  );
}
