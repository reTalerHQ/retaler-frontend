import { Link } from "react-router-dom";
import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";
import { DeleteRole } from "@/components/modals";

const RoleOptions = ({id}) => {
      const [options, setOptions] = useState(false);
        const [showDeleteModal, setShowDeleteModal] = useState(false);
    return (
        <>
        {showDeleteModal ? (
                <DeleteRole 
                 id={id}
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
                <button
                onClick={() => setShowDeleteModal(!showDeleteModal)}
                className="w-[10rem] rounded-sm py-3 hover:bg-[#375ED9]"
              >
                Delete Role
              </button> ) : ""
              }
        </>
    )
}

export default RoleOptions;