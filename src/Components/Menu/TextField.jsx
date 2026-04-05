export default function TextField({
  currentRef,
  handleEnter,
  nextRef,
  content,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#7a7268] text-[11px] uppercase tracking-[1.5px] font-medium">
        {content}
      </label>
      <input
        ref={currentRef}
        type='text'
        placeholder={placeholder}
        className="w-full bg-[#1a1814] border border-[#2e2a24] rounded-lg px-4 py-2.5 text-sm text-[#f0ebe3] placeholder-[#3d3a37] outline-none focus:border-[#e8a045]/50 focus:bg-[#1e1c18] transition-all duration-200"
        onKeyDown={(e) => e.key === "Enter" && handleEnter(nextRef)}
      />
    </div>
  );
}
