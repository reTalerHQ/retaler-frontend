import FileUpload from "@/components/file-upload";
import ReactSelectCustomized from "@/components/react-select-customized";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { dummyProductCategories } from "@/data/dummy-product-categories";
import { dummyProductDetails } from "@/data/dummy-product-details";
import { CaretLeft, PencilSimple } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const [productImages, setProductImages] = useState(
    dummyProductDetails.images.slice(0, 2),
  );
  return (
    <>
      <div className="flex items-center gap-1">
        <Link to="/inventory">
          <CaretLeft className="text-xl" />
        </Link>
        <h1 className="text-lg font-bold lg:text-2xl">Edit Product</h1>
      </div>
      <section className="mt-5 rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
        <h1 className="mb-3 text-base font-semibold lg:text-lg">
          Product Images (optional)
        </h1>
        <h2 className="text-sm font-semibold lg:text-base">
          Upload Product Image
        </h2>
        <div className="mt-3 mb-5 flex flex-wrap items-start gap-2">
          {productImages.map((image) => (
            <div key={image.id} className="relative aspect-square h-20 lg:h-30">
              <img
                src={image.path}
                alt="Product Image"
                className="h-full w-full"
              />
              <input hidden type="file" id={`product-image-${image.id}`} />
              <label
                htmlFor={`product-image-${image.id}`}
                className="absolute top-1.5 right-1.5 flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full bg-[#EFEEEE]"
              >
                <PencilSimple className="" />
              </label>
            </div>
          ))}
          <div className="aspect-square h-20 lg:h-30">
            <FileUpload
              className={"h-full w-full py-0"}
              title={<span className="text-xs">Upload Image</span>}
            />
          </div>
        </div>
        <h2 className="text-sm font-semibold lg:text-base">
          <h2 className="text-sm font-semibold lg:text-base">
            Product Details
          </h2>
          <form className="mt-5 flex flex-col gap-3">
            <Input label="Product Name" />
            <Textarea label="Description" />
            <ReactSelectCustomized
              label={"Category"}
              options={dummyProductCategories}
            />
            <Input label="Expiry Date" type="date" />
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Input label="Product Cost Price" type="number" />
              <Input label="Product Selling Price" type="number" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button className="bg-[#EFEEEE] text-[#767474] lg:min-w-[150px]">
                Clear
              </Button>
              <Button className="lg:min-w-[150px]">Update</Button>
            </div>
          </form>
        </h2>
      </section>
    </>
  );
};

export default EditProduct;
