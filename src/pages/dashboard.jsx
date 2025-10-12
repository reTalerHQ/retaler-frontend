import React, { useEffect, useMemo, useState } from "react";
import useRoleAccess from "../hooks/use-role-access";
import { BusinessOverviewCard } from "../components/business-overview-card";
import {
  CheckCircle,
  CurrencyCircleDollar,
  ShareNetwork,
  Tag,
  User,
  Warning,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { formatCurrency } from "../utils/number-utilites";
import { format } from "date-fns";
import { useUser } from "@/context/user-context";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FETCH_SALES,
  FETCH_SALES_STATS,
  FETCH_INVENTORY,
} from "@/constants/query-key";

import axiosInstance from "@/lib/axios";
import { BASE_URL } from "@/constants/api";
import { TOKEN_IDENTIFIER } from "@/constants";
import { PagePreLoader } from "@/components/page-pre-loader";

const Dashboard = () => {
  useRoleAccess(["Manager", "Admin"]);
  const [welcome, setWelcome] = useState("");

  const { storeInfo } = useUser();

  const { data: salesData = [], isLoading: isLoadingSales } = useQuery({
    queryKey: [FETCH_SALES, storeInfo?.id],
    queryFn: async () => {
      const token = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const rsp = await axiosInstance.get(
        `${BASE_URL}/v1/store/${storeInfo.id}/sales`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return rsp?.data;
    },
    enabled: Boolean(storeInfo?.id),
  });

  const { data: InventoryData = [], isLoading: isLoadingInventory } = useQuery({
    queryKey: [FETCH_INVENTORY, storeInfo?.id],
    queryFn: async () => {
      const token = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const rsp = await axiosInstance.get(
        `${BASE_URL}/v1/store/${storeInfo.id}/inventory`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return rsp?.data;
    },
    select: (data) => (Array.isArray(data) ? data : (data?.inventory ?? [])),
    enabled: Boolean(storeInfo?.id),
  });

  const inventoryNameById = useMemo(() => {
    return (InventoryData ?? []).reduce((acc, p) => {
      acc[p.id] = p.product_name;
      return acc;
    }, {});
  }, [InventoryData]);

  useEffect(() => {
    // Try common spots the backend might put it
    const raw =
      storeInfo?.user?.username ??
      storeInfo?.username ??
      storeInfo?.user?.first_name ??
      storeInfo?.owner_name ??
      storeInfo?.name ??
      "";
    const name = raw ? raw[0].toUpperCase() + raw.slice(1) : "";
    const justSignedUp = sessionStorage.getItem("justSignedUp");
    if (justSignedUp) {
      sessionStorage.removeItem("justSignedUp");
      setWelcome(`Welcome ${name}`);
    }
    setWelcome(`Welcome${name ? `,${name}` : ""}`);
  }, [storeInfo]);

  const restockCount = localStorage.getItem("storeRestockNeeded");
  const queryClient = useQueryClient();
  const salesStats = queryClient.getQueryData([FETCH_SALES_STATS]);

  // const displayName = useMemo(() => {
  //   const justSignedUp = sessionStorage.getItem("justSignedUp")
  //   if(justSignedUp) {
  //     sessionStorage.removeItem("justSignedUp")
  //     return "Welcome"
  //   }
  //   // Try common spots the backend might put it
  //   const raw =
  //     storeInfo?.user?.username ??
  //     storeInfo?.username ??
  //     storeInfo?.user?.first_name ??
  //     storeInfo?.owner_name ??
  //     storeInfo?.name ??
  //     "";

  //   // Capitalize first letter (optional)
  //   return raw ? raw[0].toUpperCase() + raw.slice(1) : "";
  // }, [storeInfo]);
  // console.log("name is:", displayName);

  const actionsLinks = [
    {
      id: 1,
      title: "Add a New Product ",
      icon: <Tag />,
      actionLink: "/inventory?action=add-product",
    },
    {
      id: 2,
      title: "Record New Sale",
      icon: <CurrencyCircleDollar />,
      actionLink: "/sales?action=record-sales",
    },
    {
      id: 3,
      title: "Invite Staff",
      icon: <ShareNetwork />,
      actionLink: "/staff?action=invite-staff",
    },
  ];

  const checkListItems = [
    {
      id: 1,
      title: "Add Your First Product",
    },
    {
      id: 2,
      title: "Record a Sale",
    },
    {
      id: 3,
      title: "Invite a Staff Member",
    },
    {
      id: 4,
      title: "Set Stock Alert Thresholds",
    },
    {
      id: 5,
      title: "Explore Sales Reports",
    },
    {
      id: 6,
      title: "Watch a Quick Tutorial",
    },
  ];

  const hasOnboarded = true;

  const totalRevenue = salesData.reduce(
    (sum, sale) => sum + sale.total_amount,
    0,
  );

  const totalProducts = InventoryData.reduce(
    (sum, p) => sum + (Number(p?.quantity) || 0),
    0,
  );

  const numberOfStaff = localStorage.getItem("no of staff");

  return (
    <>
      <h1 className="mb-3 text-2xl font-bold lg:text-3xl">{welcome}</h1>
      <p className="text-sm lg:text-base">
        Track your sales, manage inventory, and stay on top of your products
      </p>
      <section className="mt-6 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-10 lg:gap-4">
        <article className="rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5 lg:py-9 dark:border dark:bg-[#1e1e1e]">
          <h2 className="mb-6 text-lg font-bold">Business Overview</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <BusinessOverviewCard
              title="Total Products"
              count={totalProducts}
              icon={<Tag className="text-2xl text-[#4C518F]" />}
              color="#F2F3FD"
              border="#CACDF6"
              className="dark:text-black"
            />
            <BusinessOverviewCard
              title="Total Sales"
              count={
                salesStats?.total_sales ? ` ${salesStats?.total_sales}` : 0
              }
              icon={
                <CurrencyCircleDollar className="text-2xl text-[#038719]" />
              }
              color="#E6F3E8"
              border="#98CEA1"
            />
            <BusinessOverviewCard
              title="Restock Needed"
              count={restockCount}
              icon={<Warning className="text-2xl text-[#CCA300]" />}
              color="#FFF5CC"
              border="#FFD633"
            />
            <BusinessOverviewCard
              title="No. of Staff"
              count={numberOfStaff}
              icon={<User className="text-2xl text-[#C61010]" />}
              color="#F9E7E7"
              border="#E89D9D"
            />
          </div>
        </article>
        <article className="rounded-md bg-white p-4 shadow-xs lg:col-span-3 lg:px-5 lg:py-9 dark:border dark:bg-[#1e1e1e]">
          <h2 className="mb-6 text-lg font-bold">Quick Action</h2>
          <div className="flex flex-col gap-4">
            {actionsLinks.map((link) => (
              <Link
                key={link.id}
                to={link.actionLink}
                className="text-primary flex items-center justify-start gap-2 rounded-sm bg-[#F6F8FD] p-2 font-medium"
              >
                {link.icon} <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </article>
        {hasOnboarded ? (
          <article className="col-span-full rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9 dark:border dark:bg-[#1e1e1e]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Sales</h2>
              <Link to="/sales" className="text-sm text-[#767474]">
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-8">
              {(salesData ?? [])
                .slice()
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 6)
                .map((item) => {
                  const productLines = item?.items?.length ?? 0;
                  const amount = Number(item?.total_amount) || 0;
                  const currency = item?.currency || "₦";
                  const createdAt = item?.created_at
                    ? new Date(item.created_at)
                    : null;
                  const lineItems = (item?.items ?? []).map((it) => {
                    const qty = Number(it?.quantity) || 1;
                    const name =
                      it?.product?.product_name || // if backend expands product
                      it?.product_name || // if backend flattens name
                      inventoryNameById[it?.inventory_id] || // fallback to inventory lookup
                      "Item";
                    return `${qty} ${name}`;
                  });

                  const fullList = lineItems.join(", ");

                  return (
                    <div
                      key={item.id}
                      className="flex justify-between gap-2 lg:items-center"
                    >
                      <span className="inline-block aspect-square h-10 w-10 rounded-sm bg-[#CACDF6]"></span>

                      <div className="flex flex-1 flex-col items-start justify-start gap-2 lg:flex-row lg:justify-between">
                        <div>
                          <h4 className="mb-2 font-semibold">
                            {/* {productLines} {productLines === 1 ? "product" : "products"} */}
                            <span
                              className="block max-w-[360px] truncate"
                              title={fullList} // hover shows full content
                            >
                              {fullList || "No items"}
                            </span>
                          </h4>
                          {/* <p className="text-sm">Sold by: {item.created_by}</p> */}
                        </div>

                        <div className="">
                          <h4 className="mb-2 text-sm font-semibold lg:text-base">
                            {currency} {formatCurrency(amount)}
                          </h4>
                          <p className="text-sm">
                            {createdAt ? format(createdAt, "hh:mm:ss a") : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </article>
        ) : (
          <>
            <article className="rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5 lg:py-9">
              <h2 className="mb-6 text-lg font-bold">Quick Action</h2>
              <div className="flex flex-col gap-4">
                {checkListItems.map((link) => (
                  <div
                    key={link.id}
                    to={link.actionLink}
                    className="flex items-center justify-start gap-2 rounded-sm bg-[#FAFAFA] p-2 font-medium text-[#767474]"
                  >
                    <CheckCircle /> <span>{link.title}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-md bg-white p-4 shadow-xs lg:col-span-3 lg:px-5 lg:py-9">
              <h2 className="mb-6 text-lg font-bold">
                Watch how ReTaler works
              </h2>
              <img
                src="/assets/images/video-thumbnail.png"
                alt="video"
                className="mb-10 block w-full"
              />
              <Button className="w-full">Watch Video</Button>
            </article>
          </>
        )}
      </section>
      {(isLoadingInventory || isLoadingSales) && <PagePreLoader />}
    </>
  );
};

export default Dashboard;
