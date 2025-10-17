import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function ProductTile({ product, setFormData, setOpenProductsDialog, setCurrentEditedId, handleDelete }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <div>
        <div className="relative">
          <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-cover rounder-t-lg" />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-primary">${product?.price}</span><span className="text-lg text-primary">${product?.salePrice}</span></div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={() => {
            setOpenProductsDialog(true)
            setCurrentEditedId(product?._id)
            setFormData(product)
          }}>EDIT</Button>
          <Button onClick={() => {
            handleDelete(product?._id)
          }}>DELETE</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProductTile;
