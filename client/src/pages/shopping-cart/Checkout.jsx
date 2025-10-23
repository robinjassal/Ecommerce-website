import Address from "@/components/shopping-cart/Address";
import CartItems from "@/components/shopping-cart/CartItems";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Checkout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const totalCartAmount =
    cartItems?.items && cartItems.items?.length > 0
      ? cartItems?.items?.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  function handleInitiatePayment() {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems?.items?.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price,
        quantity: cartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    // console.log(orderData);
    dispatch(createNewOrder(orderData)).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }
  if (approvalURL) {
    window.location.href = approvalURL;
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2019/10/10/08/11/shopping-4538982_1280.jpg"
          alt="account"
          className="h-full w-full object-fill overflow-hidden"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4 p-4">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems?.items && cartItems?.items.length > 0
            ? cartItems?.items?.map((cartItem) => (
                <CartItems product={cartItem} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="w-full">
            <Button onClick={handleInitiatePayment} className="w-full">
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

// http://localhost:5173/shop/paypal-return?paymentId=PAYID-ND5DERY418335107T4627016&token=EC-5WK76093DT346002C&PayerID=SZLUXU793M55L
