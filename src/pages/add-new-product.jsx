import { CaretLeft } from "phosphor-react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FileUpload from "@/components/file-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactSelectCustomized from "@/components/react-select-customized";
import { useUser } from "@/context/user-context";
import { BASE_URL } from "@/constants/api";
import { TOKEN_IDENTIFIER } from "@/constants";
import axios from "axios";
import { toast } from "sonner";


const AddNewProduct = () => {
  const productCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Books" },
    { id: 5, name: "Sports & Outdoors" },
  ];

  const navigate = useNavigate();
  
  const {storeInfo} = useUser()
  console.log("STOREINFO", storeInfo)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    expiration_date: "",
    cost_price: "",
    selling_price: "",
    quantity: "",
    low_stock_count: "",
  });

  const handleChange = (key) => (e) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleCategoryChange = (selected) => {
    setFormData({ ...formData, category: selected.value });
  };

  const formattedCategories = productCategories.map((cat) => ({
    id: cat.id,
    label: cat.name,
    value: cat.id.toString(),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem(TOKEN_IDENTIFIER); 
      console.log("Auth Token:", token);

      if (!token) {
        toast.error("You must be logged in to add a product.");
        return;
      }

      if (!storeInfo?.id) {
        toast.error("No store found. Please check your store setup.");
        return;
      }

    try {

      const url = `${BASE_URL}/v1/store/${storeInfo.id}/inventory/`;
      console.log('Post To;', url)

      const response = await axios.post(
        url,
        {
          product_name: formData.name,
          description: formData.description, 
          cost_price: parseFloat(formData.cost_price),
          selling_price: parseFloat(formData.selling_price),
          quantity: parseInt(formData.quantity),
          low_stock_threshold: parseInt(formData.low_stock_count),
          high_stock_threshold: 999, 
          sku: `SKU-${Date.now()}`, 
          status: "IN STOCK",
          expiration_date: formData.expiration_date
          ? new Date(formData.expiration_date).toISOString()
          : null,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response is", response.data)
      
      localStorage.setItem("NEW_PRODUCT", JSON.stringify({
        ...response.data,
        id: crypto.randomUUID(), 
        currency: "₦",
        last_updated: new Date().toISOString(),
        status: "",
      }));
      toast.success("Product added successfully!");
      navigate("/inventory/");

    } catch (error) {
      console.error("❌ API error:", error);
      toast.error(
        error.response?.data?.detail ?? "Failed to add product. Try again."
      );
    }
  };


  return (
    <>
      <div className="flex items-center gap-1">
        <Link to="/inventory">
          <CaretLeft className="text-lg" />
        </Link>
        <h1 className="text-lg font-bold lg:text-2xl">Add Product</h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5">
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
          <Input 
            label="Product Name" 
            placeholder="Enter product name" 
            value={formData.name}
            onChange={handleChange("name")}
          />
          <Input
            label="Product Description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange("description")}
          />
          <ReactSelectCustomized
            options={formattedCategories}
            label={"Category"}
            onChange={handleCategoryChange}
          />
          <Input
            label="Expiration Date"
            placeholder="Enter product description"
            type="date"
            value={formData.expiration_date}
            onChange={handleChange("expiration_date")}
          />
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Input
              label="Product Cost Price"
              placeholder="400"
              type="number"
              leftIcon={<span className="pl-1 text-xs">₦</span>}
              value={formData.cost_price}
              onChange={handleChange("cost_price")}
            />
            <Input
              label="Product Selling Price"
              placeholder="400"
              type="number"
              leftIcon={<span className="pl-1 text-xs">₦</span>}
              value={formData.selling_price}
              onChange={handleChange("selling_price")}
            />
          </div>
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Input 
              label="Product Quantity" 
              placeholder="400" 
              type="number" 
              value={formData.quantity}
              onChange={handleChange("quantity")}
            />
            <Input 
              label="Low Stock Count" 
              placeholder="400" 
              type="number" 
              value={formData.low_stock_count}
              onChange={handleChange("low_stock_count")}
            />
          </div>
          <Button type="submit">Add new Product</Button>
        </div>
      </form>
    </>
  );
};

export default AddNewProduct;
