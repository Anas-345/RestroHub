export default function Buttons({
  content,
  handleClick,
  selectVariant = content,
}) {
  const transparent = "bg-transparent text-xs font-semibold";

  const editDisable = `text-[#7a7268] hover:text-[#e8a045] hover:border-[#e8a045]/40 hover:bg-[#e8a045]/5 ${transparent}`;
  const dangerBtn = `text-[#7a7268] hover:text-[#e05555] hover:border-[#e05555]/40 hover:bg-[#e05555]/5 ${transparent}`;

  const variant = {
    Edit: editDisable,
    Delete: dangerBtn,
    Enable: `text-[#7a7268] hover:text-[#4caf82] hover:border-[#4caf82]/40 hover:bg-[#4caf82]/5 ${transparent}`,
    Disable: editDisable,
    Default:
      "bg-[#e8a045] hover:bg-[#f0aa55] text-[#0f0e0c] font-bold text-sm px-4",
    LightBtn: `text-[#7a7268] hover:bg-[#2e2a24] hover:text-[#f0ebe3] border-[#2e2a24] px-4 ${transparent}`,
    Counter:
      "bg-[#e8a045]/10 hover:bg-[#e8a045]/20 text-[#e8a045] border-[#e8a045]/30 hover:border-[#e8a045]/60 text-base font-bold flex-none !w-9 !h-9 !py-0 !flex-none",
    Logout: `${dangerBtn} px-4`,
    Danger:
      "px-4 text-sm border border-rose-500/20 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10",
  };

  const icon = {
    Delete: "🗑",
    Enable: "✓",
    Disable: "⊘",
    Edit: "✏️",
  };

  return (
    <button
      className={`
        flex items-center justify-center gap-1.5 flex-1 py-3 rounded-lg font-semibold border border-[#2e2a24] transition-all duration-200 active:scale-95 cursor-pointer
        ${variant[selectVariant]}
      `}
      onClick={handleClick}
    >
      {icon[content] && <span className="text-[11px]">{icon[content]}</span>}
      {content}
    </button>
  );
}
