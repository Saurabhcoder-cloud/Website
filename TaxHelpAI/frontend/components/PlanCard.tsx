interface PlanCardProps {
  name: string;
  price: string;
  features: string[];
  onSelect?: () => void;
}

export default function PlanCard({ name, price, features, onSelect }: PlanCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-xl font-semibold text-primary">{name}</h3>
        <p className="text-3xl font-bold">{price}</p>
      </div>
      <ul className="flex flex-1 flex-col gap-2 text-sm text-slate-600">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-secondary"
      >
        Choose Plan
      </button>
    </div>
  );
}
