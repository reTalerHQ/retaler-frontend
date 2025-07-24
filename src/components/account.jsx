import { useState, useRef } from "react";
import { useUser } from "../context/UserContext.jsx";
import { Button } from "./ui/button"
import { PencilSimple, X, Eye, EyeSlash } from "phosphor-react";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import * as yup from "yup";

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
        name: "Temi",
        email: "temi@email.com",
        business: "ReTaler",
    });
    const [openModal, setOpenModal] = useState(false);
    const [openedModalType, setOpenedModalType] = useState(null);
    const [editedData, setEditedData] = useState(userData);
    const [isSaving, setIsSaving] = useState(false);
    const [passwords, setPasswords] = useState({
        current: "currentpassword",
        new: "",
        confirm: ""
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
    const hasProfileChanges = JSON.stringify(userData) !== JSON.stringify(editedData);
    const hasPasswordChanges = passwords.new && passwords.confirm;
    const passwordValid = passwords.new === passwords.confirm && passwords.new !== passwords.current;
    const hasAvatarChanged = avatarPreview !== avatar;
    const canSave = ((hasProfileChanges || hasAvatarChanged || (hasPasswordChanges && passwordValid)) && !isSaving);

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
    return (
        <>
            <div className="flex flex-col justify-between gap-3 lg:flex-col">
                <h1 className="text-lg font-bold lg:text-2xl"> Account</h1>
                <section className="flex flex-col gap-4 rounded-xl border bg-white px-4 py-4 w-full md:max-w-[50vw] md:w-[50vw]">
                    <section>
                        <div className="flex flex-row justify-between items-center w-full mb-2">
                            <h2 className="font-semibold text-md">Personal Information</h2>
                            <Button
                                variant={canSave ? 'default' : 'secondary'}
                                onClick={handleSave}
                            >
                                Edit Profile
                            </Button>
                        </div>
                        <div className=" flex flex-col">
                            <div className="relative h-20 w-20 mb-4 rounded-full">
                                <img 
                                    src={avatarPreview || "/assets/images/dummy-avatar.png"}
                                    alt="Avatar"
                                    className="h-20 w-20 rounded-full brightness-60"
                                />
                                <div>
                                    <button
                                      className="absolute inset-0 flex justify-center items-center hover:bg-gray-100"
                                      onClick={() => imageInputRef.current && imageInputRef.current.click()}
                                      type="button"
                                    >
                                      <PencilSimple size={20} className="text-white " />
                                    </button>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      ref={imageInputRef}
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                      style={{ zIndex: 10 }}
                                      onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <div className="border-t border-b  pt-4 flex flex-col gap-2">
                                <Input 
                                    label="Full Name" 
                                    value={editedData.name}
                                    onChange={e => setEditedData({ ...editedData, name: e.target.value })}
                                    onFocus={e => e.target.select()}
                                />
                                <Input
                                    label="Email Address"
                                    value={editedData.email}
                                    onChange={e => setEditedData({ ...editedData, email: e.target.value })}
                                    onFocus={e => e.target.select()}
                                />
                                <Input
                                    label="Business Name"
                                    value={editedData.business}
                                    onChange={e => setEditedData({ ...editedData, business: e.target.value })}
                                    onFocus={e => e.target.select()}
                                />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="flex flex-row justify-between items-center w-full mt-2 mb-2">
                            <h2 className="font-semibold text-md">Security & Password</h2>
                        </div>
                        <div className="border-b pt-4 flex flex-col gap-2">
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
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowCurrentPassword(v => !v)}
                                    tabIndex={-1}
                                >
                                    {showCurrentPassword ? <EyeSlash size={20}/> : <Eye size={20}/>} 
                                </button>
                            </div>
                            <div className="flex flex-col relative">
                                <Input
                                    label="New Password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={passwords.new}
                                    onFocus={e => e.target.select()}
                                    onChange={e => handleNewPasswordChange(e.target.value)}
                                    placeholder="Enter new password"
                                    className={`${passwords.new && passwords.new === passwords.current ? "border-red-500" : ""}`}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-8 text-gray-500"
                                    onClick={() => setShowNewPassword(v => !v)}
                                    tabIndex={-1}
                                >
                                    {showNewPassword ? <EyeSlash size={20}/> : <Eye size={20}/>} 
                                </button>
                                {passwords.new && passwords.new === passwords.current && (
                                    <span className="text-red-500 text-xs">New password cannot be the same as current password</span>
                                )}
                                {/* Password criteria checklist */}
                                {passwords.new && (
                                    <ul className="mt-2 mb-2 space-y-1 text-xs">
                                        <li className={criteria.minChar ? "text-green-600" : "text-red-500"}>
                                            {criteria.minChar ? "✅" : "❌"} Minimum of 8 characters
                                        </li>
                                        <li className={criteria.upper ? "text-green-600" : "text-red-500"}>
                                            {criteria.upper ? "✅" : "❌"} 1 Uppercase letter (A-Z)
                                        </li>
                                        <li className={criteria.lower ? "text-green-600" : "text-red-500"}>
                                            {criteria.lower ? "✅" : "❌"} 1 Lowercase letter (a-z)
                                        </li>
                                        <li className={criteria.number ? "text-green-600" : "text-red-500"}>
                                            {criteria.number ? "✅" : "❌"} 1 number (0-9)
                                        </li>
                                        <li className={criteria.special ? "text-green-600" : "text-red-500"}>
                                            {criteria.special ? "✅" : "❌"} 1 special character (-@#$%&^_+=...?/)
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <div className="relative">
                                <Input
                                    label="Confirm New Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={passwords.confirm}
                                    onFocus={e => e.target.select()}
                                    onChange={e => {
                                        setPasswords({ ...passwords, confirm: e.target.value });
                                    }}
                                    placeholder="Confirm new password"
                                    className={` ${passwords.confirm && passwords.new !== passwords.confirm ? "border-red-500" : ""}`}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(v => !v)}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeSlash size={20}/> : <Eye size={20}/>} 
                                </button>
                                {passwords.confirm && passwords.new !== passwords.confirm && (
                                    <span className="text-red-500 text-xs">Passwords do not match</span>
                                )}
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="flex flex-row justify-between items-center w-full mt-2 mb-2">
                            <h2 className="font-semibold text-md">Danger Zone</h2>
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
                            <DialogContent className={"gap-2 sm:max-w-[90%] lg:max-w-[700px]"}>
                                <DialogHeader>
                                    <div className="flex justify-end mb-6">
                                    <button onClick={() => handleToggleModal()}>
                                        <X />
                                    </button>
                                    </div>
                                </DialogHeader>
                                <h2 className="text-lg text-center font-bold text-red-600 mb-2">Delete Your Account</h2>
                                <p className="text-sm text-gray-700 mb-4 text-center">
                                    This will permanently erase all your data including products, sales, staff, and backups.  
                                    You won't be able to recover this information.
                                </p>
                                <div className="flex gap-2 justify-center">
                                    <Button onClick={() => handleToggleModal()} className="min-w-[120px] bg-gray-100 text-gray-700 hover:text-white">Cancel</Button>
                                    <Button variant="destructive" onClick={handleDeleteAccount} className="min-w-[120px]">Delete Account</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </section>
            </div>
        </>
    )
}