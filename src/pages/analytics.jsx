import { Export, Plus } from "phosphor-react";
import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { CustomLineChart } from "@/components/custom-line-chart";
import { formatCurrency } from "@/utils/number-utilites";

const Analytics = () => {
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

  const dummyProfitMargin = [
    {
      name: "January",
      margin: 60,
    },
    {
      name: "February",
      amount: 40,
    },
    {
      name: "March",
      margin: 50,
    },
    {
      name: "April",
      margin: 30,
    },
    {
      name: "June",
      margin: 75,
    },
    {
      name: "July",
      margin: 21,
    },
    {
      name: "August",
      margin: 71,
    },
    {
      name: "September",
      margin: 65,
    },
    {
      name: "October",
      margin: 45,
      salesCount: 10,
    },
    {
      name: "November",
      margin: 43,
    },
    {
      name: "December",
      margin: 80,
    },
  ];

  const dummyProductSales = [
    {
      name: "Gala",
      revenue: 50000,
      quantitySold: 1200,
    },
    {
      name: "Coca-Cola",
      revenue: 75000,
      quantitySold: 1500,
    },
    {
      name: "Power Oil",
      revenue: 92000,
      quantitySold: 850,
    },
    {
      name: "Spaghetti",
      revenue: 67000,
      quantitySold: 1100,
    },
    {
      name: "Peak Milk",
      revenue: 105000,
      quantitySold: 1300,
    },
    {
      name: "Indomie",
      revenue: 98000,
      quantitySold: 1700,
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        <h1 className="text-lg font-bold lg:text-2xl">Analytics</h1>
        <div className="items-ceter flex justify-between gap-3">
          <Button
            className={
              "min-w-[150px] border-0 bg-[#EFEEEE] text-[#767474] shadow-none hover:bg-transparent hover:opacity-50"
            }
          >
            <Export />
            <span>Export</span>
          </Button>
          <Link
            to="/sales/add-new-sales"
            className="bg-primary flex items-center rounded-sm p-1 px-3 text-sm text-white hover:opacity-75"
          >
            <Plus /> Add new Sale
          </Link>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
          <h2 className="text-sm font-bold lg:text-base">
            Total Sales Revenue
          </h2>
          <div className="my-2 flex items-center justify-between">
            <h3 className="text-sm font-medium lg:text-base">₦354,200</h3>
            <p className="text-xs">Jan 1st – Dec 31st 2025</p>
          </div>
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
        <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
          <h2 className="text-sm font-bold lg:text-base">Profit Margin</h2>
          <div className="my-2 flex items-center justify-end">
            <p className="text-xs">Jan 1st – Dec 31st 2025</p>
          </div>
          <div className="relative z-50 mt-5 min-h-[30vh]">
            <CustomLineChart
              data={dummyProfitMargin}
              xKey="name"
              yKey="margin"
              showLegend={false}
              tooltipRenderer={(data) => (
                <>
                  <p>
                    <strong>{data?.payload?.name}</strong>
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p>Margin:</p>
                    <p>{data?.payload?.margin}%</p>
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
          <h2 className="text-sm font-bold lg:text-base">
            Top Product Performance
          </h2>
          <div className="my-2 flex items-center justify-end">
            <p className="text-xs">Jan 1st – Dec 31st 2025</p>
          </div>
          <div className="relative z-50 mt-5 min-h-[30vh]">
            <CustomLineChart
              data={dummyProductSales}
              xKey="name"
              yKey="revenue"
              showLegend={false}
              tooltipRenderer={(data) => (
                <>
                  <p>
                    <strong>{data?.payload?.name}</strong>
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p>Revenue:</p>
                    <p>{formatCurrency(data?.payload?.revenue)} products</p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p>Unit Sold:</p>
                    <p>{data?.payload?.quantitySold}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p>Average:</p>
                    <p>
                      ₦{" "}
                      {formatCurrency(
                        data?.payload?.revenue / data?.payload?.quantitySold,
                      )}
                    </p>
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <article className="relative z-50 flex min-h-[30vh] flex-col gap-3">
          <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
            <h2 className="text-sm font-bold lg:text-base">
              Top Selling Product
            </h2>
            <div className="my-4 flex items-center gap-2">
              <span className="aspect-square h-4 rounded-xs bg-[#ADBDEF]"></span>
              <h3 className="lg:text-semibold text-sm font-medium">
                Spaghetti
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center justify-between text-sm">
                <span>In Stock:</span>
                <span>20</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span>Quantity Sold: </span>
                <span>40</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span>Revenue Generated: </span>
                <span>₦ {formatCurrency(50000)}</span>
              </p>
            </div>
          </div>
          <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
            <h2 className="text-sm font-bold lg:text-base">
              Least Selling Product
            </h2>
            <div className="my-4 flex items-center gap-2">
              <span className="aspect-square h-4 rounded-xs bg-[#ADBDEF]"></span>
              <h3 className="lg:text-semibold text-sm font-medium">
                Nutri-C Juice (Sachet)
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center justify-between text-sm">
                <span>In Stock:</span>
                <span>20</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span>Quantity Sold: </span>
                <span>40</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span>Revenue Generated: </span>
                <span>₦ {formatCurrency(500)}</span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Analytics;
