import React from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { MapPin, Phone, MessageSquare, Hash, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className="w-full max-w-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500"
    >
      <CardContent className="p-4 space-y-4">
        {/* Address Line */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <Label className="text-sm font-medium text-gray-500">Address</Label>
            <p className="text-base font-semibold text-gray-900 mt-1">
              {addressInfo.address}
            </p>
          </div>
        </div>
        <hr />
        {/* City and Pincode in one row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <Label className="text-sm font-medium text-gray-500">City</Label>
              <p className="text-base text-gray-800 mt-1">{addressInfo.city}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Hash className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <Label className="text-sm font-medium text-gray-500">
                Pincode
              </Label>
              <p className="text-base text-gray-800 mt-1">
                {addressInfo.pincode}
              </p>
            </div>
          </div>
        </div>
        <hr />

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <Label className="text-sm font-medium text-gray-500">Phone</Label>
            <p className="text-base text-gray-800 mt-1">{addressInfo.phone}</p>
          </div>
        </div>
        <hr />

        {/* Notes - Only show if notes exist */}
        {addressInfo.notes && (
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <Label className="text-sm font-medium text-gray-500">Notes</Label>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {addressInfo.notes}
              </p>
            </div>
          </div>
        )}
        <hr />
        <div className="flex gap-4 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 flex-1"
            onClick={() => handleEditAddress(addressInfo)}
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-2 flex-1"
            onClick={() => handleDeleteAddress(addressInfo)}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressCard;
