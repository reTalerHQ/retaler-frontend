import { Link } from "react-router-dom";
import useRoleAccess from "../hooks/use-role-access";
import { CaretLeft, MagnifyingGlass, Funnel } from "phosphor-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@/context/user-context";
import axios from "axios";
import { toast } from "sonner";
import { TOKEN_IDENTIFIER } from "@/constants";
import { BASE_URL } from "@/constants/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FETCH_PERMISSIONS } from "@/constants/query-key";
import { Description } from "@radix-ui/react-dialog";
import { useState } from "react";
// import React, { useState } from "react";
// import { SketchPicker } from 'react-color';
// import { BlockPicker, CompactPicker, CirclePicker } from 'react-color'; // Example from react-color
// import { HexColorPicker } from 'react-colorful'; // Example from react-colorful

const CreateStaffRole = () => {
  useRoleAccess(["Manager", "Admin"]);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [rolePermission, setRolePermission] = useState([]);
  //      const [color, setColor] = useState({ hex: '#ffffff' });

  //   const handleColorChange = (newColor) => {
  //     setColor(newColor.hex || newColor);
  //   };
  {
    /* <div>
 <div>
  <HexColorPicker color={color} onChange={handleColorChange} />
  <BlockPicker color={color} onChange={handleColorChange} />
  <div style={{ backgroundColor: color, width: '50px', height: '50px' }}></div>
</div>
</div> */
  }

  const inventory = [
    "View All Products",
    "Add New Products",
    "Edit Product Details",
    "Delete Products",
  ];

  const sales = [
    "View All Sales",
    "Record New Sales",
    "Edit Sales Record",
    "Delete Sales",
  ];

  const analytics = ["View Analytics", "Export Reports"];

  const management = [
    "View Staff List",
    "Invite New Staff",
    "Edit Staff Details",
    "Manage Staff Roles",
  ];

  const { storeInfo } = useUser();

  const createRole = async (roleData) => {
    const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
    return await axios.post(
      `${BASE_URL}/v1/store/${storeInfo.id}/roles`,
      {
        name: roleData.name,
        description: roleData.description,
        permissions: roleData.permissions,
        store_id: storeInfo.id,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      },
    );
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["role"]);
      toast.success("Role created successfully")
      setRoleName("");
      setRoleDescription("");
      setRolePermission([]);
    },
    onError: (error) => {
      console.error("failed to create role:", error);
      
      alert("Failed to create role")
    }
  });

  const handleSwitch = (permission) => {
    setRolePermission((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission],
    );
  };

  return (
    <>
      <section>
        <div className="flex items-center gap-1">
          <Link to="/staff/manage-staff-roles">
            <CaretLeft className="text-3xl" />
          </Link>
          <h1 className="text-xl font-bold lg:text-[28px]">
            Create New Staff Role
          </h1>
        </div>
        <section className="mt-8 w-full rounded-md lg:mx-15 lg:w-[900px] lg:px-8 lg:py-5">
          <h2 className="text-xl font-semibold text-[#373636]">
            Staff Role Details
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              
              mutation.mutate({
                name: roleName,
                description: roleDescription,
                permissions: rolePermission,
              });
            }}
          >
            <div className="mt-3">
              <label htmlFor="role-name">Role Name</label>
              <Input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="e.g Sales Associate"
                className="mt-1.5 bg-[#EFEEEE] dark:bg-[#1e1e1e]"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="role-description">Description</label>
              <Input
                type="text"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Enter role description"
                className="mt-1.5 bg-[#EFEEEE] dark:bg-[#1e1e1e]"
              />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold">Role Color</h2>
            </div>
            <section className="mt-5">
              <h2 className="mb-2 text-xl font-semibold">Permissions</h2>
              <div className="">
                <div className="mb-3 rounded-sm border border-[#EFEEEE] bg-white px-5 py-5 dark:bg-[#1e1e1e]">
                  <h3 className="mb-2 text-[16px] font-semibold">Inventory</h3>

                  {inventory.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 flex list-none justify-between"
                    >
                      {item}
                      <Switch
                        checked={rolePermission.includes(item)}
                        onCheckedChange={() => handleSwitch(item)}
                      />
                    </li>
                  ))}
                </div>
                <div className="mb-3 rounded-sm border border-[#EFEEEE] bg-white px-5 py-5 dark:bg-[#1e1e1e]">
                  <h3 className="mb-2 text-[16px] font-semibold">
                    Sales Operations
                  </h3>
                  {sales.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 flex list-none justify-between"
                    >
                      {item}
                      <Switch
                        checked={rolePermission.includes(item)}
                        onCheckedChange={() => handleSwitch(item)}
                      />
                    </li>
                  ))}
                </div>
                <div className="mb-3 rounded-sm border border-[#EFEEEE] bg-white px-5 py-5 dark:bg-[#1e1e1e]">
                  <h3 className="mb-2 text-[16px] font-semibold">
                    Analytics and reports
                  </h3>
                  {analytics.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 flex list-none justify-between"
                    >
                      {item}
                      <Switch
                        checked={rolePermission.includes(item)}
                        onCheckedChange={() => handleSwitch(item)}
                      />
                    </li>
                  ))}
                </div>
                <div className="mb-3 w-full rounded-sm border border-[#EFEEEE] bg-white px-5 py-5 dark:bg-[#1e1e1e]">
                  <h3 className="mb-2 text-[16px] font-semibold">
                    Staff Management
                  </h3>
                  {management.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 flex list-none justify-between"
                    >
                      {item}
                      <Switch
                        checked={rolePermission.includes(item)}
                        onCheckedChange={() => handleSwitch(item)}
                      />
                    </li>
                  ))}
                </div>
              </div>
            </section>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="cursor-pointer rounded-md bg-[#EFEEEE] px-5 py-3 text-[#767474] dark:bg-[#1e1e1e]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="cursor-pointer rounded-md bg-[#375ED9] px-8 py-3 text-white"
            >
              {mutation.isPending ? "Creating Role..." : "Create Role"}
            </button>
          </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default CreateStaffRole;
