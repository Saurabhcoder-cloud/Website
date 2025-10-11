export default function OCRUploader({ onUpload }) {
  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onUpload?.(file);
  };

  return (
    <div className="rounded-lg border border-dashed border-indigo-400 bg-indigo-50 p-6 text-center">
      <p className="mb-4 text-sm text-slate-600">
        Upload your W-2 or 1099 documents to auto-fill IRS forms using OCR.
      </p>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm">
        <span>Choose File</span>
        <input type="file" accept="application/pdf,image/*" className="hidden" onChange={handleChange} />
      </label>
    </div>
  );
}
