import { useState } from "react";
import { Link } from "react-router-dom";
// import { EllipsisVerticalIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsThreeVertical } from "phosphor-react";
import { DeleteRole } from "@/components/modals";

const RoleOptions = ({ id }) => {
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
          <PopoverContent className={"mr-6 w-[150px] px-5"}>
            <button
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              className="cursor-pointer"
              // className="w-[10rem] rounded-sm py-3 hover:bg-[#375ED9]"
            >
              Delete Role
            </button>
          </PopoverContent>
        ) : (
          ""
        )}
      </Popover>
    </>
  );
};

export default RoleOptions;
