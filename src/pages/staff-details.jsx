import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BusinessOverviewCard } from "../components/business-overview-card";
import { Mail, PhoneCallIcon } from "lucide-react";
import {
  CurrencyCircleDollar,
  ChartBar,
  MagnifyingGlass,
  Star,
  CaretLeft,
  Funnel,
} from "phosphor-react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/number-utilites";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CustomLineChart } from "@/components/custom-line-chart";

const StaffDetails = () => {
  const [saleIds, setSaleIds] = useState([]);
  const dummySales = [
    {
      name: "January",
      amount: 2400,
      salesCount: 10,
    },
    {
      name: "February",
      amount: 2210,
      salesCount: 10,
    },
    {
      name: "March",
      amount: 2290,
      salesCount: 10,
    },
    {
      name: "April",
      amount: 2000,
      salesCount: 10,
    },
    {
      name: "June",
      amount: 2181,
      salesCount: 10,
    },
    {
      name: "July",
      amount: 2500,
      salesCount: 10,
    },
    {
      name: "August",
      amount: 2100,
      salesCount: 10,
    },
    {
      name: "September",
      amount: 2100,
      salesCount: 10,
    },
    {
      name: "October",
      amount: 1200,
      salesCount: 10,
    },
    {
      name: "November",
      amount: 3500,
      salesCount: 10,
    },
    {
      name: "December",
      amount: 500,
      salesCount: 10,
    },
  ];

  const sales = [
    {
      id: 1,
      productName: "Peak Milk",
      Price: 1000,
      currency: "₦",
      quantity: "100",
      time: "10 AM",
      date: new Date("2025-07-10"),
    },
    {
      id: 2,
      productName: "Peak Milk",
      Price: 1000,
      currency: "₦",
      quantity: "100",
      time: "10 AM",
      date: new Date("2025-07-10"),
    },
    {
      id: 3,
      productName: "Peak Milk",
      Price: 1000,
      currency: "₦",
      quantity: "100",
      time: "10 AM",
      date: new Date("2025-07-10"),
    },
    {
      id: 4,
      productName: "Peak Milk",
      Price: 1000,
      currency: "₦",
      quantity: "100",
      time: "10 AM",
      date: new Date("2025-07-10"),
    },
    {
      id: 5,
      productName: "Peak Milk",
      Price: 1000,
      currency: "₦",
      quantity: "100",
      time: "10 AM",
      date: new Date("2025-07-10"),
    },
  ];

  const columns = [
    {
      accessorKey: "productName",
      header: "Product Name",
    },
    {
      accessorKey: "Price",
      header: "Price",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <span className="inline-block w-full text-right">
            {`${data.currency} ${formatCurrency(data.Price)}`}
          </span>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "time",
      hearder: "Time",
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

  const location = useLocation();
  const { staffName, role, status } = location.state || {};

  return (
    <>
      <section>
        <div className="flex lg:items-center lg:gap-1">
          <Link to="/staff">
            <CaretLeft className="text-xl" />
          </Link>
          <h1 className="text-lg font-bold lg:text-2xl">Staff Details</h1>
        </div>
        <section className="mt-5 flex flex-col rounded-xl border border-[#EFEEEE] bg-white px-3.5 py-3.5 lg:flex-row lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold lg:text-3xl">{staffName}</h2>
            <button className="rounded-lg border border-[#98CEA1] bg-[#E6F3E8] px-3 text-center">
              <span className="flex items-center justify-center gap-1 text-sm text-[#038719]">
                <span className="aspect-square h-1.5 rounded-full bg-[#038719]"></span>{" "}
                {status}{" "}
              </span>
            </button>
            <button className="ml-2 rounded-lg border border-[#99CFFF] bg-[#E5F3FF] px-3 text-center">
              <span className="text-sm text-[#0088FF]"> {role} </span>
            </button>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Button className="bg-[#F6F8FD] text-[#375ED9] hover:bg-inherit">
              <Mail /> Email {staffName}
            </Button>
            <Button className="bg-[#375ED9]">
              <PhoneCallIcon /> Call {staffName}
            </Button>
          </div>
        </section>

        <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section className="rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5 lg:py-9">
              <div className="">
                <h3 className="text-xl font-semibold">Performance Review</h3>
                <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <BusinessOverviewCard
                    title="Total Sales"
                    count={"47"}
                    icon={
                      <CurrencyCircleDollar className="text-2xl text-[#038719]" />
                    }
                    color="#E6F3E8"
                    border="#98CEA1"
                  />
                  <BusinessOverviewCard
                    title="Revenue Generate"
                    count={"₦ 100,000"}
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
              </div>
            </section>
            <section className="mt-8 rounded-2xl border border-[#EFEEEE] bg-white lg:p-4 lg:px-5">
              <div className="mt-3 mb-8 flex gap-3 lg:flex-row lg:justify-between">
                <h2 className="text-xl font-semibold">Sale History</h2>
                <div className="flex gap-2 lg:items-center">
                  <button>
                    <Funnel className="hidden text-2xl lg:block" />
                  </button>
                  <Input
                    className="hidden lg:block"
                    showError={false}
                    type="Search"
                    placeholder="Search"
                    leftIcon={
                      <MagnifyingGlass className="hidden text-sm text-[#BBBBBB] lg:block" />
                    }
                  />
                </div>
              </div>
              <DataTable
                className="w-[41rem]"
                columns={columns}
                data={sales}
                enableRowSelection
                onSelectedRowsChange={setSaleIds}
                selectedRowClassName="bg-[#CACDF6]/30"
              />
            </section>
          </div>

          <div>
            <section>
              <div className="mx-2 rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5 lg:py-9">
                <h2 className="text-xl font-semibold text-[#373636]">
                  Revenue Generated
                </h2>
                <div className="relative z-50 mt-5 min-h-[30vh]">
                  <CustomLineChart
                    data={dummySales}
                    xKey="name"
                    yKey="amount"
                    showLegend={false}
                    tooltipRenderer={(data) => (
                      <>
                        <p>
                          <strong>{data?.payload?.name}</strong>
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <p>Sold:</p>
                          <p>{data?.payload?.salesCount} products</p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p>Earned:</p>
                          <p>{formatCurrency(data?.payload?.amount)}</p>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="mx-2 mt-8 rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5 lg:py-9">
                <h2 className="text-xl font-semibold text-[#373636]">
                  Role Assigned Permissions
                </h2>
                <button className="mt-5 rounded-lg border border-[#99CFFF] bg-[#E5F3FF] px-3 text-center">
                  <span className="text-[#0088FF] text-sm"> {role} </span>
                </button>
                <ul className="mt-5 list-none">
                  <li className="mb-3 rounded-md bg-[#F6F8FD] px-5 py-1.5">
                    View Products
                  </li>
                  <li className="mb-3 rounded-md bg-[#F6F8FD] px-5 py-1.5">
                    View All Sales
                  </li>
                  <li className="mb-3 rounded-md bg-[#F6F8FD] px-5 py-1.5">
                    Resord New Sales
                  </li>
                  <li className="rounded-md bg-[#F6F8FD] px-5 py-1.5">
                    Edit Sales Records
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaffDetails;
