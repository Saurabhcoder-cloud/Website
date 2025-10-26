'use client';

import { upload } from '@vercel/blob/client';
import { useState } from 'react';

type Props = {
  onUploaded: (blobUrl: string) => void;
};

export default function FileUploader({ onUploaded }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError(null);

    try {
      const token = process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN;
      if (!token) {
        const reader = new FileReader();
        reader.onload = () => {
          onUploaded(reader.result as string);
          setIsUploading(false);
        };
        reader.onerror = () => {
          setError('Unable to read file locally.');
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
        return;
      }

      const result = await upload(file.name, file, {
        access: 'authenticated',
        token
      });
      onUploaded(result.url);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card flex flex-col gap-3 p-4">
      <label className="text-sm font-medium text-slate-200" htmlFor="tax-file">
        Upload your W-2 or 1099 document
      </label>
      <input
        id="tax-file"
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
      />
      {isUploading && <p className="text-xs text-slate-300">Uploading...</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
