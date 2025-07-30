import { Link } from "react-router-dom";
import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";
import { DeactivateStaff } from "./modals";
import { DeleteStaff } from "./modals";
import { useLocation } from "react-router-dom";

const StaffOptions = ({ staffName, role, status }) => {
  const [options, setOptions] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const location = useLocation();

  return (
    <>
      {showDeactivateModal ? (
        <DeactivateStaff
          open={showDeactivateModal}
          onClose={() => setShowDeactivateModal(false)}
        />
      ) : null}
      {showDeleteModal ? (
        <DeleteStaff
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        />
      ) : null}
      <button>
        <EllipsisVerticalIcon
          className=""
          onClick={() => setOptions(!options)}
        />
      </button>

      {options ? (
        <section className="relative z-50 overflow-visible">
          <div className="absolute right-10.5 z-50 flex flex-col rounded-xl border border-[#EFEEEE] bg-[#eeecec] py-4 hover:opacity-100">
            <div className="flex flex-col gap-1 px-4">
              <button className="w-[12rem] rounded-sm py-3 hover:bg-[#375ED9]">
                <Link
                  to={
                    location.pathname === "/staff"
                      ? "./staff-details"
                      : location.pathname.includes("manage-staff-roles")
                        ? "../staff-details"
                        : null
                  }
                  state={{ staffName, role, status }}
                >
                  View Staff Details
                </Link>
              </button>
              <button
                onClick={() => setShowDeactivateModal(!showDeactivateModal)}
                className="w-[12rem] rounded-sm py-3 hover:bg-[#375ED9]"
              >
                Deactivate Staff
              </button>
              <button
                onClick={() => setShowDeleteModal(!showDeleteModal)}
                className="w-[12rem] rounded-sm py-3 hover:bg-[#375ED9]"
              >
                Delete Staff
              </button>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default StaffOptions;
