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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <BusinessOverviewCard
              title="Total Products"
              count={0}
              icon={<Tag className="text-2xl text-[#4C518F]" />}
              color="#CACDF6"
            />
            <BusinessOverviewCard
              title="Total Sales"
              count={0}
              icon={
                <CurrencyCircleDollar className="text-2xl text-[#038719]" />
              }
              color="#98CEA1"
            />
            <BusinessOverviewCard
              title="Total Products"
              count={0}
              icon={<Warning className="text-2xl text-[#CCA300]" />}
              color="#FFF5CC"
            />
            <BusinessOverviewCard
              title="No. of Staff"
              count={0}
              icon={<User className="text-2xl text-[#C61010]" />}
              color="#E89D9D"
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
          <h2 className="mb-6 text-lg font-bold">Watch how ReTaler works</h2>
          <img
            src="/assets/images/video-thumbnail.png"
            alt="video"
            className="mb-10 block w-full"
          />
          <Button className="w-full">Watch Video</Button>
        </article>
      </section>
    </>
  );
};

export default Dashboard;
