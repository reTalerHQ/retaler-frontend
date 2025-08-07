import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@/context/user-context";

import { Link } from "react-router-dom";
import { CaretLeft, Trash } from "phosphor-react";
import { formatCurrency } from "@/utils/number-utilites";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "../components/ui/dialog";
import { X } from "phosphor-react";

import { dummyProductDetails } from "@/data/dummy-product-details";
import axios from "axios";
import { BASE_URL } from "@/constants/api";
import { TOKEN_IDENTIFIER } from "@/constants";

const MODAL_TYPES = {
  CONFIRM_DELETE: "CONFIRM_DELETE",
};

const ProductDetails = () => {
  const { id } = useParams();
  const { storeInfo } = useUser();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = sessionStorage.getItem(TOKEN_IDENTIFIER);
        const res = await axios.get(`${BASE_URL}/v1/${storeInfo.id}/inventory`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allInventory = res.data.inventory || [];
        const foundProduct = allInventory.find((item) => item.id === id);

        if (!foundProduct) {
          console.error("❌ Product not found in inventory list");
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error("❌ Failed to fetch product", error);
      }
    };

    if (storeInfo?.id && id) {
      fetchProduct();
    }
  }, [storeInfo, id]);



  const [openModal, setOpenModal] = useState(false);
  const [openedModalType, setOpenedModalType] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // const otherImages = dummyProductDetails.images.filter(
  //   (img) => img.id !== selectedImage.id,
  // );

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const IN_STOCK = "IN STOCK";

  const handleToggleModal = (modalType) => {
    if (!modalType) {
      setOpenModal(false);
      setOpenedModalType(null);
    } else {
      setOpenModal(true);
      setOpenedModalType(modalType);
    }
  };
  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
        <div className="flex items-center gap-1">
          <Link to="/inventory">
            <CaretLeft className="text-xl" />
          </Link>
          <h1 className="text-lg font-bold lg:text-2xl">
            {product.product_name}
          </h1>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            className={"bg-[#EFEEEE] text-sm text-[#767474] hover:bg-inherit"}
          >
            <Link
              to={"edit"}
              className="flex items-center gap-2 hover:bg-inherit"
            >
              <img
                src="/assets/images/edit-icon.svg"
                alt="Edit"
                className="h-4"
              />
              <span>Edit Product</span>
            </Link>
          </Button>
          <Button
            className={
              "flex items-center gap-2 bg-red-600 text-sm text-white hover:bg-red-400"
            }
            onClick={() => handleToggleModal(MODAL_TYPES.CONFIRM_DELETE)}
          >
            <Trash size={32} />
            <span>Delete</span>
          </Button>
        </div>
      </div>
      <section className="mt-5 grid grid-cols-1 items-start gap-3 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-center rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
            <img
              src={selectedImage?.path || "/assets/images/placeholder.png"}
              alt="product details"
              className="max-h-[50vh] w-full object-center"
            />

          </div>
          {/* <div className="mt-3 flex flex-wrap justify-start gap-2">
            {otherImages.map((image) => (
              <img
                onClick={() => handleSelectImage(image)}
                key={image.id}
                src={image.path}
                alt="Image path"
                className="aspect-square h-20 cursor-pointer object-center hover:opacity-85 lg:h-30"
              />
            ))}
          </div> */}
        </div>
        <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
          <h2 className="font-semibold lg:text-lg">Product Details</h2>
          <div className="mt-3 flex flex-col gap-4 text-[#5A5858]">
            <p className="flex items-center justify-between text-sm">
              <span>Product Name: </span>
              <span>{product.product_name}</span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span>Status: </span>
              <span
                className={
                  (product.status?.toLowerCase() === "available" || product.status?.toLowerCase() === "in stock")
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {(product.status?.toLowerCase() === "available" || product.status?.toLowerCase() === "in stock")
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
            </p>
            <p className="flex flex-col gap-2 text-sm">
              <span>Description: </span>
              <span>{product.description}</span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span>Cost Price: </span>
              <span>
                {`${product.currency || '₦'} ${formatCurrency(product.cost_price)}`}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span>Selling Price: </span>
              <span>
                {`${product.currency || '₦'} ${formatCurrency(product.selling_price)}`}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span>Quantity: </span>
              <span>{formatCurrency(product.quantity, 0, false)}</span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span>Low Stock Count: </span>
              <span>
                {formatCurrency(product.low_stock_threshold, 0, false)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span>Expiry Date: </span>
              <span>{product.expiration_date}</span>
            </p>
          </div>
        </div>
        <div className="col-span-full mt-4 rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
          <h2 className="font-semibold lg:text-lg">Recent Activities</h2>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-primary aspect-square h-2 rounded-full"></span>
              <div>
                <h3 className="mb-1 text-sm font-semibold">
                  Stock updated: +10 units added
                </h3>
                <p className="text-sm">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-primary aspect-square h-2 rounded-full"></span>
              <div>
                <h3 className="mb-1 text-sm font-semibold">
                  Stock updated: +10 units added
                </h3>
                <p className="text-sm">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Dialog open={openModal}>
        <DialogContent className={"gap-2 sm:max-w-[90%] lg:max-w-[700px]"}>
          <DialogHeader>
            <div className="flex justify-end">
              <button
                onClick={() => handleToggleModal()}
                className="cursor-pointer"
              >
                <X />
              </button>
            </div>
          </DialogHeader>

          {openedModalType === MODAL_TYPES.CONFIRM_DELETE && (
            <>
              <div className="mb-3 flex flex-col items-center justify-center gap-2">
                <h2 className="text-xl font-semibold lg:text-2xl">
                  Delete Product
                </h2>
                <p>
                  Are you sure you want to delete selected product? This action
                  is irreversible
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Button
                    className="bg-[#EFEEEE] text-[#767474] lg:min-w-[150px]"
                    onClick={() => handleToggleModal()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-600 text-sm text-white hover:bg-red-400 lg:min-w-[150px]"

                    // onClick={() => {
                    //   setPageMode(PAGE_MODE.BULK_UPLOAD);
                    //   handleToggleModal();
                    // }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetails;
