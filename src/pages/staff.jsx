import React, { useState } from "react";
import { FilterIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Funnel, MagnifyingGlass, FolderSimple, User } from "phosphor-react";
import { DataTable } from "@/components/data-table";
import StaffOptions from "../components/staff-options";

const Staff = () => {
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const staff = [
    {
      id: 1,
      staffName: "John",
      role: "Manager",
      status: "Online",
      loginTime: "9:00 AM",
      logoutTime: "5:00 PM",
    },
    {
      id: 2,
      staffName: "Boma Amaechi",
      role: "Sales Rep",
      status: "Online",
      loginTime: "9:00 AM",
      logoutTime: "5:00 PM",
    },
    {
      id: 1,
      staffName: "Miriam",
      role: "Inventory Manager",
      status: "Offline",
      loginTime: "9:00 AM",
      logoutTime: "5:00 PM",
    },
    {
      id: 1,
      staffName: "Kunle",
      role: "Logistics",
      status: "Offline",
      loginTime: "9:00 AM",
      logoutTime: "5:00 PM",
    },
    {
      id: 1,
      staffName: "Amina Stores",
      role: "Owner",
      status: "Online",
      loginTime: "8:00 AM",
      logoutTime: "5:00 PM",
    },
  ];

  const columns = [
    {
      accessorKey: "staffName",
      header: "Staff Name",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue();
        const online = value?.toLowerCase() === "online";
        return (
          <span className={online ? "text-green-600" : "text-black-600"}>
            {value}
          </span>
        );
      },
    },
    {
      accessorKey: "loginTime",
      header: "Login Time",
    },
    {
      accessorKey: "logoutTime",
      header: "Logout Time",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const name = row.original.staffName;
        const role = row.original.role;
        const status = row.original.status;
        return <StaffOptions staffName={name} role={role} status={status} />;
      },
    },
  ];

  const hasAddedStaff = true;

  return (
    <>
      <section>
        <section className="flex flex-col md:flex-row md:justify-between">
          <h1 className="mb-3 text-xl font-bold lg:text-3xl">Staff</h1>
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <Button className="bg-[#EFEEEE] hover:bg-[#EFEEEE]">
              <Link
                to="/invite-staff"
                className="inline-flex gap-1.5 text-black"
              >
                <Share2Icon /> Invite staff
              </Link>
            </Button>
            <Button className="bg-[#EFEEEE] hover:bg-[#EFEEEE]">
              <Link
                to="/staff/manage-staff-roles"
                className="inline-flex gap-1.5 text-black"
              >
                <User /> Manage Staff Roles
              </Link>
            </Button>
            <Button>
              <Link to="/staff/add-new-staff" className="inline-flex gap-1.5">
                <Plus />
                Add New Staff
              </Link>
            </Button>
          </div>
        </section>

        {hasAddedStaff ? (
          <section className="mt-8 rounded-2xl border border-[#EFEEEE] bg-white lg:p-4 lg:px-5">
            <div className="mt-3 flex flex-row justify-between gap-3 lg:flex-row">
              <h2 className="text-xl font-semibold">All Staff</h2>
              <div className="flex gap-2 lg:items-center">
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
            <div className="mt-10">
              <DataTable
                columns={columns}
                data={staff}
                enableRowSelection
                onSelectedRowsChange={setSelectedStaffIds}
                selectedRowClassName="bg-[#CACDF6]/30"
              />
            </div>
          </section>
        ) : (
          <section>
            <section className="mt-8 rounded-2xl border border-[#EFEEEE] bg-white lg:p-4 lg:px-5">
              <div className="mt-3 flex flex-row justify-between gap-3 lg:flex-row">
                <h2 className="text-xl font-semibold">All Staff</h2>
                <div className="flex gap-2 lg:items-center">
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
            </section>
            <section className="mt-13 flex flex-col items-center justify-center">
              <div className="flex h-15 w-15 items-center justify-center rounded-full bg-[#F6F8FD]">
                <FolderSimple className="text-3xl text-[#375ED9]" />
              </div>
              <div className="mt-3 text-xl font-semibold text-black">
                No Staff Added
              </div>
              <p className="mt-2 text-[14px] font-normal text-black">
                Invite or Add New Staff to assist with sales and inventory
              </p>
              <div className="mt-7 flex flex-col gap-4 md:flex-row md:gap-9">
                <Button className="bg-[#EFEEEE] hover:bg-[#EFEEEE]">
                  <Link
                    to="/invite-staff"
                    className="inline-flex gap-1.5 text-black"
                  >
                    <Share2Icon /> Invite staff
                  </Link>
                </Button>
                <Button>
                  <Plus />
                  Add New Staff
                </Button>
              </div>
            </section>
          </section>
        )}
      </section>
    </>
  );
};

export default Staff;
