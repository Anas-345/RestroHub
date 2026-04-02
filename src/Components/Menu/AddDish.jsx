export default function AddDish({ showForm, setShowForm }) {

    function handleClick() {
        setShowForm(true)
    }
  return (
    <>
     <div
      className={`
        fixed z-20
        transition-all duration-500 ease-out
        ${showForm ? "top-1/2 opacity-100 scale-100" : "top-1/3 opacity-0 scale-95 pointer-events-none"}
        left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-black p-8 shadow-2xl rounded-xl w-full max-w-md
      `}
    >Heloo</div>
      <button className="bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] text-sm font-bold px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap" onClick={handleClick}>
        + Add Dish
      </button>
    </>
  );
}
