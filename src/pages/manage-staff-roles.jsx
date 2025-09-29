import React, { useState } from "react";
import useRoleAccess from "../hooks/use-role-access";
import { Link } from "react-router-dom";
import { CaretLeft, MagnifyingGlass, Funnel } from "phosphor-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";
import StaffOptions from "../components/staff-options";
import { useQuery } from "@tanstack/react-query";
import { FETCH_STAFFS } from "@/constants/query-key";
import { useUser } from "@/context/user-context";
import debounce from "lodash.debounce";

const ManageStaffRoles = () => {
  useRoleAccess(["Manager", "Admin"]);
  const [, setSelectedStaffRoleIds] = useState([]);
  const [selectedField, setSelectedField] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  const filterObject = searchValue ? { [selectedField]: searchValue } : {};
  const { storeInfo } = useUser();
  const { data: staffs } = useQuery({
    queryKey: [FETCH_STAFFS, storeInfo?.id, filterObject],
    enabled: !!storeInfo?.id,
  });
  const staffList = staffs ? (Array.isArray(staffs) ? staffs : [staffs]) : [];

  const staffListFormated = staffList.map((s) => ({
    name: s.name || "--",
    role: s.role || "--",
  }));

  const handleSelectedField = (e) => {
    setSelectedField(e.target.value);
  };

  const handleInputValue = debounce((e) => {
    setSearchValue(e.target.value);
  }, 500);

  const columns = [
    {
      accessorKey: "name",
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
        const name = row.original.name;
        const role = row.original.role;
        return <StaffOptions name={name} role={role} />;
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
            <Button className="mt-5 w-full py-6">
              <Link to="/staff/all-roles-page" className="inline-flex gap-1.5">
                <Plus />
                View All Roles
              </Link>
            </Button>
          </div>
        </section>
        <section className="mt-8 rounded-2xl border border-[#EFEEEE] bg-white px-3 py-4 lg:p-4 lg:px-5 dark:border dark:bg-[#1e1e1e]">
          <div className="mt-3 flex flex-row justify-between gap-3 lg:flex-row">
            <h2 className="text-xl font-semibold">All Staff</h2>
            <div className="flex gap-2 lg:items-center">
              <button>
                <Funnel className="text-2xl" />
              </button>
              <Input
                showError={false}
                type="Search"
                onChange={handleInputValue}
                placeholder="Search"
                leftIcon={
                  <MagnifyingGlass className="text-sm text-[#BBBBBB]" />
                }
              />
              <select onChange={handleSelectedField}>
                <option value="name">Name</option>
                <option value="role">Role</option>
                {/* <option value="staff_status">Status</option> */}
              </select>
            </div>
          </div>
          <div className="mt-10">
            <DataTable
              columns={columns}
              data={staffListFormated}
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
