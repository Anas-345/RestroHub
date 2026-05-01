import { useContext } from "react";
import Buttons from "../shared/Buttons";
import {
  handleAdd,
  handleDelete,
  handleEdit,
  handleOrder,
  handleStatus,
  handleSubtract,
} from "../../Functions/DishFunctions";
import { AuthContext, MenuContext, OrderContext } from "@/Context/Contexts";

export default function DishButtons({
  dishAvailability,
  id,
  status,
  setEditId,
  setShowEditForm,
  orderState,
  quantity,
  setQuantity,
  existingOrder,
  price,
  userEmail,
  setOrderState,
  name,
}) {
  const { menu, setMenu, customDishes, setCustomDishes } =
    useContext(MenuContext);
  const { setOrder } = useContext(OrderContext);
  const { userRole } = useContext(AuthContext);

  const check =
    customDishes.length === menu.length
      ? menu.filter((dish, i) => customDishes[i].id !== dish.id).length
      : 1;

  return (
    <div className="flex gap-2 px-4 pb-4">
      {userRole === "owner" ? (
        <>
          <Buttons
            content={dishAvailability}
            handleClick={() =>
              handleStatus(check, setCustomDishes, setMenu, id, status)
            }
          />
          <Buttons
            content="Edit"
            handleClick={() => handleEdit(setEditId, id, setShowEditForm)}
          />
          <Buttons
            content="Delete"
            handleClick={() =>
              handleDelete(check, setCustomDishes, setMenu, id)
            }
          />
        </>
      ) : orderState ? (
        <div className="flex items-center gap-2 w-full">
          <Buttons
            content="-"
            selectVariant="Counter"
            handleClick={() => handleSubtract(setQuantity)}
          />
          <span
            className="flex-1 text-center text-[#f0ebe3] font-bold text-sm bg-[#1a1814] border border-[#2e2a24] rounded-lg py-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {quantity}
          </span>
          <Buttons
            content="+"
            selectVariant="Counter"
            handleClick={() => handleAdd(setQuantity)}
          />
        </div>
      ) : (
        <Buttons
          content="Add to Order"
          handleClick={() =>
            handleOrder(
              setQuantity,
              existingOrder,
              setOrder,
              id,
              price,
              userEmail,
              setOrderState,
              name,
            )
          }
          selectVariant={"Default"}
        />
      )}
    </div>
  );
}
