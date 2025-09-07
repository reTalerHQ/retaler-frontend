import { Link } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { FETCH_ROLES } from "@/constants/query-key";
import { TOKEN_IDENTIFIER } from "@/constants";
import { BASE_URL } from "@/constants/api";
import axiosInstance from "@/lib/axios";
import { useUser } from "@/context/user-context";
import RoleOptions from "./role-options";
// import { useQueryClient } from "@tanstack/react-query";

const AllRoles = () => {
  const { storeInfo } = useUser();

  const { isLoading, data: roles = [] } = useQuery({
    queryKey: [FETCH_ROLES],
    queryFn: async () => {
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      const rsp = await axiosInstance.get(
        `${BASE_URL}/v1/store/${storeInfo.id}/roles`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      );
      return rsp?.data?.data || [];
    },

    enabled: Boolean(storeInfo?.id),
    keepPreviousData: true,
  });

  const roleList = roles ? (Array.isArray(roles) ? roles : [roles]) : [];
  const roleListFormated = roleList.map((r) => ({
    name: r.name,
    description: r.description,
    id: r.id,
    store_id: r.store_id,
  }));

  console.log(roleListFormated);

  const columns = [
    {
      accessorKey: "name",
      header: "Role",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const id = row.original.id;

        return <RoleOptions id={id} />;
      },
    },
  ];

  return (
    <>
      <div className="flex items-center gap-1">
        <Link to="/staff/manage-staff-roles">
          <CaretLeft className="text-3xl" />
        </Link>
        <h1 className="text-xl font-bold lg:text-[28px]">View all Roles</h1>
      </div>
      <div className="mt-10">
        <DataTable
          columns={columns}
          data={roleListFormated}
          enableRowSelection
          // onSelectedRowsChange={setSelectedStaffIds}
          selectedRowClassName="bg-[#CACDF6]/30"
        />
      </div>
    </>
  );
};

export default AllRoles;
