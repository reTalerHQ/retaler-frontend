import { Link } from "react-router-dom";
import { CaretLeft, MagnifyingGlass, Funnel } from "phosphor-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddNewStaff = () => {
  return (
    <>
      <section>
        <div className="flex items-center gap-1">
          <Link to="/staff">
            <CaretLeft className="text-3xl" />
          </Link>
          <h1 className="text-xl font-bold lg:text-[28px]">Add New Staff</h1>
        </div>
        <section className="mt-10 rounded-md border border-[#EFEEEE] bg-white px-3 py-5 lg:mx-15 lg:px-8">
          <div className="">
            <h2 className="text-xl font-semibold text-[#373636]">
              Staff Information
            </h2>
            <form action="">
              <div className="mt-3">
                <label htmlFor="name">Full Name</label>
                <Input
                  type="text"
                  placeholder=" Enter staff's full name"
                  className="mt-1.5 bg-[#EFEEEE]"
                />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter valid email address"
                  className="mt-1.5 bg-[#EFEEEE]"
                />
              </div>
              <div>
                <label htmlFor="phone-number">Phone Number</label>
                <Input
                  type="phone"
                  placeholder="Enter phone number"
                  className="mt-1.5 bg-[#EFEEEE]"
                />
              </div>
              <section className="mt-5">
                <div>
                  <h2 className="text-xl font-semibold text-[#373636]">
                    Assign Roles
                  </h2>
                  <div className="mt-3 mb-3 rounded-md border border-[#EFEEEE] px-4 py-4 hover:border-[#3F3E3E]">
                    <h3 className="font-semibold">Sales Rep</h3>
                    <p>Manages sales for the store</p>
                  </div>
                  <div className="mb-3 rounded-md border border-[#EFEEEE] px-4 py-4 hover:border-[#3F3E3E]">
                    <h3 className="font-semibold">Inventory Manager</h3>
                    <p>Manage stock and inventory</p>
                  </div>
                  <div className="mb-4 rounded-md border border-[#EFEEEE] px-4 py-4 hover:border-[#3F3E3E]">
                    <h3 className="font-semibold">Manager</h3>
                    <p>Full store management access</p>
                  </div>

                  <Button className="w-full bg-[#BBBBBB] hover:bg-[#BBBBBB]">
                    <Link
                      to="/staff/create-staff-role"
                      className="flex flex-row gap-2 text-[#767474]"
                    >
                      <Plus /> Create Staff Role{" "}
                    </Link>
                  </Button>
                </div>
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
                    Add Staff
                  </button>
                </div>
              </section>
            </form>
          </div>
        </section>
      </section>
    </>
  );
};
export default AddNewStaff;
