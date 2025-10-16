import ProductImageUpload from '@/components/admin/image-upload'
import CommonForm from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { useState } from 'react'

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: "",
    price: '',
    salePrice: '',
    totalStock: ''
}
function Products() {
    const [openProductsDialog, setOpenProductsDialog] = useState(false)
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("")
    const [isImageLoading, setIsImageLoading] = useState(false)

    function onSubmit() {

    }

    return (
        <>
            <div className='w-full mb-5 flex justify-end'>
                <Button className="cursor-pointer" onClick={() => { setOpenProductsDialog(true) }}>Add New Product</Button>
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>

            </div>
            <Sheet open={openProductsDialog} onOpenChange={() => setOpenProductsDialog(false)}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            Add New Product
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setIsImageLoading={setIsImageLoading} />
                    <div className='py-6 px-6'>
                        <CommonForm
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={"ADD"}
                            onSubmit={onSubmit}
                            formControls={addProductFormElements}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Products