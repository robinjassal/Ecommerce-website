import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

function ProductImageUpload({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    setIsImageLoading
}) {
    const inputRef = useRef(null);

    function handleImageFileChange(e) {
        // console.log(e.target.files);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    }
    function handleDragOver(e) {
        e.preventDefault()
    }
    function handleDrop(e) {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) {
            setImageFile(droppedFile);
        }
    }
    function handleRemoveImage(e) {
        setImageFile(null)

        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    async function uploadImageToCloudinary() {
        setIsImageLoading(true)
        const data = new FormData();
        data.append('my_file', imageFile);
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data)
        console.log("response", response);
        if (response.data?.success) {
            setUploadedImageUrl(response.data.result.url)
            setIsImageLoading(false)
        }
    }

    useEffect(() => {
        if (imageFile !== null) {
            uploadImageToCloudinary()
        }
    }, [imageFile])

    return (
        <div className="w-full max-w-md mx-auto">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4 m-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                />
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={`$flex flex-col items-center justify-center h-32 cursor-pointer`}
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload image</span>
                    </Label>
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 h-8 text-primary mr-2" />
                        </div>
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <Button variant="ghost" size="icon" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductImageUpload;
