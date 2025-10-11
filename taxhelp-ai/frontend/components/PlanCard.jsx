export default function PlanCard({ name, price, features = [], ctaLabel = 'Choose Plan' }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
        <p className="text-3xl font-bold text-indigo-600">{price}</p>
      </div>
      <ul className="mb-6 space-y-2 text-sm text-slate-600">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="mt-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
        {ctaLabel}
      </button>
    </div>
  );
}
