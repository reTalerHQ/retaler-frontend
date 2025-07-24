import { useState } from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Info, X } from "phosphor-react";

export const DataBackup = () => {
  const [automaticBackup, setAutomaticBackup] = useState(true);
  const [selected, setSelected] = useState("daily");
  const [closenotification, setClosenotification] = useState(false);

  const options = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const backupinfo = {
    date: "June 30, 2025",
    dataSize: "200 MB",
    status: "Up to date",
  }

  const handleCloseNotification = () => {
    setClosenotification(true);
}
  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-col">
        <h1 className="text-lg font-bold lg:text-2xl"> Data Backup</h1>
        {!closenotification && (
        <section className="flex w-full flex-row items-center rounded-md border border-green-500 bg-green-100 px-4 py-3 mb-2 md:w-[50vw] md:max-w-[50vw]">
          <Info className="w-10 h-10 md:w-5 md:h-5 text-green-700 mr-2" />
          <span className="text-sm text-green-700">Backups require internet access. Make sure you're connected before backing up or restoring.</span>
          <X className="w-10 h-10 md:w-5 md:h-5 text-green-700 ml-auto cursor-pointer" onClick={ handleCloseNotification} />
        </section>
        )}
        <section className="flex w-full flex-row gap-6 border rounded-xl bg-white px-4 py-4 md:w-[50vw] md:max-w-[50vw]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <h2 className="text-md font-semibold">Backup Account</h2>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-normal">
                  Backup Linked To: aminashola@gmail.com
                </h3>
                <p className="text-primary text-xs font-normal">
                  Your data is encrypted and securely tied to this account.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full rounded-xl border bg-white px-4 py-4 md:w-[50vw] md:max-w-[50vw]">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-5 w-full">
              <h2 className="text-md font-semibold">Backup Details</h2>
              <div className="flex flex-row items-center w-full">
                <p className="text-sm font-normal">Last Backup:</p>
                <p className="text-sm font-normal ml-auto">{backupinfo.date}</p>
              </div>
              <div className="flex flex-row items-center w-full">
                <p className="text-sm font-normal">Backup Size:</p>
                <p className="text-sm font-normal ml-auto">{backupinfo.dataSize}</p>
              </div>
              <div className="flex flex-row items-center w-full">
                <p className="text-sm font-normal">Status:</p>
                <p className="text-sm text-green-700 font-normal ml-auto">{backupinfo.status}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full  rounded-xl border bg-white px-4 py-4 md:w-[50vw] md:max-w-[50vw]">
          <div className="flex w-full flex-col gap-6">
            <h2 className="text-md font-semibold">Backup Settings</h2>
            <div className="flex w-full flex-row items-center">
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold">
                  Enable Automatic Backup
                </h2>
                <p className="text-sm font-normal text-gray-500">
                  Notifications will appear inside the app as pop-ups or
                  banners.
                </p>
              </div>
              <div className="ml-auto">
                <Switch
                  thumbSize="size-5"
                  trackWidth="w-10"
                  trackHeight="h-6"
                  checked={automaticBackup}
                  onCheckedChange={setAutomaticBackup}
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row items-center">
                <div className="flex flex-col gap-2">
                  <h2 className="text-sm font-semibold">Backup Frequency</h2>
                  <div className="flex flex-row gap-15">
                    <div className="flex flex-row gap-2">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="flex flex-row space-x-2"
                        >
                          <Checkbox
                            checked={selected === option.value}
                            onCheckedChange={() => setSelected(option.value)}
                          />
                          <label className="text-sm text-gray-500">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-row items-center">
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold">
                  Backup Now
                </h2>
                <p className="text-sm font-normal text-gray-500">
                  Don't want auto-backup? You can back up manually anytime.
                </p>
              </div>
              <div className="ml-auto">
                <Button
                 
                >
                    Backup Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
