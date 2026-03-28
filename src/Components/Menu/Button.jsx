export default function Button({ type, setType, selectedType }) {
  const isActive = type === selectedType;

  function handleClick() {
    setType(type);
  }

  return (
    <button
      onClick={handleClick}
      className={`
        cursor-pointer whitespace-nowrap text-[11px] font-semibold px-4 py-1.5 rounded-full
        transition-all duration-200 border tracking-wide
        ${
          isActive
            ? "bg-[#e8a045]/15 border-[#e8a045]/50 text-[#e8a045] shadow-[0_0_12px_rgba(232,160,69,0.15)]"
            : "border-[#2e2a24] text-[#7a7268] hover:border-[#e8a045]/30 hover:text-[#c8a06a] bg-transparent"
        }
      `}
    >
      {type}
    </button>
  );
}
