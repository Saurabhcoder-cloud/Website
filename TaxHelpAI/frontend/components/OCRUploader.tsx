'use client';

import { useState } from 'react';
import api from '../lib/api';

export default function OCRUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('document', file);
    setLoading(true);
    try {
      const { data } = await api.post('/api/tax/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Upload W-2 / 1099</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={!file || loading}
          className="self-start rounded-lg bg-primary px-4 py-2 text-white hover:bg-secondary disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? 'Processing…' : 'Process Document'}
        </button>
      </form>
      {result && (
        <div className="mt-6 space-y-3 text-sm">
          <p className="font-semibold text-slate-800">Results</p>
          <p>Refund: ${result.refund?.toFixed?.(2) ?? result.refund}</p>
          <p>Tax Due: ${result.tax_due?.toFixed?.(2) ?? result.tax_due}</p>
          <a className="text-primary underline" href={result.pdf_url}>
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
