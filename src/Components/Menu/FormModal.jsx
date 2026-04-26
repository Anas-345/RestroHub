import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MenuContext } from "@/Context/Contexts";
import NumberField from "./NumberField";
import InputField from "../shared/InputField";

export default function FormModal({
  showForm,
  setShowForm,
  id = null,
  content,
}) {
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");

  const { menu, setCustomDishes } = useContext(MenuContext);

  const nameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const rateRef = useRef();
  const imgRef = useRef();

  function resetInputs() {
    nameRef.current.value = "";
    descRef.current.value = "";
    priceRef.current.value = "";
    rateRef.current.value = "";
    imgRef.current.value = "";
  }

  function idGen() {
    return Math.random().toString(36).slice(2);
  }

  function dishObj(prev, name, dsc, price, img, rate) {
    return [
      ...prev,
      {
        id: id ?? idGen(),
        name,
        dsc,
        price,
        img,
        rate,
        status: "Available",
        totalOrders: 0,
      },
    ];
  }

  function handleClick() {
    const priceVal = Number(priceRef.current.value);
    const rateVal = Number(rateRef.current.value);
    const name = nameRef.current.value.trim();
    const dsc = descRef.current.value.trim();
    const price = !priceVal
      ? ""
      : priceVal < 0
        ? 10
        : priceVal > 10000
          ? 10000
          : priceVal;
    const img = imgRef.current.value.trim();
    const rate =
      rateVal === null ? null : rateVal < 0 ? 1 : rateVal > 5 ? 5 : rateVal;
    if (!name || !dsc || !img || !price) {
      toast.error("Please add all details of dishes");
      return;
    }
    !id
      ? setCustomDishes((prev) => dishObj(prev, name, dsc, price, img, rate))
      : setCustomDishes((prev) =>
          dishObj(
            prev.filter((dish) => dish.id !== id),
            name,
            dsc,
            price,
            img,
            rate,
          ),
        );
    setPrice("");
    setRate("");
    setShowForm(false);
    toast.success(`Dish ${content}ed Successfully`);
  }

  function handleEnter(focusRef) {
    focusRef.current.focus();
  }

  function exitForm() {
    setShowForm(false);
  }

  useEffect(() => {
    resetInputs();
    nameRef.current.focus();
    if (content === "Update") {
      const dish = menu.find((dish) => dish.id === id);
      nameRef.current.value = dish.name;
      descRef.current.value = dish.dsc;
      priceRef.current.value = dish.price;
      rateRef.current.value = dish.rate;
      imgRef.current.value = dish.img;
    }
  }, [showForm]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${showForm ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={exitForm}
      />

      <div
        className={`
          fixed z-50 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-md mx-4
          transition-all duration-500 ease-out
          ${showForm ? "top-1/2 opacity-100 scale-100" : "top-1/3 opacity-0 scale-95 pointer-events-none"}
          `}
        onKeyDown={(e) => e.key === "Escape" && exitForm()}
      >
        <div className="bg-[#161412] border border-[#2e2a24] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">
          <div className="h-px w-full bg-linear-to-r from-[#e8a045]/60 via-[#e8a045] to-[#c45c2e]/60" />

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className="text-[#f0ebe3] text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {content} Dish
                </h2>
                <p className="text-[#7a7268] text-xs mt-0.5">
                  Fill in the details to {content.toLowerCase()} to your menu
                </p>
              </div>
              <button
                onClick={exitForm}
                className="text-[#7a7268] hover:text-[#f0ebe3] hover:bg-[#2e2a24] w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <InputField
                currentRef={nameRef}
                handleEnter={handleEnter}
                param={descRef}
                content={"Name"}
                placeholder={"Dish Name"}
                type={"text"}
              />
              <InputField
                currentRef={descRef}
                handleEnter={handleEnter}
                param={priceRef}
                content={"Description"}
                placeholder={"Short description"}
                type={"text"}
              />
              <NumberField
                currentRef={priceRef}
                handleEnter={handleEnter}
                nextRef={rateRef}
                content={"Price (Rs)"}
                placeholder={"e.g. 350 (10-10000)"}
                max={10000}
                value={price}
                setValue={setPrice}
              />
              <NumberField
                currentRef={rateRef}
                handleEnter={handleEnter}
                nextRef={imgRef}
                content={"Rating"}
                placeholder={"e.g. 4.5 (0-5) (optional)"}
                max={5}
                value={rate}
                setValue={setRate}
              />
              <InputField
                currentRef={imgRef}
                handleEnter={handleClick}
                content={"Image URL"}
                placeholder={"Paste image URL"}
                type={"text"}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={exitForm}
                className="flex-1 py-2.5 text-sm font-semibold rounded-lg border border-[#2e2a24] text-[#7a7268] hover:bg-[#2e2a24] hover:text-[#f0ebe3] transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClick}
                className="flex-1 py-2.5 text-sm font-bold rounded-lg bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] transition-all duration-200 cursor-pointer"
              >
                {content} Dish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
