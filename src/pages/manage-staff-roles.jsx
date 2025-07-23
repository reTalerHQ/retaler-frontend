import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaretLeft, MagnifyingGlass, Funnel } from "phosphor-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";
import StaffOptions from "../components/staff-options";

const ManageStaffRoles = () => {
  const [selectedStaffRoleIds, setSelectedStaffRoleIds] = useState([]);

  const staff = [
    {
      id: 1,
      staffName: "John",
      role: "Manager",
    },
    {
      id: 2,
      staffName: "Boma Amaechi",
      role: "Sales Rep",
    },
    {
      id: 1,
      staffName: "Miriam",
      role: "Inventory Manager",
    },
    {
      id: 1,
      staffName: "Kunle",
      role: "Logistics",
    },
    {
      id: 1,
      staffName: "Amina Stores",
      role: "Owner",
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
  return (
    <>
      <section>
        <section className="flex flex-col md:flex-row md:justify-between">
          <div className="flex items-center gap-1">
            <Link to="/staff">
              <CaretLeft className="text-3xl" />
            </Link>
            <h1 className="text-xl font-bold lg:text-[28px]">Staff Roles</h1>
          </div>
          <div>
            <Button className="mt-5 w-full py-6">
              <Link
                to="/staff/create-staff-role"
                className="inline-flex gap-1.5"
              >
                <Plus />
                Create Staff Role
              </Link>
            </Button>
          </div>
        </section>
        <section className="mt-8 rounded-2xl border border-[#EFEEEE] bg-white px-3 py-4 lg:p-4 lg:px-5">
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
              onSelectedRowsChange={setSelectedStaffRoleIds}
              selectedRowClassName="bg-[#CACDF6]/30"
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default ManageStaffRoles;
