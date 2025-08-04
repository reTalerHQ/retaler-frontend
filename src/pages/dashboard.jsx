import React from "react";
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
import { format } from "date-fns";
import { useUser } from "@/context/user-context";

const Dashboard = () => {
  const actionsLinks = [
    {
      id: 1,
      title: "Add a New Product ",
      icon: <Tag />,
      actionLink: "/products?action=add-product",
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

  const soldItems = [
    {
      id: 1,
      name: "Garri",
      date: new Date("2025-07-10"),
      soldBy: "Chinedu Okafor",
      imgurl: "https://example.com/images/garri.jpg",
      price: 1200,
      currency: "NGN",
    },
    {
      id: 2,
      name: "Yam Tubers",
      date: new Date("2025-07-09"),
      soldBy: "Amina Musa",
      imgurl: "https://example.com/images/yam.jpg",
      price: 3500,
      currency: "NGN",
    },
    {
      id: 3,
      name: "Palm Oil",
      date: new Date("2025-07-08"),
      soldBy: "Ifeanyi Nwosu",
      imgurl: "https://example.com/images/palm-oil.jpg",
      price: 2500,
      currency: "NGN",
    },
    {
      id: 4,
      name: "Ogbono Seeds",
      date: new Date("2025-07-11"),
      soldBy: "Ngozi Umeh",
      imgurl: "https://example.com/images/ogbono.jpg",
      price: 1800,
      currency: "NGN",
    },
    {
      id: 5,
      name: "Crayfish",
      date: new Date("2025-07-07"),
      soldBy: "Tunde Balogun",
      imgurl: "https://example.com/images/crayfish.jpg",
      price: 900,
      currency: "NGN",
    },
    {
      id: 6,
      name: "Beans",
      date: new Date("2025-07-12"),
      soldBy: "Kemi Adebayo",
      imgurl: "https://example.com/images/beans.jpg",
      price: 1500,
      currency: "NGN",
    },
    {
      id: 7,
      name: "Pepper",
      date: new Date("2025-07-13"),
      soldBy: "Sani Abdullahi",
      imgurl: "https://example.com/images/pepper.jpg",
      price: 600,
      currency: "NGN",
    },
  ];
  const hasOnboarded = true;

  const { storeInfo } = useUser();

  console.log({ storeInfo });

  return (
    <>
      <h1 className="mb-3 text-2xl font-bold lg:text-3xl">
        Welcome back, Amina
      </h1>
      <p className="text-sm lg:text-base">
        Track your sales, manage inventory, and stay on top of your products
      </p>
      <section className="mt-6 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-10 lg:gap-4">
        <article className="rounded-md bg-white p-4 shadow-xs lg:col-span-7 lg:px-5 lg:py-9">
          <h2 className="mb-6 text-lg font-bold">Business Overview</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <BusinessOverviewCard
              title="Total Products"
              count={0}
              icon={<Tag className="text-2xl text-[#4C518F]" />}
              color="#F2F3FD"
              border="#CACDF6"
            />
            <BusinessOverviewCard
              title="Total Sales"
              count={0}
              icon={
                <CurrencyCircleDollar className="text-2xl text-[#038719]" />
              }
              color="#E6F3E8"
              border="#98CEA1"
            />
            <BusinessOverviewCard
              title="Total Products"
              count={0}
              icon={<Warning className="text-2xl text-[#CCA300]" />}
              color="#FFF5CC"
              border="#FFD633"
            />
            <BusinessOverviewCard
              title="No. of Staff"
              count={0}
              icon={<User className="text-2xl text-[#C61010]" />}
              color="#F9E7E7"
              border="#E89D9D"
            />
          </div>
        </article>
        <article className="rounded-md bg-white p-4 shadow-xs lg:col-span-3 lg:px-5 lg:py-9">
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
          <article className="col-span-full rounded-md bg-white p-4 shadow-xs lg:px-5 lg:py-9">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Sales</h2>
              <Link to="/sales" className="text-sm text-[#767474]">
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-8">
              {soldItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-2 lg:items-center"
                >
                  <span className="inline-block aspect-square h-10 w-10 rounded-sm bg-[#CACDF6]"></span>
                  <div className="flex flex-1 flex-col items-start justify-start gap-2 lg:flex-row lg:justify-between">
                    <div>
                      <h4 className="mb-2 font-semibold">{item.name}</h4>
                      <p className="text-sm">Sold by: {item.soldBy}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold lg:text-base">
                        {item.currency} {item.price}
                      </h4>
                      <p className="text-sm">
                        {format(item.date, "hh:mm:ss a")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
    </>
  );
};

export default Dashboard;
