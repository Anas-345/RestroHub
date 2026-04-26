export default function ScrollRight({scrollRight}) {
    return <button
          onClick={scrollRight}
          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#2e2a24] hover:bg-[#e8a045]/20 text-[#7a7268] hover:text-[#e8a045] transition-all duration-200 cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
}