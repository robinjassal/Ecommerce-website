import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";

function CartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md p-6">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems?.length > 0 &&
          cartItems.map((item) => <CartItems product={item} />)}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        className="w-full mt-5"
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default CartWrapper;
