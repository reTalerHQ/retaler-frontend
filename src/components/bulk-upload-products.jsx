import { formatCurrency } from "@/utils/number-utilites";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { dummyBulkProducts } from "@/data/dummy-bulk-products";
import { Dialog, DialogContent, DialogHeader } from "../components/ui/dialog";
import { X } from "phosphor-react";
import { FadeLoader } from "react-spinners";
import { Progress } from "./ui/progress";

const MODAL_TYPES = {
  UPLOADING: "UPLOADING",
};

export const BulkUploadProducts = ({ file }) => {
  const [openModal, setOpenModal] = useState(true);
  const [openedModalType, setOpenedModalType] = useState(MODAL_TYPES.UPLOADING);

  const columns = [
    {
      accessorKey: "productName",
      header: "product_name",
    },
    {
      accessorKey: "costPrice",
      header: () => (
        <span className="inline-block w-full text-center">Cost Price</span>
      ),
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="inline-block w-full text-right">{`₦ ${formatCurrency(data.costPrice)}`}</span>
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
          <span className="inline-block w-full text-right">{`₦ ${formatCurrency(data.sellingPrice)}`}</span>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => (
        <span className="inline-block w-full text-center">Qty</span>
      ),
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="inline-block w-full text-center">{`${formatCurrency(data.quantity, 0, false)}`}</span>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <span className="inline-block w-full text-right">Qty</span>,
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="inline-block w-full text-right">{`${data.category}`}</span>
        );
      },
    },
  ];

  const dummyMappings = [
    {
      id: 1,
      csvColumn: "product_name",
      mappedTo: "Product Name",
      status: "Auto-Mapped",
    },
    {
      id: 2,
      csvColumn: "description",
      mappedTo: "Description",
      status: "Auto-Mapped",
    },
    {
      id: 3,
      csvColumn: "cost",
      mappedTo: "Cost Price",
      status: "Auto-Mapped",
    },
    {
      id: 4,
      csvColumn: "selling",
      mappedTo: "Selling Price",
      status: "Auto-Mapped",
    },
    {
      id: 5,
      csvColumn: "qty",
      mappedTo: "Quantity",
      status: "Auto-Mapped",
    },
    {
      id: 6,
      csvColumn: "category",
      mappedTo: "Category",
      status: "Auto-Mapped",
    },
  ];

  const mappingColumns = [
    {
      accessorKey: "csvColumn",
      header: "Your CSV colum name",
    },
    {
      accessorKey: "mappedTo",
      header: "Mapped To",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const AUTOMAPPED = "AUTO-MAPPED";
        const value = getValue();
        return (
          <span
            className={`${value.toUpperCase() === AUTOMAPPED ? "text-green-600" : "text-red-600"}`}
          >
            {value}
          </span>
        );
      },
    },
  ];

  const handleToggleModal = (modalType) => {
    if (!modalType) {
      setOpenModal(false);
      setOpenedModalType(null);
    } else {
      setOpenModal(true);
      setOpenedModalType(modalType);
    }
  };

  return (
    <>
      <section className="rounded-sm bg-white p-4 lg:px-5 lg:py-9">
        <h1 className="text-center text-base font-bold lg:text-lg">
          Import Products from CSV
        </h1>
        <p className="mt-1 text-center text-sm">
          Map your CSV columns to our product fields
        </p>
        <h3 className="text-sm font-semibold">Preview your data: </h3>
        <div className="my-2">
          <DataTable columns={columns} data={dummyBulkProducts} />
        </div>
        <div className="my-5 rounded-sm bg-[#E6F3E8] p-3">
          <h3 className="font-semibold">Auto-mapping successful!</h3>
          <p className="mt-1.5">
            We automatically mapped 5 out of 7 columns based on common naming
            patterns.
          </p>
        </div>
        <h3 className="mt-3 text-sm font-semibold">
          Successfully Auto-mapped:
        </h3>
        <div className="my-3">
          <DataTable columns={mappingColumns} data={dummyMappings} />
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

          {openedModalType === MODAL_TYPES.UPLOADING && (
            <>
              <div className="flex flex-col items-center justify-center gap-2 mb-3">
                <FadeLoader color="#038719" radius={1} height={14} />
                <h2 className="text-xl font-semibold lg:text-2xl">
                  Importing Products...
                </h2>
                <p>87 of 145 products imported</p>
              </div>
              <Progress
                className={"bg-[#EFEEEE]"}
                value={75}
                filedBg="bg-[#038719]"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
