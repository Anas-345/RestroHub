import axios from "axios";

const API = "https://free-food-menus-api-two.vercel.app/";

export async function API_Call(endpoint, setLoading, setMenu) {
  setLoading(true);
  try {
    let data = await axios.get(API + endpoint);
    setMenu(
      data.data.map((item) => {
        return { ...item, status: "Available", totalOrders: 0 };
      }),
    );
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export function checkScroll(scrollRef, setCanScrollLeft, setCanScrollRight) {
  const el = scrollRef.current;
  if (!el) return;
  setCanScrollLeft(el.scrollLeft > 0);
  setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
}

export function scrollLeft(scrollRef) {
  scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
}

export function scrollRight(scrollRef) {
  scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
}
