import { Dialog, DialogContent, DialogHeader } from "../components/ui/dialog";
import { Button } from "./ui/button";
import { X } from "phosphor-react";
import { useUser } from "@/context/user-context";
import { TOKEN_IDENTIFIER } from "@/constants";
import axiosInstance from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { FETCH_ROLES, FETCH_STAFFS } from "@/constants/query-key";

export const DeactivateStaff = ({ open, onClose, id }) => {
  const { storeInfo } = useUser();

  const queryClient = useQueryClient();
  const deactivateStaff = useMutation({
    mutationFn: async (staffId) => {
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      return axiosInstance.patch(
        `/v1/store/${storeInfo.id}/staff`,

        {
          staff_id: staffId,
          status: "inactive",
        },

        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_STAFFS] });
      onClose();
    },
  });
  if (!open) return null;

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-5 flex justify-end">
              <button onClick={() => onClose()}>
                <X />
              </button>
            </div>
            <h1 className="text-center text-2xl font-semibold lg:text-4xl">
              {" "}
              Deactivate Staff Account
            </h1>
          </DialogHeader>
          <p className="text-center font-normal">
            Deactivating this account will immediately revoke access to all
            systems and data. The staff member will no longer be able to log in,
            but their account data and work history will be preserved.
          </p>
          <div className="mx-0 my-auto flex items-center justify-center gap-6">
            <button
              onClick={() => onClose()}
              className="w-[9rem] cursor-pointer rounded-sm bg-[#EFEEEE] py-2 text-center"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deactivateStaff.mutate(id);
              }}
              className="w-[9rem] cursor-pointer rounded-sm bg-[#C61010] py-2 text-center"
            >
              Deactivate
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const DeleteStaff = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} className="">
        <DialogContent>
          <DialogHeader>
            <div className="mb-5 flex justify-end">
              <button onClick={() => onClose()}>
                <X />
              </button>
            </div>
            <h1 className="text-center text-2xl font-semibold lg:text-4xl">
              Delete Staff Account
            </h1>
          </DialogHeader>
          <p className="text-center font-normal">
            Permanently deleting this account will remove all associated data,
            including work history, permissions, and personal information. This
            action is irreversible.
          </p>
          <div className="mx-0 my-auto flex items-center justify-center gap-6">
            <button
              onClick={() => onClose()}
              className="w-[9rem] cursor-pointer rounded-sm bg-[#EFEEEE] py-2 text-center"
            >
              Cancel
            </button>
            <button className="w-[9rem] cursor-pointer rounded-sm bg-[#C61010] py-2 text-center">
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const ReactivateStaff = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} className="">
        <DialogContent>
          <DialogHeader>
            <div className="mb-5 flex justify-end">
              <button onClick={() => onClose()}>
                <X />
              </button>
            </div>
            <h1 className="text-center text-2xl font-semibold lg:text-4xl">
              Reactivate Staff Account
            </h1>
          </DialogHeader>
          <p className="text-center font-normal">
            This account is currently deactivated, reactivating will restore
            full system access and permissions for this staff member.
          </p>
          <div className="mx-0 my-auto flex items-center justify-center gap-6">
            <button
              onClick={() => onClose()}
              className="w-[9rem] cursor-pointer rounded-sm bg-[#EFEEEE] py-2 text-center"
            >
              Cancel
            </button>
            <button className="w-[9rem] cursor-pointer rounded-sm bg-[#375ED9] py-2 text-center">
              Reactivate
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const DeleteRole = ({ open, onClose, id }) => {
  const { storeInfo } = useUser();

  const queryClient = useQueryClient();
  const deleteRole = useMutation({
    mutationFn: async () => {
      const tokenFromStorage = sessionStorage.getItem(TOKEN_IDENTIFIER);
      return axiosInstance.delete(
        `/v1/store/${storeInfo.id}/roles/${id}`,

        {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_ROLES] });
      onClose();
    },
  });
  if (!open) return null;

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-5 flex justify-end">
              <button onClick={() => onClose()}>
                <X />
              </button>
            </div>
            <h1 className="text-center text-2xl font-semibold lg:text-4xl">
              {" "}
              Delete Role
            </h1>
          </DialogHeader>
          <p className="text-center font-normal">
            Deleting this role means it will no longer exist in your List of
            roles
          </p>
          <div className="mx-0 my-auto flex items-center justify-center gap-6">
            <button
              onClick={() => onClose()}
              className="w-[9rem] cursor-pointer rounded-sm bg-[#EFEEEE] py-2 text-center"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteRole.mutate(id);
              }}
              className="w-[9rem] cursor-pointer rounded-sm bg-[#C61010] py-2 text-center"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
