import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { BusinessOverviewCard } from "../components/business-overview-card";
import {
  CurrencyCircleDollar,
  Tag,
  Plus,
  Warning,
  MagnifyingGlass,
  Funnel,
  X,
  ChartBar,
} from "phosphor-react";
import { DataTable } from "../components/data-table";
import { formatCurrency } from "../utils/number-utilites";
import { format } from "date-fns";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader } from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";

const MODAL_TYPES = {
  ADD_PRODUCTS: "ADD_PRODUCT",
};

const UPLOAD_OPTIONS = {
  MANUAL: "MANUAL",
  SPREAD_SHEET: "SPREAD_SHEET",
};

const Inventory = () => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openedModalType, setOpenedModalType] = useState(null);
  const [selectedUploadOption, setSelectedUploadOption] = useState(null);

  const products = [
    {
      id: 1,
      productName: "Garri",
      price: 1500,
      currency: "₦",
      costPrice: 1200,
      sellingPrice: 1500,
      status: "In Stock",
      lastUpdatedAt: new Date("2025-07-10"),
      quantity: 100,
    },
    {
      id: 2,
      productName: "Palm Oil",
      price: 3000,
      currency: "₦",
      costPrice: 2500,
      sellingPrice: 3000,
      status: "Out of Stock",
      lastUpdatedAt: new Date("2025-07-08"),
      quantity: 0,
    },
    {
      id: 3,
      productName: "Yam",
      price: 4000,
      currency: "₦",
      costPrice: 3300,
      sellingPrice: 4000,
      status: "In Stock",
      lastUpdatedAt: new Date("2025-07-12"),
      quantity: 50,
    },
    {
      id: 4,
      productName: "Beans",
      price: 2200,
      currency: "₦",
      costPrice: 1900,
      sellingPrice: 2200,
      status: "In Stock",
      lastUpdatedAt: new Date("2025-07-09"),
      quantity: 14,
    },
    {
      id: 5,
      productName: "Crayfish",
      price: 1800,
      currency: "₦",
      costPrice: 1500,
      sellingPrice: 1800,
      status: "Out of Stock",
      lastUpdatedAt: new Date("2025-07-07"),
      quantity: 2,
    },
    {
      id: 6,
      productName: "Tomatoes",
      price: 1000,
      currency: "₦",
      costPrice: 800,
      sellingPrice: 1000,
      status: "In Stock",
      lastUpdatedAt: new Date("2025-07-11"),
      quantity: 100,
    },
    {
      id: 7,
      productName: "Onions",
      price: 1200,
      currency: "₦",
      costPrice: 950,
      sellingPrice: 1200,
      status: "In Stock",
      lastUpdatedAt: new Date("2025-07-10"),
      quantity: 22,
    },
    {
      id: 8,
      productName: "Groundnut Oil",
      price: 3500,
      currency: "₦",
      costPrice: 3000,
      sellingPrice: 3500,
      status: "Out of Stock",
      lastUpdatedAt: new Date("2025-07-06"),
      quantity: 4,
    },
    {
      id: 9,
      productName: "Ogbono",
      price: 2000,
      currency: "₦",
      costPrice: 1700,
      sellingPrice: 2000,
      status: "In Stock",
      lastUpdatedAt: new Date("2025-07-13"),
      quantity: 11,
    },
    {
      id: 10,
      productName: "Vegetable",
      price: 800,
      currency: "₦",
      costPrice: 600,
      sellingPrice: 800,
      status: "In Stock",
      lastUpdatedAt: new Date("2025-07-14"),
      quantity: 100,
    },
  ];

  const handleToggleModal = (modalType) => {
    if (!modalType) {
      setOpenModal(false);
      setOpenedModalType(null);
      setSelectedUploadOption(null);
    } else {
      setOpenModal(true);
      setOpenedModalType(modalType);
    }
  };

  const handleUploadOptionSelect = (option) => {
    setSelectedUploadOption(option);
  };

  const columns = [
    {
      accessorKey: "productName",
      header: "Product Name",
    },
    {
      accessorKey: "costPrice",
      header: () => (
        <span className="inline-block w-full text-center">Cost Price</span>
      ),
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="inline-block w-full text-right">{`${data.currency} ${formatCurrency(data.costPrice)}`}</span>
        );
      },
    },
    {
      accessorKey: "sellingPrice",
      header: () => (
        <span className="inline-block w-full text-center">Selling Price</span>
      ),
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="inline-block w-full text-right">{`${data.currency} ${formatCurrency(data.sellingPrice)}`}</span>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => (
        <span className="inline-block w-full text-center">Quantity</span>
      ),
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="inline-block w-full text-center">{`${formatCurrency(data.quantity, 0, false)}`}</span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const IN_STOCK = "IN STOCK";
        const value = getValue();
        return (
          <span
            className={`${value.toUpperCase() === IN_STOCK ? "text-green-600" : "text-red-600"}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      header: "Last Updated",
      accessorFn: (data) => format(data.lastUpdatedAt, "dd/MM/yyyy"),
    },
  ];

  const handleAddProductContinueActionClick = () => {
    if (!selectedUploadOption) {
      return;
    }

    if (selectedUploadOption === UPLOAD_OPTIONS.MANUAL) {
      navigate("add-new-product");
      return;
    }

    if (selectedUploadOption === UPLOAD_OPTIONS.SPREAD_SHEET) {
      navigate("bulk-add-new-products");
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        <h1 className="text-lg font-bold lg:text-2xl">Inventory</h1>
        <Button onClick={() => handleToggleModal(MODAL_TYPES.ADD_PRODUCTS)}>
          <Plus /> Add new Product
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <BusinessOverviewCard
          title="Total Products"
          count={45}
          icon={<Tag className="text-2xl text-[#4C518F]" />}
          color="#CACDF6"
        />
        <BusinessOverviewCard
          title="Total Sales"
          count={"N 100.00"}
          icon={<CurrencyCircleDollar className="text-2xl text-[#038719]" />}
          color="#98CEA1"
        />
        <BusinessOverviewCard
          title="Restock Needed"
          count={5}
          icon={<Warning className="text-2xl text-[#CCA300]" />}
          color="#FFF5CC"
        />
      </div>
      <div className="mt-8 bg-white p-4 lg:px-5 lg:py-9">
        <div className="mb-10 flex flex-col justify-between gap-3 lg:flex-row">
          <h1 className="text-lg font-bold">All Products</h1>
          <div className="flex items-center gap-2">
            <button>
              <Funnel className="text-2xl" />
            </button>
            <Input
              showError={false}
              type="Search"
              placeholder="Search"
              leftIcon={<MagnifyingGlass className="text-sm text-[#BBBBBB]" />}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={products}
          enableRowSelection
          onSelectedRowsChange={setSelectedProducts}
          selectedRowClassName="bg-[#CACDF6]/30"
        />
      </div>
      <Dialog open={openModal}>
        <DialogContent className={"gap-2 sm:max-w-[90%] lg:max-w-[700px]"}>
          <DialogHeader>
            <div className="flex justify-end">
              <button onClick={() => handleToggleModal()}>
                <X />
              </button>
            </div>
          </DialogHeader>
          {openedModalType === MODAL_TYPES.ADD_PRODUCTS && (
            <>
              <h1 className="text-center text-base font-bold lg:text-lg">
                Add Products
              </h1>
              <p className="text-center text-sm">
                How do you want to add your goods
              </p>
              <div className="my-3 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
                <div
                  onClick={() =>
                    handleUploadOptionSelect(UPLOAD_OPTIONS.MANUAL)
                  }
                  className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-sm bg-[#FAFAFA] p-6 lg:gap-6 ${selectedUploadOption === UPLOAD_OPTIONS.MANUAL ? "border-primary border" : ""}`}
                >
                  <div className="bg-primary flex aspect-square h-10 items-center justify-center rounded-full lg:h-14">
                    <Tag className="text-lg text-white lg:text-2xl" />
                  </div>
                  <h1 className="text-lg font-semibold lg:text-xl">Manually</h1>
                  <p className="text-sm font-light">
                    Manually add products one by one, entering product details
                    step by step.
                  </p>
                </div>
                <div
                  className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-sm bg-[#FAFAFA] p-6 lg:gap-6 ${selectedUploadOption === UPLOAD_OPTIONS.SPREAD_SHEET ? "border-primary border" : ""}`}
                  onClick={() =>
                    handleUploadOptionSelect(UPLOAD_OPTIONS.SPREAD_SHEET)
                  }
                >
                  <div className="flex aspect-square h-10 items-center justify-center rounded-full bg-[#2E9B40] lg:h-14">
                    <ChartBar className="text-lg text-white lg:text-2xl" />
                  </div>
                  <h1 className="text-lg font-semibold lg:text-xl">
                    Import from spreadsheet
                  </h1>
                  <p className="text-sm font-light">
                    Import product information data from an Excel spreadsheet
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button className="bg-[#EFEEEE] text-[#767474] lg:min-w-[150px]">
                  Cancel
                </Button>
                <Button
                  className="lg:min-w-[150px]"
                  disabled={!selectedUploadOption}
                  onClick={() => handleAddProductContinueActionClick()}
                >
                  Continue
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Inventory;
