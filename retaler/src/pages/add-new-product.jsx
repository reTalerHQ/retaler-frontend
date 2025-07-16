import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import FileUpload from "@/components/file-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactSelectCustomized from "@/components/react-select-customized";

const AddNewProduct = () => {
  const productCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Books" },
    { id: 5, name: "Sports & Outdoors" },
  ];

  const formattedCategories = productCategories.map((cat) => ({
    id: cat.id,
    label: cat.name,
    value: cat.id.toString(),
  }));
  return (
    <>
      <div className="flex items-center gap-1">
        <Link to="/inventory">
          <CaretLeft className="text-lg" />
        </Link>
        <h1 className="text-lg font-bold lg:text-2xl">Add Product</h1>
      </div>
      <form className="mt-6 rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5">
        <h4 className="text-accent-foreground font-medium">
          Product Images (optional)
        </h4>
        <div>
          <Label className="mt-3 mb-2 block">Upload Product Image</Label>
          <FileUpload
            description={
              <div className="flex flex-col gap-2">
                <h5 className="text-sm">Upload Product Image</h5>
                <p className="text-xs font-light">Max file size: 5mb</p>
              </div>
            }
          />
        </div>
        <h4 className="text-accent-foreground mt-10 mb-6 font-medium">
          Product Details
        </h4>
        <div className="flex flex-col gap-4">
          <Input label="Product Name" placeholder="Enter product name" />
          <Input
            label="Product Description"
            placeholder="Enter product description"
          />
          <ReactSelectCustomized
            options={formattedCategories}
            label={"Category"}
          />
          <Input
            label="Expiration Date"
            placeholder="Enter product description"
            type="date"
          />
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Input
              label="Product Cost Price"
              placeholder="400"
              type="number"
              leftIcon={<span className="pl-1 text-xs">₦</span>}
            />
            <Input
              label="Product Selling Price"
              placeholder="400"
              type="number"
              leftIcon={<span className="pl-1 text-xs">₦</span>}
            />
          </div>
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Input label="Product Quantity" placeholder="400" type="number" />
            <Input label="Low Stock Count" placeholder="400" type="number" />
          </div>
          <Button>Add new Product</Button>
        </div>
      </form>
    </>
  );
};

export default AddNewProduct;
