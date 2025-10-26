'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import ChatUI from './ChatUI';
import DocumentList from './DocumentList';
import FileUploader from './FileUploader';
import RefundCalculatorForm from './RefundCalculatorForm';
import SubscriptionManager from './SubscriptionManager';

const tabs = ['Chat', 'Refund', 'File', 'Docs', 'Subscription'] as const;

type FileResult = {
  extracted: Record<string, unknown>;
  calculation: {
    taxable_income: number;
    tax_due: number;
    refund: number;
    status: string;
  };
  file: {
    url: string;
    expires_in: number;
  };
};

export default function DashboardTabs() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Chat');
  const [fileResult, setFileResult] = useState<FileResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (blobUrl: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tax/file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blobUrl, language: 'en' })
      });
      if (!response.ok) {
        throw new Error('Failed to process document');
      }
      const data = await response.json();
      setFileResult(data);
      setActiveTab('Docs');
    } catch (err) {
      console.error(err);
      setError('Unable to process document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-300">
          Signed in as <span className="font-semibold text-white">{session?.user?.email ?? 'guest'}</span> · Plan:{' '}
          <span className="font-semibold text-primary-200">{session?.user?.plan ?? 'free'}</span>
        </p>
      </div>
      <nav className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === tab ? 'bg-primary-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'Chat' && <ChatUI />}

      {activeTab === 'Refund' && <RefundCalculatorForm />}

      {activeTab === 'File' && (
        <div className="space-y-4">
          <FileUploader onUploaded={handleUpload} />
          {loading && <p className="text-sm text-slate-300">Processing...</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}
          {fileResult && (
            <div className="card space-y-3 p-6">
              <h3 className="text-lg font-semibold">Latest calculation</h3>
              <p className="text-sm text-slate-300">Taxable income: ${fileResult.calculation.taxable_income.toLocaleString()}</p>
              <p className="text-sm text-slate-300">Tax due: ${fileResult.calculation.tax_due.toLocaleString()}</p>
              <p className="text-sm text-slate-300">Refund: ${fileResult.calculation.refund.toLocaleString()}</p>
              <a className="text-sm text-primary-300" href={fileResult.file.url} target="_blank" rel="noreferrer">
                Download PDF
              </a>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Docs' && <DocumentList />}

      {activeTab === 'Subscription' && <SubscriptionManager />}
    </div>
  );
}
