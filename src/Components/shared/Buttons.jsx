export default function Buttons({
  content,
  handleClick,
  selectVariant = content,
}) {
  const variant = {
    Edit: "text-[#7a7268] hover:text-[#e8a045] hover:border-[#e8a045]/40 hover:bg-[#e8a045]/5 bg-transparent text-xs",
    Delete:
      "text-[#7a7268] hover:text-[#e05555] hover:border-[#e05555]/40 hover:bg-[#e05555]/5 bg-transparent text-xs",
    Enable:
      "text-[#7a7268] hover:text-[#4caf82] hover:border-[#4caf82]/40 hover:bg-[#4caf82]/5 bg-transparent text-xs",
    Disable:
      "text-[#7a7268] hover:text-[#e8a045] hover:border-[#e8a045]/40 hover:bg-[#e8a045]/5",
    Default:
      "bg-[#e8a045] hover:bg-[#f0aa55] text-[#0f0e0c] text-gray-200 px-4 py-3",
    Login:
      "border-[#2e2a24] hover:border-[#e8a045]/40 hover:text-[#f0ebe3] text-[#7a7268] px-4 py-3 ",
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
        flex items-center justify-center gap-1.5
        flex-1 py-2 font-semibold rounded-lg
        transition-all duration-200 active:scale-95
        border border-[#2e2a24]  cursor-pointer
        ${variant[selectVariant]}
      `}
      onClick={handleClick}
    >
      {icon[content] && <span className="text-[11px]">{icon[content]}</span>}
      {content}
    </button>
  );
}
