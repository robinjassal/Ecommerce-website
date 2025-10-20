import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCartQty } from "@/store/shop/cart-slice";
import toast from "react-hot-toast";

function CartItems({ product, onIncrease, onDecrease }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function onDelete(product) {
    dispatch(
      deleteCart({ userId: user?.id, productId: product.productId })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success("Product removed from cart");
      } else {
        toast.error("something went wrong");
      }
    });
  }
  function onUpdateQuantity(product, newQuantity) {
    dispatch(
      updateCartQty({
        userId: user?.id,
        productId: product.productId,
        quantity: newQuantity,
      })
    )
      .then((data) => {
        console.log(data); // for debugging
        if (data?.payload?.success) {
          toast.success("Quantity updated successfully ✅");
        } else {
          toast.error("Failed to update quantity ❌");
        }
      })
      .catch(() => {
        toast.error("Network error");
      });
  }

  return (
    <div className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-3 mb-3 hover:shadow-md transition">
      {/* Left: Product Image + Info */}
      <div className="flex items-center gap-4">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-16 h-16 object-cover rounded-lg border"
        />

        <div>
          <h3 className="font-semibold text-gray-800">{product?.title}</h3>

          <div className="flex items-center gap-2">
            {product?.salePrice ? (
              <>
                <span className="text-red-500 font-bold">
                  ${product?.salePrice}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${product?.price}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-medium">
                ${product?.price}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="icon"
              className="w-6 h-6"
              onClick={() =>
                product.quantity > 1
                  ? onUpdateQuantity(product, product.quantity - 1)
                  : toast("Minimum quantity is 1 ⚠️")
              }
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-sm font-semibold w-6 text-center">
              {product?.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="w-6 h-6"
              onClick={() => onUpdateQuantity(product, product.quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Total + Delete */}
      <div className="text-right flex flex-col items-end gap-2">
        <p className="font-semibold text-gray-800">
          ${(product?.salePrice || product.price) * product.quantity}
        </p>

        {/* 🗑️ Delete Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(product)}
          className="text-slate-500 hover:text-red-600 hover:bg-red-50 w-7 h-7"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default CartItems;
