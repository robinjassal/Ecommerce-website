import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import CommonForm from "../common/Form";

const initialFormData = {
  status: "",
};
function OrderDetail({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);

  function onSubmit(event) {
    event.preventDefault();
  }
  return (
    <DialogContent className="sm:max-w-[600px] ">
      <div className="grid gap-6 mt-6">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p>Order Id</p>
            <Label>123455</Label>
          </div>
          <div className="flex mt items-center justify-between">
            <p>Order Date</p>
            <Label>123455</Label>
          </div>
          <div className="flex mt items-center justify-between">
            <p>Order Price</p>
            <Label>123455</Label>
          </div>
          <div className="flex mt items-center justify-between">
            <p>Order Status</p>
            <Label>123455</Label>
          </div>
          <hr />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-bold">order details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span>Product One</span>
                  <span>$100</span>
                </li>
              </ul>
            </div>
            <div className="grid gap-2">
              <div className="font-bold">Shipping info</div>
              <div>
                <span>John dow</span>
                <span>Address</span>
                <span>city</span>
                <span>pincode</span>
              </div>
            </div>
            <div className="grid gap-2">
              <CommonForm
                formControls={[
                  {
                    label: "Order Status",
                    name: "status",
                    componentType: "select",
                    options: [
                      { id: "inProcess", label: "In Process" },
                      { id: "shipped", label: "Shipped" },
                      { id: "pending", label: "Pending" },
                      { id: "delivered", label: "Delivered" },
                      { id: "rejected", label: "Rejected" },
                    ],
                  },
                ]}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Update Order Status"}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default OrderDetail;
