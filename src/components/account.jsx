import { useState, useEffect, useRef } from "react";
import { useUser } from "../context/user-context";
import { Button } from "./ui/button";
import { PencilSimple, X, Eye, EyeSlash } from "phosphor-react";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import * as yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TOKEN_IDENTIFIER, USER_INFO_KEY } from "@/constants";

const MODAL_TYPES = {
  DELETE_ACCOUNT: "DELETE_ACCOUNT",
};

const schema = yup.object({
  email: yup.string().email("Inavlid email").required("Email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "Minimum of 8 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[0-9]/, "At least one number")
    .matches(/[\W_]/, "At least one special character"),
});

export const Account = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    business: "",
  });
  const [storeData, setStoreData] = useState({
    name: "",
  });
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_IDENTIFIER);

    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.user_id || decoded.sub || decoded.id; // adjust as per your actual token

    // fetch all users
    axios.get("/v1/users/users/")
      .then((res) => {
        const currentUser = res.data.find((user) => user.id === userId);
        if (currentUser) {
          setUserData({
            username: currentUser.username,
            email: currentUser.email,
          });
        }
      })
      .catch((err) => console.error("Error fetching user", err));

    // fetch store info
    axios.get(`/v1/users/store/${userId}`)
      .then((res) => {
        const store = res.data[0]; // assuming it returns an array
        setStoreData({
          name: store.name,
          category: store.category,
          no_of_staff: store.no_of_staff,
        });
      })
      .catch((err) => console.error("Error fetching store", err));
  }, []);

  
  const [openModal, setOpenModal] = useState(false);
  const [openedModalType, setOpenedModalType] = useState(null);
  const [editedData, setEditedData] = useState(userData);
  const [isSaving, setIsSaving] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "currentpassword",
    new: "",
    confirm: "",
  });
  const [criteria, setCriteria] = useState({
    minChar: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const imageInputRef = useRef(null);
  const { avatar, setAvatar } = useUser();
  const [avatarPreview, setAvatarPreview] = useState(avatar);

  if (!editedData) {
  return <div className="p-4 text-gray-600">Loading account info...</div>;
}

  // Update password criteria when new password changes
  const handleNewPasswordChange = (value) => {
    setPasswords({ ...passwords, new: value });
    setCriteria({
      minChar: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[\W_]/.test(value),
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // simulate/save to backend
    setUserData(editedData);
    setAvatar(avatarPreview); // Only update context avatar on save
    setIsSaving(false);
    setEditedData(editedData); // ensures hasChanges is false, button returns to secondary
  };
  const hasProfileChanges =
    JSON.stringify(userData) !== JSON.stringify(editedData);
  const hasPasswordChanges = passwords.new && passwords.confirm;
  const passwordValid =
    passwords.new === passwords.confirm && passwords.new !== passwords.current;
  const hasAvatarChanged = avatarPreview !== avatar;
  const canSave =
    (hasProfileChanges ||
      hasAvatarChanged ||
      (hasPasswordChanges && passwordValid)) &&
    !isSaving;

  const handleToggleModal = (modalType) => {
    if (!modalType) {
      setOpenModal(false);
      setOpenedModalType(null);
      setSelectedUploadOption(null);
    } else {
      setOpenModal(true);
      setOpenedModalType(modalType);
    }
  };
  const handleDeleteAccount = () => {
    console.log("Account deleted");
    setOpenModal(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log("editedData before render:", editedData);
  console.log("userData before render:", userData);


  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-col">
        <h1 className="text-lg font-bold lg:text-2xl"> Account</h1>
        <section className="flex w-full flex-col gap-4 rounded-xl border bg-white px-4 py-4 md:w-[50vw] md:max-w-[50vw]">
          <section>
            <div className="mb-2 flex w-full flex-row items-center justify-between">
              <h2 className="text-md font-semibold">Personal Information</h2>
              <Button
                variant={canSave ? "default" : "secondary"}
                onClick={handleSave}
              >
                Edit Profile
              </Button>
            </div>
            <div className="flex flex-col">
              <div className="relative mb-4 h-20 w-20 rounded-full">
                <img
                  src={avatarPreview || "/assets/images/dummy-avatar.png"}
                  alt="Avatar"
                  className="h-20 w-20 rounded-full brightness-60"
                />
                <div>
                  <button
                    className="absolute inset-0 flex items-center justify-center hover:bg-gray-100"
                    onClick={() =>
                      imageInputRef.current && imageInputRef.current.click()
                    }
                    type="button"
                  >
                    <PencilSimple size={20} className="text-white" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    style={{ zIndex: 10 }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t border-b pt-4">
                <Input
                  label="Full Name"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  onFocus={(e) => e.target.select()}
                />
                <Input
                  label="Email Address"
                  value={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                  onFocus={(e) => e.target.select()}
                />
                <Input
                  label="Business Name"
                  value={editedData.business}
                  onChange={(e) =>
                    setEditedData({ ...editedData, business: e.target.value })
                  }
                  onFocus={(e) => e.target.select()}
                />
              </div>
            </div>
          </section>
          <section>
            <div className="mt-2 mb-2 flex w-full flex-row items-center justify-between">
              <h2 className="text-md font-semibold">Security & Password</h2>
            </div>
            <div className="flex flex-col gap-2 border-b pt-4">
              <div className="relative">
                <Input
                  label="Current Password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwords.current}
                  readOnly
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowCurrentPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showCurrentPassword ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <div className="relative flex flex-col">
                <Input
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  value={passwords.new}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => handleNewPasswordChange(e.target.value)}
                  placeholder="Enter new password"
                  className={`${passwords.new && passwords.new === passwords.current ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute top-8 right-2 text-gray-500"
                  onClick={() => setShowNewPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
                {passwords.new && passwords.new === passwords.current && (
                  <span className="text-xs text-red-500">
                    New password cannot be the same as current password
                  </span>
                )}
                {/* Password criteria checklist */}
                {passwords.new && (
                  <ul className="mt-2 mb-2 space-y-1 text-xs">
                    <li
                      className={
                        criteria.minChar ? "text-green-600" : "text-red-500"
                      }
                    >
                      {criteria.minChar ? "✅" : "❌"} Minimum of 8 characters
                    </li>
                    <li
                      className={
                        criteria.upper ? "text-green-600" : "text-red-500"
                      }
                    >
                      {criteria.upper ? "✅" : "❌"} 1 Uppercase letter (A-Z)
                    </li>
                    <li
                      className={
                        criteria.lower ? "text-green-600" : "text-red-500"
                      }
                    >
                      {criteria.lower ? "✅" : "❌"} 1 Lowercase letter (a-z)
                    </li>
                    <li
                      className={
                        criteria.number ? "text-green-600" : "text-red-500"
                      }
                    >
                      {criteria.number ? "✅" : "❌"} 1 number (0-9)
                    </li>
                    <li
                      className={
                        criteria.special ? "text-green-600" : "text-red-500"
                      }
                    >
                      {criteria.special ? "✅" : "❌"} 1 special character
                      (-@#$%&^_+=...?/)
                    </li>
                  </ul>
                )}
              </div>
              <div className="relative">
                <Input
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwords.confirm}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    setPasswords({ ...passwords, confirm: e.target.value });
                  }}
                  placeholder="Confirm new password"
                  className={` ${passwords.confirm && passwords.new !== passwords.confirm ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeSlash size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                {passwords.confirm && passwords.new !== passwords.confirm && (
                  <span className="text-xs text-red-500">
                    Passwords do not match
                  </span>
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="mt-2 mb-2 flex w-full flex-row items-center justify-between">
              <h2 className="text-md font-semibold">Danger Zone</h2>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleToggleModal(MODAL_TYPES.DELETE_ACCOUNT)}
            >
              Delete Account
            </Button>
          </section>

          {/* Delete Account Dialog */}
          {openModal && openedModalType === MODAL_TYPES.DELETE_ACCOUNT && (
            <Dialog open={openModal} onClose={() => handleToggleModal()}>
              <DialogContent
                className={"gap-2 sm:max-w-[90%] lg:max-w-[700px]"}
              >
                <DialogHeader>
                  <div className="mb-6 flex justify-end">
                    <button onClick={() => handleToggleModal()}>
                      <X />
                    </button>
                  </div>
                </DialogHeader>
                <h2 className="mb-2 text-center text-lg font-bold text-red-600">
                  Delete Your Account
                </h2>
                <p className="mb-4 text-center text-sm text-gray-700">
                  This will permanently erase all your data including products,
                  sales, staff, and backups. You won't be able to recover this
                  information.
                </p>
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => handleToggleModal()}
                    className="min-w-[120px] bg-gray-100 text-gray-700 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="min-w-[120px]"
                  >
                    Delete Account
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </section>
      </div>
    </>
  );
};
