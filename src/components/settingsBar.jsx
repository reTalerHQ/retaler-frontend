import { Link, NavLink, Outlet } from "react-router-dom";
import { User, Bell, Sun, Tag, Database, Heart, Info, ShareNetwork, ShieldCheck, FileText, Power, X } from "phosphor-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";

export const SettingsBar = ({ setActiveSetting, className }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);

  useEffect(() => {
    if (showLogoutToast) {
      setTimeout(() => setShowLogoutToast(false), 3000);
    }
  }, [showLogoutToast]);

  const generalBarLinks = [
    { id: 1, title: "Account", icon: <User />, to: "/settings/account" },
    { id: 2, title: "Notifications", icon: <Bell />, to: "/settings/notifications" },
    { id: 3, title: "Theme", icon: <Sun />, to: "/settings/theme" },
    { id: 4, title: "Inventory", icon: <Tag />, to: "/settings/inventory" },
    { id: 5, title: "Data Backup", icon: <Database />, to   : "/settings/data-backup" },
  ];      
  const othersBarLinks = [
    { id: 1, title: "Support & Help Centre", icon: <Heart />, to: "/settings/support" },
    { id: 2, title: "About ReTaler", icon: <Info />, to: "/settings/about" },
    { id: 3, title: "Invite a Friend", icon: <ShareNetwork  />, to: "/settings/invite-friend" },
    { id: 4, title: "Privacy Policy", icon: <ShieldCheck />, to: "/settings/privacy-policy" },
    { id: 5, title: "Terms and Conditions", icon: <FileText />, to: "/settings/terms-and-conditions" },
    { id: 6, title: "Log Out", icon: <Power />, to: "/settings/logout" },
  ];      
  return (
    <>
      {showLogoutToast && (
        <div className="fixed top-20 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-all">You've been Logged out successfully</div>
      )}
      <aside className={`${className}`}>
        <div className="">
          <h2 className="text-lg font-semibold !text-gray-500">General</h2>
          <div>
            {generalBarLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                onClick={() => setActiveSetting("account")}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-3 text-base transition-colors ${
                    isActive
                      ? "text-primary font-medium hover:bg-[#F6F8FD]"
                      : "text-black hover:bg-gray-100"
                  }`
                }
              >
                {link.icon}
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-lg font-semibold !text-gray-500">Others</h2>
          {othersBarLinks.map((link) =>
            link.title === "Log Out" ? (
              <button
                key={link.id}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base transition-colors text-black hover:bg-gray-100 w-full"
                onClick={() => setShowLogoutModal(true)}
              >
                {link.icon}
                {link.title}
              </button>
            ) : (
              <NavLink
                key={link.id}
                to={link.to}
                onClick={() => setActiveSetting("account")}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-3 text-base transition-colors ${
                    isActive
                      ? "text-primary font-medium hover:bg-[#F6F8FD]"
                      : "text-black hover:bg-gray-100"
                  }`
                }
              >
                {link.icon}
                {link.title}
              </NavLink>
            )
          )}
        </div>
      </aside>
      {showLogoutModal && (
        <Dialog open={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
          <DialogContent className="sm:max-w-[90%] lg:max-w-[700px]">
            <DialogHeader>
                <div className="flex justify-end mb-6">
                <button onClick={() => setShowLogoutModal(false)}>
                    <X />
                </button>
                </div>
            </DialogHeader>
              <h2 className="text-xl text-center font-bold text-red-600">Are you sure you want to log out of ReTaler?</h2>       
            <p className="text-xs text-gray-700 mb-4 text-center">
              You’ll need to enter your email and password again to sign back in.
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setShowLogoutModal(false)} className="min-w-[120px] bg-gray-100 text-gray-700 hover:text-white">Cancel</Button>
              <Button variant="destructive" onClick={() => { window.location.href = "/sign-in"; localStorage.setItem("showLogoutToast", "true");
              }} className="min-w-[120px]">Log Out</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}