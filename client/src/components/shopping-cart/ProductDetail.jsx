import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function ProductDetail({ open, setOpen, productDetails }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="grid gap-4">
          <div>
            <h1 className="text-2xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${
                productDetails?.salePrice > 0 && "line-through !text-2xl"
              } text-3xl font-semi-bold text-primary`}
            >
              MRP ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-3xl font-bold text-primary">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <StarIcon />
          </div>
          <div>
            <Button className="w-full">Add to Cart</Button>
          </div>
          <hr />
          <div className="max-h-[200px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">RJ</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon />
                  </div>
                  <p className="text-muted-foreground">bad</p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarIcon />
              </div>
              <Input
                name="reviewMsg"
                value={"hell"}
                placeholder="Write a review..."
              />
              <Button onClick={() => {}}>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetail;
