import React, { useEffect, useState } from "react";
import useRoleAccess from "../hooks/use-role-access";
import { FilterIcon, Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Funnel, MagnifyingGlass, FolderSimple, User } from "phosphor-react";
import { DataTable } from "@/components/data-table";
import StaffOptions from "../components/staff-options";
import { useUser } from "@/context/user-context";
import { useQuery } from "@tanstack/react-query";
import { FETCH_STAFFS } from "@/constants/query-key";
import debounce from "lodash.debounce";

const Staff = () => {
  useRoleAccess(["Manager", "Admin"]);
  const [, setSelecteds] = useState([]);
  const [selectedField, setSelectedField] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  const filterObject = searchValue ? { [selectedField]: searchValue } : {};

  const { storeInfo } = useUser();
  // This uses a default queryfn from main.jsx
  const { isLoading: isLoadingStaffs, data: staffs } = useQuery({
    queryKey: [FETCH_STAFFS, storeInfo?.id, filterObject],
    enabled: !!storeInfo?.id,
  });

  // confirms if staffList is an array
  const staffList = staffs ? (Array.isArray(staffs) ? staffs : [staffs]) : [];

  const staffListFormated = staffList.map((s) => ({
    name: s.name || "--",
    role: s.role || "--",
    id: s.id || "--",
    staff_status: s.status || "--",
    login_time: s.login_time || "--",
    logout_time: s.logout_time || "--",
  }));

  const no_of_staff = localStorage.setItem('no of staff', staffListFormated.length)
  console.log('no of staffs', no_of_staff);
  
  
// console.log(staffList[0].id);

  console.log(staffListFormated[0]);
  

  useEffect(() => {
    if (staffListFormated.length > 0 && staffListFormated[0].id) {
      localStorage.setItem("staffId", staffListFormated[0].id)
    }
  }, [staffListFormated])

  // const staffId = staffListFormated[0].id
  // localStorage.setItem("staffId", staffId)

  const handleSelectedField = (e) => {
    setSelectedField(e.target.value);
  };

  const handleInputValue = debounce((e) => {
    setSearchValue(e.target.value);
  }, 500);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "staff_status",
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
      accessorKey: "login_time",
      header: "Login Time",
    },
    {
      accessorKey: "logout_time",
      header: "Logout Time",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const name = row.original.name;
        const role = row.original.role;
        const status = row.original.staff_status;
        const id = row.original.id;
        return <StaffOptions name={name} role={role} status={status} id={id} />;
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
            <Button className="bg-[#EFEEEE] hover:bg-[#EFEEEE] dark:bg-[#383838]">
              <Link
                to="/invite-staff"
                className="inline-flex gap-1.5 text-black dark:text-white"
              >
                <Share2Icon /> Invite staff
              </Link>
            </Button>
            <Button className="bg-[#EFEEEE] hover:bg-[#EFEEEE] dark:bg-[#383838]">
              <Link
                to="/staff/manage-staff-roles"
                className="inline-flex gap-1.5 text-black dark:text-white"
                state={{
                  name: staffListFormated.name,
                  role: staffListFormated.role,
                }}
              >
                <User /> Manage Staff Roles
              </Link>
            </Button>
            <Button className="dark:bg-[#365ed8]">
              <Link
                to="/staff/add-new-staff"
                className="inline-flex gap-1.5 dark:text-white"
              >
                <Plus />
                Add New Staff
              </Link>
            </Button>
          </div>
        </section>

        {hasAddedStaff ? (
          <section className="mt-8 rounded-sm border border-[#EFEEEE] bg-white lg:p-4 lg:px-5 dark:border dark:bg-[var(--background)]">
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
                  onChange={handleInputValue}
                  leftIcon={
                    <MagnifyingGlass className="text-sm text-[#BBBBBB]" />
                  }
                />
                <select onChange={handleSelectedField}>
                  <option value="name">Name</option>
                  <option value="role">Role</option>
                  <option value="staff_status">Status</option>
                </select>
              </div>
            </div>
            <div className="mt-10">
              <DataTable
                columns={columns}
                data={staffListFormated}
                enableRowSelection
                // onSelectedRowsChange={setSelectedStaffIds}
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
