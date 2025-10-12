import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CaretLeft, MagnifyingGlass, Plus, Trash } from "phosphor-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ReactSelectCustomized from "@/components/react-select-customized";
import { formatCurrency } from "@/utils/number-utilites";
import { useUser } from "@/context/user-context";
import { useFetchInventory } from "@/hooks/use-fetch-inventory";
import { PagePreLoader } from "@/components/page-pre-loader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { TOKEN_IDENTIFIER } from "@/constants";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { FETCH_SALES, FETCH_SALES_STATS } from "@/constants/query-key";

const schema = yup.object({
  paymentMethod: yup.string().required("Payment Method is Required"),
  amountPaid: yup.string().required("Amount paid is required"),
});

const PAYMENT_METHOD_OPTIONS = [
  {
    id: "1",
    label: "Cash",
    value: "Cash",
  },
  {
    id: "2",
    label: "Transfer",
    value: "Transfer",
  },
  {
    id: "3",
    label: "POS",
    value: "POS",
  },
];

export const AddNewSales = () => {
  const { storeInfo } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      paymentMethod: "",
    },
  });

  const [paymentMethod] = watch(["paymentMethod"]);

  const { isLoading: isLoadingInventory, data: inventoryData } =
    useFetchInventory(storeInfo?.id);

  const queryClient = useQueryClient();
  //staff  options for reactSelect
  const NameCategories = [
    { id: 1, name: "Isaac" },
    { id: 2, name: "Ella" },
    { id: 3, name: "Sophia" },
    { id: 4, name: "Benjamin" },
    { id: 5, name: "Rukky" },
  ];

  //search inventory product

  //states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const results = inventoryData?.inventory?.filter((p) =>
      p?.product_name?.toLowerCase()?.includes(value.toLowerCase()),
    );
    setFilteredProducts(results);
  };

  // for handling selecting product from list
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  //this handle adding product to sale
  const handleAddProduct = () => {
    if (!selectedProduct) return;

    const alreadyAdded = addedProducts.find((p) => p.id === selectedProduct.id);
    if (!alreadyAdded) {
      setAddedProducts([...addedProducts, { ...selectedProduct, quantity: 1 }]);
    }

    // , selectedProduct
    //this clear search after adding
    setSelectedProduct(null);
    setSearchQuery("");
    setFilteredProducts([]);
  };
  const handleIncrementProduct = (productId) => {
    setAddedProducts((prev) =>
      prev.map((prod) =>
        prod.id === productId ? { ...prod, quantity: prod.quantity + 1 } : prod,
      ),
    );
  };

  const totalPrice = addedProducts.reduce((total, product) => {
    return total + product.selling_price * product.quantity;
  }, 0);

  //delete button
  const handleDeleteProduct = (productId) => {
    setAddedProducts((prev) => prev.filter((prod) => prod.id !== productId));
  };

  const onSubmit = async (data) => {
    console.log("business info submitted:", data);
    console.log("products", addedProducts);

    try {
      console.log("Form Data:", data);
      if (!(addedProducts?.length > 0)) {
        toast.error("Please add a product");
        return;
      }
      const userInfo = JSON.parse(sessionStorage.getItem("RETALER_USER_INFO"));
      const staffId = userInfo?.id || userInfo?.staff_id;
      if (!staffId) {
        toast.error("Valid staff ID required. Please log in.");
        return;
      }
      console.log(staffId);
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      console.log("token is", tokenFromStorage);

      const payload = {
        store_id: storeInfo?.id,
        staff_id: staffId,
        payment_method: data?.paymentMethod,
        amount_paid: data?.amountPaid,
        items: addedProducts?.map((prod) => ({
          inventory_id: prod.id,
          quantity: prod.quantity,
          price: prod.selling_price,
        })),
      };

      const rsp = await axiosInstance.post(
        `${BASE_URL}/v1/store/${storeInfo.id}/sales/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      );
      setAddedProducts([]);

      reset();
      if (rsp.status === 200 || rsp.status === 201) {
        toast.success("Sales added successfully");
      } else {
        toast.warning("Sales may be added, check your table");
      }
      queryClient.invalidateQueries({
        queryKey: [FETCH_SALES],
      });
      queryClient.invalidateQueries({
        queryKey: [FETCH_SALES_STATS],
      });
    } catch (error) {
      console.log({ error });

      const status = error.response?.status ?? 0;
      if (status === 500) {
        toast.warning(
          "Server error - sale might have gone through. Check your table",
        );
      }
      const message = error.response?.status;
      // const message = error.response?.data?.detail;
      toast.success(
        typeof message === "string"
          ? (message ?? "Something went wrong...")
          : "Sale added",
      );
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <Link to="/sales">
          <CaretLeft className="text-lg" />
        </Link>
        <h1 className="text-lg font-bold lg:text-2xl">Record New sale</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5 dark:bg-[#1e1e1e]"
      >
        {/* search products */}
        <h4 className="text-accent-foreground font-medium">
          Select product sold
        </h4>

        <Label className="mt-3 mb-4 block text-gray-500">
          Start typing to find a product from your inventory
        </Label>

        <div className="relative">
          <Input
            showError={false}
            value={searchQuery}
            onChange={handleSearchChange}
            type="Search"
            placeholder="Search product"
            leftIcon={<MagnifyingGlass className="text-sm text-[#BBBBBB]" />}
            className="rounded-lg"
          />
          {/* this show dropdown list */}
          {filteredProducts.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow">
              {filteredProducts.map((product) => {
                const isSelected = selectedProduct?.id === product.id;

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-100"
                  >
                    <div className="flex items-baseline gap-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleSelectProduct(product);
                          } else {
                            setSelectedProduct(null);
                          }
                        }}
                      />
                      <div>
                        <p className="font-medium">{product?.product_name}</p>
                        <span
                          className={`text-sm ${
                            product.quantity > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.quantity > 0
                            ? `In Stock: ${product.quantity}`
                            : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">₦{product.selling_price}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* this show add product  */}
        {addedProducts.length > 0 && (
          <div className="mt-4 rounded-lg border pt-4">
            {/* <h4 className="font-medium">Products Added to sale:</h4> */}
            <ul className="mt-1 space-y-1">
              {addedProducts.map((prod) => (
                <li
                  key={prod.id}
                  className="flex justify-between rounded px-4 py-2"
                >
                  <div className="space-y-1">
                    <p className="text-xs">{prod.product_name}</p>
                    <p>₦{formatCurrency(prod.selling_price)}</p>
                  </div>

                  <div className="bg:space-x-6 inline-flex items-center space-x-2">
                    <Button
                      onClick={() => handleDeleteProduct(prod.id)}
                      type="button"
                      className="border border-gray-300 bg-gray-200 hover:bg-gray-300"
                    >
                      <Trash size={32} weight="bold" color="#6B7280" />
                    </Button>

                    <span>{prod.quantity}</span>
                    <Button
                      onClick={() => handleIncrementProduct(prod.id)}
                      type="button"
                    >
                      <Plus size={32} weight="bold" color="white" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 font-bold">
          Total Price: ₦{formatCurrency(totalPrice)}
        </p>

        {/* add product button */}
        {selectedProduct && (
          <div className="mt-50 flex justify-end">
            <Button onClick={handleAddProduct} type="button">
              Add Product
            </Button>
          </div>
        )}

        {/* sale details */}
        <h4 className="text-accent-foreground mt-8 mb-4 font-medium">
          Sale Details
        </h4>

        <div className="grid grid-cols-1 space-x-4 border-0 pt-8 focus:outline-0 lg:grid-cols-2 lg:flex-row">
          <div>
            <ReactSelectCustomized
              options={PAYMENT_METHOD_OPTIONS}
              label={"Payment Method"}
              onChange={(data) => {
                setValue("paymentMethod", data?.value ?? "", {
                  shouldValidate: true,
                });
              }}
              value={
                PAYMENT_METHOD_OPTIONS?.find(
                  (method) => method.value === paymentMethod,
                ) ?? null
              }
              error={errors?.paymentMethod?.message}
            />
          </div>
          <Input
            label="Amount Paid"
            {...register("amountPaid")}
            error={errors?.amountPaid?.message}
            type="number"
          />
        </div>

        {/* <div className="flex flex-col justify-between space-x-4 border-0 pt-8 focus:outline-0 lg:flex-row">
          <Input
            type="text"
            placeholder="Enter date"
            className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border focus:border-gray-400 focus:bg-white focus:outline-none md:text-base"
          />
          <Input
            type="text"
            placeholder="Enter Time"
            className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-900 focus:border focus:border-gray-400 focus:bg-white focus:outline-none md:text-base"
          />
        </div>
        <Label className="mt-8 mb-4 block">Additional note (Optional)</Label>
        <Input
          type="text"
          placeholder="Write note about sale"
          className="w-full border-0 bg-gray-100 px-3 py-2 text-sm text-gray-900 focus:border focus:border-gray-400 focus:bg-white focus:outline-none md:text-base"
        /> */}

        {/* footer button */}
        <div className="mt-3 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            className="bg-gray-200 text-gray-700"
            type="button"
          >
            Cancel
          </Button>
          <Button className="px-6">Save</Button>
        </div>
      </form>
      {isLoadingInventory || (isSubmitting && <PagePreLoader />)}
    </>
  );
};
