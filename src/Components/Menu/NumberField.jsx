import { toast } from "react-toastify";

export default function NumberField({
  currentRef,
  handleEnter,
  nextRef,
  content,
  placeholder,
  max,
  value,
  setValue,
}) {
  function handleChange(e) {
    const val = e.target.value;
    if (Number(val) < 0 || Number(val) > max) {
      toast.warning(`The value must be between 0 & ${max}`);
    }
    setValue(val);
  }

  function handleSubmit(e) {
    const val = e.target.value;
    if (e.key === "Enter") {
      if (val === '' || Number(val) === 0) {
        setValue('')
      }else if (Number(val) < 0) {
        setValue(1)
      }else if(Number(val) > max){
        setValue(max)
      }
      handleEnter(nextRef);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#7a7268] text-[11px] uppercase tracking-[1.5px] font-medium">
        {content}
      </label>
      <input
        ref={currentRef}
        value={value}
        onChange={(e) => handleChange(e)}
        type="number"
        placeholder={placeholder}
        className="w-full bg-[#1a1814] border border-[#2e2a24] rounded-lg px-4 py-2.5 text-sm text-[#f0ebe3] placeholder-[#3d3a37] outline-none focus:border-[#e8a045]/50 focus:bg-[#1e1c18] transition-all duration-200"
        onKeyDown={(e) => handleSubmit(e)}
      />
    </div>
  );
}
