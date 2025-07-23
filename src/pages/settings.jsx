import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { SettingsBar } from "@/components/settingsBar";
import { CaretLeft } from "phosphor-react";
export const Settings = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const isAtRootSettings = location.pathname === "/settings";

    return (
        <>
            <div className="flex flex-col justify-between gap-3 lg:flex-col">
          
            {(!isMobile || isAtRootSettings) && (
                <h1 className="text-lg font-bold lg:text-2xl">Settings</h1>
            )}
                <section className="flex flex-row gap-4">
                    {/* Desktop: show both SettingsBar and Outlet side by side */}
                    {!isMobile && (
                        <>
                            <SettingsBar className="rounded-xl border bg-white px-4 py-4 w-[315px] h-[650px]" />
                            <main className="flex-1 px-4">
                                <Outlet />
                            </main>
                        </>
                    )}
                    {/* Mobile: show SettingsBar only at root, otherwise show Outlet only */}
                    {isMobile && (
                        isAtRootSettings ? (
                            <SettingsBar className="w-full px-4 py-4" />
                        ) : (
                            <main className="flex-1 p-4">
                                <div className="mb-4 flex items-center">
                                    <button
                                        onClick={() => window.location.pathname = "/settings"}
                                        className="text-lg font-bold lg:text-2xl flex flex-row gap-1 items-center"
                                    >
                                        <CaretLeft size={20}/> Back
                                    </button>
                                </div>
                                <Outlet />
                            </main>
                        )
                    )}
                </section>
            </div>
        </>
    )
}