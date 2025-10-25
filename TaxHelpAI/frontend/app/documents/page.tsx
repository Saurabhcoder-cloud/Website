'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../lib/api';

type DocumentItem = {
  id: number;
  file_path: string;
  metadata: Record<string, any> | null;
  created_at: string;
};

export default function DocumentsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    api
      .get(`/api/documents`)
      .then((response) => setDocuments(response.data.documents ?? []))
      .catch(() => setDocuments([]));
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-100 py-10">
        <div className="mx-auto max-w-4xl space-y-6 px-4">
          <h1 className="text-3xl font-semibold text-slate-900">My Documents</h1>
          <div className="rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">File</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Uploaded</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-4 py-3 text-slate-700">{doc.metadata?.employer ?? doc.file_path}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(doc.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <a className="text-primary underline" href={doc.file_path}>
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
                {!documents.length && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                      No documents yet. Upload a form from the File Taxes tab.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
