import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export const Theme = () => {
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <section className="flex flex-col gap-3">
      <header>
        <h1 className="text-lg font-bold lg:text-2xl">Theme</h1>
      </header>

      <section className="flex flex-col gap-4 rounded-xl border bg-white px-4 py-4 w-full md:max-w-[50vw] md:w-[50vw]">
        <article className="flex items-center justify-between">
          <div>
            <h2 className="text-md font-semibold">System</h2>
          </div>
          <Switch
            thumbSize="size-5"
            trackWidth="w-10"
            trackHeight="h-6"
            checked={inAppAlerts}
            onCheckedChange={setInAppAlerts}
          />
        </article>

        <article className="flex items-center justify-between">
          <div>
            <h2 className="text-md font-semibold">Dark Mode</h2>
          </div>
          <Switch
            thumbSize="size-5"
            trackWidth="w-10"
            trackHeight="h-6"
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </article>
      </section>
    </section>
  );
};
