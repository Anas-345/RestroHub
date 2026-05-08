export default function Loading() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
      <div className="size-10 rounded-full border-2 border-[#2e2a24] border-t-[#e8a045] animate-spin" />
      <p className="text-[#7a7268] text-sm">Loading dishes...</p>
    </div>
  );
}
