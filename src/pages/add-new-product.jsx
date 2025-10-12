import { CaretLeft } from "phosphor-react";
import React from "react";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FileUpload from "@/components/file-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactSelectCustomized from "@/components/react-select-customized";
import { useUser } from "@/context/user-context";
import { BASE_URL } from "@/constants/api";
import { TOKEN_IDENTIFIER } from "@/constants";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { dummyProductCategories } from "@/data/dummy-product-categories";

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string(),
  category: yup.string().required("Category is required"),
  expiration_date: yup.string(),
  cost_price: yup.number().required("Cost price is required"),
  selling_price: yup.number().required("Selling price is required"),
  quantity: yup.number().required("Quantity is required"),
  low_stock_count: yup.number().required("Low stock count is required"),
  status: yup.string().required("Status is required"),
  file: yup.mixed().required("Product image is required"),
});

const AddNewProduct = () => {
  const navigate = useNavigate();
  const { storeInfo } = useUser();
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const productCategories = useMemo(() => {
    return dummyProductCategories.map((c) => ({
      label: c.label ?? c.name ?? String(c),
      value: String(c.value ?? c.id ?? c.name ?? c),
    }));
  }, []);

  const statusOptions = [{ label: "Available", value: "available" }];

  const handleFileChange = (file) => {
    setFile(file);
    setValue("file", file, {shouldValidate: true});
  };

  const handleCategoryChange = (selected) => {
    setValue("category", selected.value);
  };

  const handleStatusChange = (selected) => {
    setValue("status", selected.value);
  };

  const onSubmit = async (data) => {
    const token = sessionStorage.getItem(TOKEN_IDENTIFIER);

    if (!token) {
      toast.error("You must be logged in to add a product.");
      return;
    }

    if (!storeInfo?.id) {
      toast.error("No store found. Please check your store setup.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", data.name);
    formData.append("description", data.description || null);
    formData.append("cost_price", parseFloat(data.cost_price));
    formData.append("selling_price", parseFloat(data.selling_price));
    formData.append("quantity", parseInt(data.quantity));
    formData.append("low_stock_threshold", parseInt(data.low_stock_count));
    formData.append("high_stock_threshold", 999);
    formData.append("sku", `SKU-${Date.now()}`);
    formData.append("status", data.status);
    formData.append(
      "expiration_date",
      data.expiration_date
        ? new Date(data.expiration_date).toISOString()
        : null
    );
    formData.append("category", data.category ? Number(data.category) : null);
    formData.append("file", file);

    try {
      const url = `${BASE_URL}/v1/store/${storeInfo.id}/inventory/`;
      const response = await axiosInstance.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem(
        "NEW_PRODUCT",
        JSON.stringify({
          ...response.data,
          id: crypto.randomUUID(),
          currency: "₦",
          last_updated: new Date().toISOString(),
          status: "",
        })
      );
      toast.success("Product added successfully!");
      navigate("/inventory/");
    } catch (error) {
      console.error("❌ API error:", error);
      toast.error(
        error.response?.data?.detail ?? "Failed to add product. Try again."
      );
    }
  };
  // if (formData.quantity > formData.low_stock_count) {
  //   formData.status === 'IN STOCK'
  // } else if (formData.quantity < formData.low_stock_count) {
  //   formData.status === 'OUT OF STOCK'
  // } else {
  //   formData.status === ''
  // }
console.log(errors);

  return (
    <>
      <div className="flex items-center gap-1">
        <Link to="/inventory">
          <CaretLeft className="text-lg" />
        </Link>
        <h1 className="text-lg font-bold lg:text-2xl">Add Product</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5 dark:bg-[#1e1e1e]"
      >
        <h4 className="text-accent-foreground font-medium">
          Product Images (optional)
        </h4>
        <div>
          <Label className="mt-3 mb-2 block dark:text-white">Upload Product Image</Label>
          <FileUpload
          className={`dark:bg-[#2e2e2e]`}
            file={file}
            handleFileChange={handleFileChange}
            description={
              <div className="flex flex-col gap-2">
                <h5 className="text-sm">Upload Product Image</h5>
                <p className="text-xs font-light dark:text-white">Max file size: 5mb</p>
              </div>
            }
          />
          {errors.file && (
            <p className="mt-0.5 h-1 text-[10px] text-red-500">
              {errors.file.message}
            </p>
          )}
        </div>
        <h4 className="text-accent-foreground mt-10 mb-6 font-medium">
          Product Details
        </h4>
        <div className="flex flex-col gap-4">
          <Input 
            label="Product Name" 
            placeholder="Enter product name" 
            // value={formData.name}
            // onChange={handleChange("name")}
            className={`dark:bg-[#383838]`}
            {...register("name")}
          />
          <Input
            label="Product Description"
            placeholder="Enter product description"
            // value={formData.description}
            // onChange={handleChange("description")}
               className={`dark:bg-[#383838]`}
                {...register("description")}
          />
          <ReactSelectCustomized
            options={productCategories}
            label={"Category"}
            onChange={handleCategoryChange}
               className={`dark:bg-[#383838]`}
            error={errors.category?.message}
          />
          <ReactSelectCustomized
            options={statusOptions}
            label={"Status"}
            onChange={handleStatusChange}
            error={errors.status?.message}
          />
          <Input
            label="Expiration Date"
            placeholder="Enter product description"
            type="date"
            {...register("expiration_date")}
            error={errors.expiration_date?.message}
               className={`dark:bg-[#383838]`}
          />
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Input
              label="Product Cost Price"
              placeholder="400"
              type="number"
              leftIcon={<span className="pl-1 text-xs">₦</span>}
              {...register("cost_price")}
              error={errors.cost_price?.message}
                 className={`dark:bg-[#383838]`}
            />
            <Input
              label="Product Selling Price"
              placeholder="400"
              type="number"
              leftIcon={<span className="pl-1 text-xs">₦</span>}
              {...register("selling_price")}
              error={errors.selling_price?.message}
                 className={`dark:bg-[#383838]`}
            />
          </div>
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Input
              label="Product Quantity"
              placeholder="400"
              type="number"
              {...register("quantity")}
              error={errors.quantity?.message}
                 className={`dark:bg-[#383838]`}
            />
            <Input
              label="Low Stock Count"
              placeholder="400"
              type="number"
              {...register("low_stock_count")}
              error={errors.low_stock_count?.message}
                 className={`dark:bg-[#383838]`}
            />
          </div>
          <Button type="submit">Add new Product</Button>
        </div>
      </form>
    </>
  );
};

export default AddNewProduct;

