import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/Form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./AddressCard";
import toast from "react-hot-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [editedAddressId, setEditedAddressId] = useState(null);
  const handleManageAddress = (e) => {
    e.preventDefault();
    if (addressList.length >= 3 && editedAddressId === null) {
      setFormData(initialAddressFormData);
      toast.error("You can add max 3 addresses");
      return;
    }
    editedAddressId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: editedAddressId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setEditedAddressId(null);
            setFormData(initialAddressFormData);
            toast.success("Address updated successfully");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user.id));
            setFormData(initialAddressFormData);
            toast.success("added successfully");
          }
        });
  };
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast.success("deleted successfully");
      } else {
        toast.error("some Error occured");
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setEditedAddressId(getCurrentAddress?._id);
    setFormData({
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((address) => (
              <AddressCard
                addressInfo={address}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {editedAddressId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={editedAddressId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
