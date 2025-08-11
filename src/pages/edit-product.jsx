import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { CaretLeft, PencilSimple } from "phosphor-react";

import FileUpload from "@/components/file-upload";
import ReactSelectCustomized from "@/components/react-select-customized";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUser } from "@/context/user-context";
import { BASE_URL } from "@/constants/api";
import { TOKEN_IDENTIFIER } from "@/constants";

import { dummyProductCategories } from "@/data/dummy-product-categories";
import { dummyProductDetails } from "@/data/dummy-product-details";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // product id from route
  const { storeInfo } = useUser();

  // simple product images demo (keep your current UI)
  const [productImages, setProductImages] = useState(
    dummyProductDetails.images.slice(0, 2)
  );

  // ---- Form state (controlled) ----
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    category: "", // adapt if API expects number
    expiration_date: "", // yyyy-mm-dd
    cost_price: "",
    selling_price: "",
    quantity: "",
    low_stock_threshold: "",
    status: "IN STOCK",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Map your dummy categories to {label, value} if needed
  const categoryOptions = useMemo(() => {
    // adjust to match your ReactSelectCustomized expected shape
    return dummyProductCategories.map((c) => ({
      label: c.label ?? c.name ?? String(c),
      value: String(c.value ?? c.id ?? c.name ?? c),
    }));
  }, []);

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleCategoryChange = (opt) => {
    setFormData((prev) => ({ ...prev, category: opt?.value || "" }));
  };

  // ---- Load existing product and prefill ----
  useEffect(() => {
    const run = async () => {
      if (!storeInfo?.id) {
        setLoading(false);
        toast.error("No store found. Please log in again or set up your store.");
        return;
      }
      if (!id) {
        setLoading(false);
        toast.error("Missing product id.");
        return;
      }

      try {
        const token =
          sessionStorage.getItem(TOKEN_IDENTIFIER) ||
          localStorage.getItem(TOKEN_IDENTIFIER);

        if (!token) {
          setLoading(false);
          toast.error("Please log in.");
          return;
        }

        // If there’s an endpoint for single product by id, prefer it:
        // const res = await axios.get(`${BASE_URL}/v1/store/${storeInfo.id}/inventory/${id}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        // Otherwise fetch list and find:
        const res = await axios.get(
          `${BASE_URL}/v1/store/${storeInfo.id}/inventory`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const list = res.data?.inventory ?? [];
        const product = list.find((p) => String(p.id) === String(id));

        if (!product) {
          toast.error("Product not found");
          navigate("/inventory");
          return;
        }

        // Prefill form (ensure types/format)
        setFormData({
          product_name: product.product_name ?? "",
          description: product.description ?? "",
          category: product.category ? String(product.category) : "",
          expiration_date: product.expiration_date
            ? String(product.expiration_date).slice(0, 10)
            : "",
          cost_price:
            product.cost_price !== undefined && product.cost_price !== null
              ? String(product.cost_price)
              : "",
          selling_price:
            product.selling_price !== undefined &&
            product.selling_price !== null
              ? String(product.selling_price)
              : "",
          quantity:
            product.quantity !== undefined && product.quantity !== null
              ? String(product.quantity)
              : "",
          low_stock_threshold:
            product.low_stock_threshold !== undefined &&
            product.low_stock_threshold !== null
              ? String(product.low_stock_threshold)
              : "",
          status:
            product.status && typeof product.status === "string"
              ? product.status.toUpperCase()
              : "IN STOCK",
        });
      } catch (e) {
        console.error(e);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [id, storeInfo, navigate]);

  // ---- Submit PATCH ----
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storeInfo?.id) {
      toast.error("No store found.");
      return;
    }

    const token =
      sessionStorage.getItem(TOKEN_IDENTIFIER) ||
      localStorage.getItem(TOKEN_IDENTIFIER);
    if (!token) {
      toast.error("Please log in.");
      return;
    }

    // Build minimal PATCH payload
    const payload = {
      product_name: formData.product_name.trim(),
      description: formData.description || null,
      // convert numeric fields
      cost_price: formData.cost_price ? parseFloat(formData.cost_price) : 0,
      selling_price: formData.selling_price
        ? parseFloat(formData.selling_price)
        : 0,
      quantity: formData.quantity ? parseInt(formData.quantity, 10) : 0,
      low_stock_threshold: formData.low_stock_threshold
        ? parseInt(formData.low_stock_threshold, 10)
        : 0,
      status: formData.status || "IN STOCK",
      expiration_date: formData.expiration_date
        ? new Date(formData.expiration_date).toISOString()
        : null,
      // Include category if your API supports it
      // category: formData.category ? Number(formData.category) : null,
    };

    try {
      setSaving(true);

      // If your backend supports nested route (common in your app):
      const url = `${BASE_URL}/v1/store/${storeInfo.id}/inventory/${id}`;

      await axios.patch(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product updated");
      navigate(`/inventory/${id}`);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.detail || "Update failed";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading…</p>;

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
        <h2 className="text-sm font-semibold lg:text-base">Upload Product Image</h2>

        <div className="mt-3 mb-5 flex flex-wrap items-start gap-2">
          {productImages.map((image) => (
            <div key={image.id} className="relative aspect-square h-20 lg:h-30">
              <img src={image.path} alt="Product" className="h-full w-full" />
              <input hidden type="file" id={`product-image-${image.id}`} />
              <label
                htmlFor={`product-image-${image.id}`}
                className="absolute top-1.5 right-1.5 flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full bg-[#EFEEEE]"
              >
                <PencilSimple />
              </label>
            </div>
          ))}
          <div className="aspect-square h-20 lg:h-30">
            <FileUpload className="h-full w-full py-0" title={<span className="text-xs">Upload Image</span>} />
          </div>
        </div>

        <h2 className="text-sm font-semibold lg:text-base">Product Details</h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <Input
            label="Product Name"
            value={formData.product_name}
            onChange={handleChange("product_name")}
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
          />

          <ReactSelectCustomized
            label="Category"
            options={categoryOptions}
            onChange={handleCategoryChange}
            // If component supports value prop, pass the selected option object:
            // value={categoryOptions.find(o => o.value === formData.category) ?? null}
          />

          <Input
            label="Expiry Date"
            type="date"
            value={formData.expiration_date}
            onChange={handleChange("expiration_date")}
          />

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <Input
              label="Product Cost Price"
              type="number"
              value={formData.cost_price}
              onChange={handleChange("cost_price")}
            />
            <Input
              label="Product Selling Price"
              type="number"
              value={formData.selling_price}
              onChange={handleChange("selling_price")}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <Input
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange("quantity")}
            />
            <Input
              label="Low Stock Threshold"
              type="number"
              value={formData.low_stock_threshold}
              onChange={handleChange("low_stock_threshold")}
            />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button
              type="button"
              className="bg-[#EFEEEE] text-[#767474] lg:min-w-[150px]"
              onClick={() =>
                setFormData({
                  product_name: "",
                  description: "",
                  category: "",
                  expiration_date: "",
                  cost_price: "",
                  selling_price: "",
                  quantity: "",
                  low_stock_threshold: "",
                  status: "IN STOCK",
                })
              }
            >
              Clear
            </Button>
            <Button type="submit" disabled={saving} className="lg:min-w-[150px]">
              {saving ? "Saving…" : "Update"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProduct;

