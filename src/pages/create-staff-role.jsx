import { Link } from "react-router-dom";
import { CaretLeft, MagnifyingGlass, Funnel } from "phosphor-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
// import React, { useState } from "react";
// import { SketchPicker } from 'react-color';
// import { BlockPicker, CompactPicker, CirclePicker } from 'react-color'; // Example from react-color
// import { HexColorPicker } from 'react-colorful'; // Example from react-colorful

const CreateStaffRole = () => {
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
    "View All Prodeucts",
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
          <form action="">
            <div className="mt-3">
              <label htmlFor="role-name">Role Name</label>
              <Input
                type="text"
                placeholder="e.g Sales Associate"
                className="mt-1.5 bg-[#EFEEEE]"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="role-description">Description</label>
              <Input
                type="text"
                placeholder="Enter role description"
                className="mt-1.5 bg-[#EFEEEE]"
              />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold">Role Color</h2>
            </div>
            <section className="mt-5">
              <h2 className="mb-2 text-xl font-semibold">Permissions</h2>
              <div className="">
                <div className="mb-3 rounded-sm border border-[#EFEEEE] bg-white px-5 py-5">
                  <h3 className="mb-2 text-[16px] font-semibold">Inventory</h3>

                  {inventory.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 flex list-none justify-between"
                    >
                      {item}
                      <Switch />
                    </li>
                  ))}
                </div>
                <div className="mb-3 rounded-sm border border-[#EFEEEE] bg-white px-5 py-5">
                  <h3 className="mb-2 text-[16px] font-semibold">
                    Sales Operations
                  </h3>
                  {sales.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 flex list-none justify-between"
                    >
                      {item}
                      <Switch />
                    </li>
                  ))}
                </div>
                <div className="mb-3 rounded-sm border border-[#EFEEEE] bg-white px-5 py-5">
                  <h3 className="mb-2 text-[16px] font-semibold">
                    Analytics and reports
                  </h3>
                  {analytics.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 flex list-none justify-between"
                    >
                      {item}
                      <Switch />
                    </li>
                  ))}
                </div>
                <div className="mb-3 w-full rounded-sm border border-[#EFEEEE] bg-white px-5 py-5">
                  <h3 className="mb-2 text-[16px] font-semibold">
                    Staff Management
                  </h3>
                  {management.map((item, index) => (
                    <li
                      key={index}
                      className="mb-3 flex list-none justify-between"
                    >
                      {item}
                      <Switch />
                    </li>
                  ))}
                </div>
              </div>
            </section>
          </form>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="rounded-md bg-[#EFEEEE] px-5 py-3 text-[#767474]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#375ED9] px-8 py-3 text-white"
            >
              Create Role
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default CreateStaffRole;
