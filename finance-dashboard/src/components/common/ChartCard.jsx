import HoverCard from "./HoverCard";

export default function ChartCard({ title, icon: Icon, children }) {
  return (
    <HoverCard
      disableScale
      className="border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </HoverCard>
  );
}