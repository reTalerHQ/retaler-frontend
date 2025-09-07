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
import { format } from "date-fns";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { useUser } from "@/context/user-context";
import axiosInstance from "@/lib/axios";
import { TOKEN_IDENTIFIER } from "@/constants";
import { BASE_URL } from "@/constants/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { PagePreLoader } from "@/components/page-pre-loader";
import { FETCH_SALES, FETCH_SALES_STATS } from "@/constants/query-key";

const Sales = () => {
  const [selectedSalesIds, setSelectedSalesIds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { storeInfo } = useUser();

  const { isLoading: isLoadingSales, data: salesData } = useQuery({
    queryKey: [FETCH_SALES],
    queryFn: async () => {
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const rsp = await axiosInstance.get(
        `${BASE_URL}/v1/store/${storeInfo.id}/sales`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      );
      return rsp?.data;
    },
    enabled: Boolean(storeInfo?.id),
  });

  const { isLoading: isLoadingSalesStats, data: salesStats } = useQuery({
    queryKey: [FETCH_SALES_STATS],
    queryFn: async () => {
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const rsp = await axiosInstance.get(
        `${BASE_URL}/v1/store/${storeInfo.id}/sales/stats`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      );
      return rsp?.data;
    },
    enabled: Boolean(storeInfo?.id),
  });

    const queryClient = useQueryClient();
    const deleteSale = useMutation({
      mutationFn: async(id) => {
          const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
     return axiosInstance.delete(`/v1/store/${storeInfo.id}/sales/${id}`,

        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      )
    },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [FETCH_SALES]})
      }
    })
  
    const handleDeleteSelected = () => {
      console.log("deletingsales:", typeof selectedSalesIds);
      console.log("deletingsales:", selectedSalesIds)
    selectedSalesIds.forEach((sale) => deleteSale.mutate(sale.id))
    console.log("✅ Would delete IDs:", selectedSalesIds);
    // setShowDeleteModal(false);
    setSelectedSalesIds([]);
  };
  

  const columns = [
    {
      accessorKey: "items",
      header: "Product Names",
      accessorFn: (data) => data?.items?.map((p) => p.inventory_id).join(","),
    },
    {
      accessorKey: "total_amount",
      header: "Total Price",
      cell: ({ row }) => {
        const data = row.original;
        return <span>{`N ${formatCurrency(data.total_amount)}`}</span>;
      },
    },
    {
      accessorKey: "amount_paid",
      header: "Amount Paid",
      cell: ({ row }) => {
        const data = row.original;
        return <span>{`N ${formatCurrency(data.amount_paid)}`}</span>;
      },
    },
    {
      accessorKey: "outstanding_balance",
      header: "Outstanding Amount",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="">
            {`N ${formatCurrency(data.outstanding_balance)}`}
          </span>
        );
      },
    },
    // {
    //   accessorKey: "soldBy",
    //   header: "Sold By",
    // },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ getValue }) => {
    //     const value = getValue();
    //     const paid = value?.toLowerCase() === "paid";
    //     return (
    //       <span className={paid ? "text-green-600" : "text-red-600"}>
    //         {value}
    //       </span>
    //     );
    //   },
    // },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ getValue }) => {
        const date = getValue();
        return <span>{format(new Date(date), "dd/MM/yyyy")}</span>;
      },
    },
  ];

  //   const { isLoading: isLoadingSales, data: salesData } = useQuery({
  //   queryKey: [FETCH_SALES],
  //   queryFn: async () => {
  //     const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
  //     const rsp = await axiosInstance.get(
  //       `${BASE_URL}/v1/store/${storeInfo.id}/sales`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${tokenFromStorage}`,
  //         },
  //       },
  //     );
  //     return rsp?.data;
  //   },
  //   enabled: Boolean(storeInfo?.id),
  // });

  // const handleDeleteSelected = (saleId) => {
  //   const queryClient = useQueryClient()
  //   console.log("✅ Would delete IDs:", selectedSalesIds);
  //   // setShowDeleteModal(false);
  //   setSelectedSalesIds([]);
  // };

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
              "text-primary border-0 bg-transparent shadow-none hover:bg-transparent hover:opacity-50 dark:bg-[#1e1e1e] dark:text-white"
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
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3 dark:text-black">
        <BusinessOverviewCard
          title="Total Sales"
          count={
            salesStats?.revenue_generated
              ? `N ${formatCurrency(salesStats?.revenue_generated)}`
              : 0
          }
          icon={<CurrencyCircleDollar className="text-2xl text-[#038719]" />}
          color="#E6F3E8"
          border="#98CEA1"
        />
        <BusinessOverviewCard
          title="Revenue Generate"
          count={
            salesStats?.revenue_generated
              ? `N ${formatCurrency(salesStats?.revenue_generated)}`
              : 0
          }
          icon={<ChartBar className="text-2xl text-[#375ED9]" />}
          color="#F6F8FD"
          border="#ADBDEF"
        />
        <BusinessOverviewCard
          title="Avg. Sale Value"
          count={
            salesStats?.avg_sales_value
              ? `N ${formatCurrency(salesStats?.avg_sales_value)}`
              : 0
          }
          icon={<Star className="text-2xl text-[#FFF5CC]" />}
          color="#FFF5CC"
          border="#FFD633"
        />
      </div>

      {/* SALES TABLE */}
      <div className="mt-8 bg-white p-4 lg:px-5 lg:py-9 dark:bg-[#1e1e1e] dark:border dark:rounded-sm">
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
          data={(salesData ?? [])
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))}
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
      {isLoadingSales || (isLoadingSalesStats && <PagePreLoader />)}
    </>
  );
};

export default Sales;
