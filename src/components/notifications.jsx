import { useState } from "react"
import { Switch } from "@/components/ui/switch";
export const Notifications = () => {
    const [inAppAlerts, setInAppAlerts] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(true);
    return (
        <>
            <div className="flex flex-col justify-between gap-3 lg:flex-col">
                <h1 className="text-lg font-bold lg:text-2xl"> Notifications</h1>
                <section className="flex flex-col gap-4 rounded-xl border bg-white px-4 py-4 w-full md:max-w-[50vw] md:w-[50vw]">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row">
                            <h2 className="text-md font-semibold">
                                In-App Alerts
                                <p className="text-sm text-gray-500 font-normal">
                                    Notifications will appear inside the app as pop-ups or banners.
                                </p>
                            </h2>
                            <div className="ml-auto">
                                <Switch thumbSize="size-5" trackWidth="w-10" trackHeight="h-6" checked={inAppAlerts} onCheckedChange={setInAppAlerts} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row">
                            <h2 className="text-md font-semibold">
                                Email Notifications
                                <p className="text-sm font-normal text-gray-500">
                                    Receive important updates and summaries in your inbox.
                                </p>
                            </h2>
                            <div className="ml-auto">
                                <Switch thumbSize="size-5" trackWidth="w-10" trackHeight="h-6" checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row">
                            <h2 className="text-md font-semibold">
                                SMS Alerts
                                <p className="text-sm font-normal text-gray-500">
                                    Get essential alerts like low stock or sales summary via SMS.
                                </p>
                            </h2>
                            <div className="ml-auto">
                                <Switch thumbSize="size-5" trackWidth="w-10" trackHeight="h-6" checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>
        </>
    )
}