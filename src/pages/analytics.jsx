import { Export, Plus } from "phosphor-react";
import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { CustomBarChart } from "@/components/custom-bar-chart";
import { formatCurrency } from "@/utils/number-utilites";
import { useQuery } from "@tanstack/react-query";
import {
  FETCH_PROFIT_MARGIN_ANALYTICS,
  FETCH_SALES_ANALYTICS,
  FETCH_SALES_PERFORMANCE,
} from "@/constants/query-key";
import { useUser } from "@/context/user-context";
import axiosInstance from "@/lib/axios";

const Analytics = () => {
  const { storeInfo } = useUser();



  const { data: salesData, isLoading: isLoadingSalesData } = useQuery({
    queryKey: [FETCH_SALES_ANALYTICS],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/v1/store/${storeInfo?.id}/sales/analytics/sales`,
      );
      return response?.data;
    },
  });

  const { data: profitMarginData, isLoading: isLoadingProfitMarginData } =
    useQuery({
      queryKey: [FETCH_PROFIT_MARGIN_ANALYTICS],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `/v1/store/${storeInfo?.id}/sales/analytics/profit-margin`,
        );
        console.log({ response: response?.data });
        return response?.data;
      },
    });
  const {
    data: salesPerformanceData,
  } = useQuery({
    queryKey: [FETCH_SALES_PERFORMANCE],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/v1/store/${storeInfo?.id}/sales/analytics/products`,
      );
      console.log({ response: response?.data });
      return response?.data;
    },
  });

  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-row dark:bg-[var(--background)]">
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
        <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9 dark:border dark:bg-[#1e1e1e]">
          <h2 className="text-sm font-bold lg:text-base">
            Total Sales Revenue
          </h2>
          <div className="my-2 flex items-center justify-between">
            <h3 className="text-sm font-medium lg:text-base">
              ₦ {formatCurrency(salesData?.total_revenue) ?? 0}
            </h3>
            <p className="text-xs">Jan 1st – Dec 31st 2025</p>
          </div>
          <div className="mt-5 h-[400px]">
            {salesData?.sales?.length > 0 ? (
              <CustomBarChart
                data={salesData?.sales ?? []}
                xKey="month"
                yKey="sales_revenue"
                showLegend={false}
                tooltipRenderer={(data) => (
                  <div className="rounded-sm bg-gray-400 p-1 text-xs">
                    <p>
                      <strong>{data?.payload[0]?.payload?.month}</strong>
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <p>Sold:</p>
                      <p>
                        {data?.payload[0]?.payload?.sales_quantity} products
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p>Earned:</p>
                      <p>
                        {formatCurrency(
                          data?.payload[0]?.payload?.sales_revenue,
                        )}
                      </p>
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                {isLoadingSalesData ? "Loading..." : "No data available."}
              </div>
            )}
            {/* <Example /> */}
          </div>
        </div>
        <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9 dark:border dark:bg-[#1e1e1e]">
          <h2 className="text-sm font-bold lg:text-base">Profit Margin</h2>
          <div className="my-2 flex items-center justify-between">
            <h3 className="text-sm font-medium lg:text-base">
              ₦{" "}
              {formatCurrency(
                (profitMarginData?.total_revenue ?? 0) -
                  (profitMarginData?.total_cost ?? 0),
              ) ?? 0}
            </h3>
            <p className="text-xs">Jan 1st – Dec 31st 2025</p>
          </div>
          <div className="mt-5 h-[400px]">
            {profitMarginData?.profit_margin?.length > 0 ? (
              <CustomBarChart
                data={
                  profitMarginData?.profit_margin?.map((data) => ({
                    ...data,
                    profit_margin: ((data?.profit_margin ?? 0) * 100)?.toFixed(
                      2,
                    ),
                  })) ?? []
                }
                xKey="month"
                yKey="profit_margin"
                showLegend={false}
                tooltipRenderer={(data) => (
                  <div className="rounded-sm bg-gray-400 p-1 text-xs">
                    <p>
                      <strong>{data?.payload[0]?.payload?.month}</strong>
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <p>Revenue:</p>
                      <p>
                        {formatCurrency(
                          data?.payload[0]?.payload?.sales_revenue,
                        )}{" "}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p>Margin:</p>
                      <p>{data?.payload[0]?.payload?.profit_margin ?? 0}</p>
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                {isLoadingProfitMarginData
                  ? "Loading..."
                  : "No data available."}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9 dark:border dark:bg-[#1e1e1e]">
          <h2 className="text-sm font-bold lg:text-base">
            Top Product Performance
          </h2>

          <div className="mt-5 h-[400px]">
            {salesPerformanceData?.data?.length > 0 ? (
              <CustomBarChart
                data={salesPerformanceData?.data ?? []}
                xKey="product_name"
                yKey="total_sales"
                showLegend={false}
                tooltipRenderer={(data) => (
                  <div className="rounded-sm bg-gray-400 p-1 text-xs">
                    <p>
                      <strong>{data?.payload[0]?.payload?.month}</strong>
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <p>Name:</p>
                      <p>{data?.payload[0]?.payload?.product_name}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p>Total Sales:</p>
                      <p>{data?.payload[0]?.payload?.total_sales ?? 0}</p>
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                {isLoadingProfitMarginData
                  ? "Loading..."
                  : "No data available."}
              </div>
            )}
          </div>
        </div>
        <article className="relative z-50 flex min-h-[30vh] flex-col gap-3">
          <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9 dark:border dark:bg-[#1e1e1e]">
            <h2 className="text-sm font-bold lg:text-base">
              Top Selling Product
            </h2>
            <div className="my-4 flex items-center gap-2">
              <span className="aspect-square h-4 rounded-xs bg-[#ADBDEF]"></span>
              <h3 className="lg:text-semibold text-sm font-medium">
                {salesPerformanceData?.data[0]?.product_name}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center justify-between text-sm">
                <span>In Stock:</span>
                <span>{salesPerformanceData?.data[0]?.total_quantity}</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span>Quantity Sold: </span>
                <span>{salesPerformanceData?.data[0]?.total_sales}</span>
              </p>
              <p className="flex items-center justify-between text-sm">
                <span>Revenue Generated: </span>
                <span>
                  ₦{" "}
                  {formatCurrency(
                    salesPerformanceData?.data[0]?.total_revenue ?? 0,
                  )}
                </span>
              </p>
            </div>
          </div>
          {/* <div className="rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9 dark:border dark:bg-[#1e1e1e]">
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
          </div> */}
        </article>
      </div>
    </>
  );
};

export default Analytics;
