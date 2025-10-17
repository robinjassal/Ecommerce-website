import ProductImageUpload from "@/components/admin/image-upload";
import ProductTile from "@/components/admin/ProductTile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/product-slice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
};
function Products() {
    const [openProductsDialog, setOpenProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [isImageLoading, setIsImageLoading] = useState(false);
    const dispatch = useDispatch()
    const { productList } = useSelector(state => state.adminProducts)
    const [currentEditedId, setCurrentEditedId] = useState(null)

    // console.log(formData);
    function onSubmit(e) {
        e.preventDefault();
        currentEditedId !== null ?
            dispatch(editProduct({ id: currentEditedId, formData: formData })).then((data) => {
                if (data?.payload?.success) {
                    setImageFile(null);
                    setFormData(initialFormData)
                    dispatch(fetchAllProducts())
                    toast.success("Product Edited Successfully");
                    setOpenProductsDialog(false)
                }
            }) :
            dispatch(addNewProduct({
                ...formData, image: uploadedImageUrl
            })).then((data) => {
                // console.log(data);
                if (data?.payload?.success) {
                    setImageFile(null);
                    setFormData(initialFormData)
                    dispatch(fetchAllProducts())
                    toast.success("Product Added Successfully");
                    setOpenProductsDialog(false)
                }
            })
    }

    function isFormValid() {
        return Object.keys(formData)
            .filter((currentKey) => currentKey !== "averageReview")
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    function handleDelete(getCurrentProductId) {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            dispatch(deleteProduct(getCurrentProductId)).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    toast.success("Product deleted Successfully");
                }
            });
        }
    }

    return (
        <>
            <div className="w-full mb-5 flex justify-end">
                <Button
                    className="cursor-pointer"
                    onClick={() => {
                        setOpenProductsDialog(true);
                    }}
                >
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {productList && productList.length > 0
                    ? productList.map((productItem) => (
                        <ProductTile
                            product={productItem}
                            setCurrentEditedId={setCurrentEditedId}
                            setOpenProductsDialog={setOpenProductsDialog}
                            setFormData={setFormData}
                            handleDelete={handleDelete}
                        />
                    ))
                    : null}
            </div>
            <Sheet
                open={openProductsDialog}
                onOpenChange={() => {
                    setOpenProductsDialog(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData);
                }}
            >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {currentEditedId !== null ? "Edit product" : "Add New Product "}
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setIsImageLoading={setIsImageLoading}
                        isImageLoading={isImageLoading}
                        isEditMode={currentEditedId !== null}
                    />
                    <div className="py-6 px-6">
                        <CommonForm
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditedId !== null ? "EDIT" : "ADD"}
                            onSubmit={onSubmit}
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default Products;
