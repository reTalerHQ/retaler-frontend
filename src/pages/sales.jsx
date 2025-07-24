import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { BusinessOverviewCard } from "../components/business-overview-card";
import {
  CurrencyCircleDollar,
  Plus,
  MagnifyingGlass,
  Funnel,
  ChartBar,
  Export,
  Star,
  Trash,
  X,
} from "phosphor-react";
import { DataTable } from "../components/data-table";
import { formatCurrency } from "../utils/number-utilites";
import { format, set } from "date-fns";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const Sales = () => {
  const [selectedSalesIds, setSelectedSalesIds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const sales = [
    {
      id: 1,
      productName: "Garri",
      totalPrice: 7500,
      currency: "₦",
      soldBy: "Chinedu Okafor",
      status: "Paid",
      date: new Date("2025-07-14"),
    },
    {
      id: 2,
      productName: "Yam",
      totalPrice: 10000,
      currency: "₦",
      soldBy: "Amaka Obi",
      status: "Unpaid",
      date: new Date("2025-07-13"),
    },
    {
      id: 3,
      productName: "Palm Oil",
      totalPrice: 3000,
      currency: "₦",
      soldBy: "Ifeanyi Umeh",
      status: "Paid",
      date: new Date("2025-07-12"),
    },
    {
      id: 4,
      productName: "Beans",
      totalPrice: 4500,
      currency: "₦",
      soldBy: "Ngozi Nwosu",
      status: "Paid",
      date: new Date("2025-07-11"),
    },
    {
      id: 5,
      productName: "Crayfish",
      totalPrice: 6000,
      currency: "₦",
      soldBy: "Tunde Adebayo",
      status: "Unpaid",
      date: new Date("2025-07-10"),
    },
  ];

  const columns = [
    {
      accessorKey: "productName",
      header: "Product Name",
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="inline-block w-full text-right">
            {`${data.currency} ${formatCurrency(data.totalPrice)}`}
          </span>
        );
      },
    },
    {
      accessorKey: "soldBy",
      header: "Sold By",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue();
        const paid = value?.toLowerCase() === "paid";
        return (
          <span className={paid ? "text-green-600" : "text-red-600"}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) => {
        const date = getValue();
        return <span>{format(new Date(date), "dd/MM/yyyy")}</span>;
      },
    },
  ];

  const handleDeleteSelected = () => {
    console.log("✅ Would delete IDs:", selectedSalesIds);
    // setShowDeleteModal(false);
    setSelectedSalesIds([]);
  };

  // const handleDeleteSelected = () => {
  //   const remainingSales = sales.filter(
  //     (sale) => !selectedSalesIds.includes(sale.id),
  //   );

  //   console.log("Remaining Sales after delete:", remainingSales);
  //   setSelectedSalesIds([]);
  // };

  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        <h1 className="text-lg font-bold lg:text-2xl">Sales</h1>
        <div className="items-ceter flex justify-between gap-3">
          <Button
            className={
              "text-primary border-0 bg-transparent shadow-none hover:bg-transparent hover:opacity-50"
            }
          >
            <Export />
            <span>Export</span>
          </Button>
          <Link
            to="/sales/add-new-sales"
            className="bg-primary flex items-center rounded-sm p-2 text-white hover:opacity-75"
          >
            <Plus /> Add new Sale
          </Link>
        </div>
      </div>

      {/* OVERVIEW CARDS */}
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <BusinessOverviewCard
          title="Total Sales"
          count={"₦ 100,000"}
          icon={<CurrencyCircleDollar className="text-2xl text-[#038719]" />}
          color="#E6F3E8"
          border="#98CEA1"
        />
        <BusinessOverviewCard
          title="Revenue Generate"
          count={"₦ 354,200"}
          icon={<ChartBar className="text-2xl text-[#375ED9]" />}
          color="#F6F8FD"
          border="#ADBDEF"
        />
        <BusinessOverviewCard
          title="Avg. Sale Value"
          count={"₦ 5,000"}
          icon={<Star className="text-2xl text-[#FFF5CC]" />}
          color="#FFF5CC"
          border="#FFD633"
        />
      </div>

      {/* SALES TABLE */}
      <div className="mt-8 bg-white p-4 lg:px-5 lg:py-9">
        <div className="mb-10 flex flex-col justify-between gap-3 lg:flex-row">
          <h1 className="text-lg font-bold">All Sales</h1>

          <div className="flex items-center gap-5">
            <div className="">
              {selectedSalesIds.length > 0 && (
                <div className="inline-flex items-center gap-5">
                  <p className="text-xs lg:text-lg">
                    {selectedSalesIds.length}{" "}
                    {selectedSalesIds.length > 1 ? "items" : "item"} selected
                  </p>
                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-gray-300 text-gray-600 hover:bg-gray-400"
                  >
                    <Trash size={32} weight="bold" /> Delete
                  </Button>
                </div>
              )}
            </div>

            {/* SEARCH BAR */}
            <div className="flex items-center gap-2">
              <button>
                <Funnel className="text-2xl" />
              </button>
              <Input
                showError={false}
                type="Search"
                placeholder="Search"
                leftIcon={
                  <MagnifyingGlass className="text-sm text-[#BBBBBB]" />
                }
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <DataTable
          columns={columns}
          data={sales}
          enableRowSelection
          onSelectedRowsChange={setSelectedSalesIds}
          selectedRowClassName="bg-[#CACDF6]/30"
        />
      </div>

      {/* DELETE MODAL */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="flex flex-col items-center gap-6 sm:max-w-[600px]">
          {/* MODAL HEADER */}
          <DialogClose asChild>
            <Button
              variant="outline"
              className="absolute top-4 right-4 flex justify-end text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </Button>
          </DialogClose>
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Delete Products
            </DialogTitle>
          </DialogHeader>

          {/* DESCRIPTION */}
          <DialogDescription>
            Are you sure you want to delete the selected sales?{" "}
            <span>This action is irreversible.</span>
          </DialogDescription>

          {/* footer modal */}
          <DialogFooter className="flex flex-row gap-4">
            <DialogClose asChild>
              <Button variant="outline" className="bg:px-8 bg-gray-300">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="bg:px-8 bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                handleDeleteSelected(); // ✅ Actually delete here
                setShowDeleteModal(false); // ✅ Close modal
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sales;
