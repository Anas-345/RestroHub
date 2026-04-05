export default function DishButton({ content, handleClick }) {
  const variant = {
    Edit: "text-[#7a7268] hover:text-[#e8a045] hover:border-[#e8a045]/40 hover:bg-[#e8a045]/5",
    Delete:
      "text-[#7a7268] hover:text-[#e05555] hover:border-[#e05555]/40 hover:bg-[#e05555]/5",
    Enable:
      "text-[#7a7268] hover:text-[#4caf82] hover:border-[#4caf82]/40 hover:bg-[#4caf82]/5",
    Disable:
      "text-[#7a7268] hover:text-[#e8a045] hover:border-[#e8a045]/40 hover:bg-[#e8a045]/5",
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
        flex-1 py-2 text-xs font-semibold rounded-lg
        transition-all duration-200 active:scale-95
        border border-[#2e2a24] bg-transparent cursor-pointer
        ${variant[content]}
      `}
      onClick={handleClick}
    >
      <span className="text-[11px]">{icon[content]}</span>
      {content}
    </button>
  );
}
