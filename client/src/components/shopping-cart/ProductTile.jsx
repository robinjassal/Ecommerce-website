import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ProductTile({ product, handleGetProductDetails }) {
  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer z-10"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] object-cover rounder-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left -2 bg-red-600 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg font-semibold text-primary ${
                product?.salePrice > 0 && "line-through"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg text-primary">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full z-50"
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent outer onClick
              console.log("Add to cart clicked", product?._id);
            }}
          >
            Add to cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProductTile;
