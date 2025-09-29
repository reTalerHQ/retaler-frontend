import { Link } from "react-router-dom";
import { useState } from "react";
import { DeactivateStaff } from "./modals";
import { DeleteStaff } from "./modals";
import { useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsThreeVertical } from "phosphor-react";
const StaffOptions = ({ name, role, status, id }) => {
  const [options, setOptions] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const location = useLocation();

  return (
    <>
      {showDeactivateModal ? (
        <DeactivateStaff
          id={id}
          open={showDeactivateModal}
          onClose={() => setShowDeactivateModal(false)}
          role={role}
        />
      ) : null}
      {showDeleteModal ? (
        <DeleteStaff
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        />
      ) : null}

      <Popover>
        <PopoverTrigger asChild>
          <button
            className="cursor-pointer"
            onClick={() => setOptions(!options)}
          >
            <DotsThreeVertical size={32} />
          </button>
        </PopoverTrigger>
        {options ? (
          <PopoverContent className={"mr-10 max-w-[200px]"}>
            {/* <Link to={`${row.original.id}`}>View Details</Link> */}
            <button className="w-[10rem] rounded-sm py-3 hover:bg-[#375ED9]">
              <Link
                to={
                  location.pathname === "/staff"
                    ? "./staff-details"
                    : location.pathname.includes("manage-staff-roles")
                      ? "../staff-details"
                      : null
                }
                state={{ name, role, status, id }}
              >
                {/*className="px-6"*/}
                View Staff Details
              </Link>
            </button>
            <button
              onClick={() => setShowDeactivateModal(!showDeactivateModal)}
              className="w-[10rem] rounded-sm py-3 hover:bg-[#375ED9]"
            >
              Deactivate Staff
            </button>
            <button
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              className="w-[10rem] rounded-sm py-3 hover:bg-[#375ED9]"
            >
              Delete Staff
            </button>
          </PopoverContent>
        ) : (
          ""
        )}
      </Popover>
    </>
  );
};

export default StaffOptions;
