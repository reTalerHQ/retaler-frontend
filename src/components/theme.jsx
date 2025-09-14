import { useContext } from "react";
import { ThemeContext } from "@/context/theme-context";
import { Switch } from "@/components/ui/switch";

export const Theme = () => {
  // const [inAppAlerts, setInAppAlerts] = useState(true);
  const {theme, setTheme} = useContext(ThemeContext);

  // useEffect(() => {
  //   if (theme === 'dark') {

  //     document.documentElement.classList.add('dark');
  //   } else {

  //     document.documentElement.classList.remove('dark');
  //   }
  //   // document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  // const toggleTheme = () => {
  //   setTheme((prev) => (prev === "light" ? "dark" : "light"));
  // };

  //   const toggleTheme = (checked) => {
  //   setTheme((prev) => (prev === checked ? "dark" : "light"));
  // };

  return (
    <section className="flex flex-col gap-3 dark:bg-[var(--background)]">
      <header>
        <h1 className="text-lg font-bold lg:text-2xl">Theme</h1>
      </header>

      <section className="flex w-full flex-col gap-4 rounded-xl border bg-white px-4 py-4 md:w-[50vw] md:max-w-[50vw] dark:bg-[#1e1e1e]">
        <article className="flex items-center justify-between">
          <div>
            <h2 className="text-md font-semibold">System</h2>
          </div>
          <Switch
            thumbSize="size-5"
            trackWidth="w-10"
            trackHeight="h-6"
            checked={theme === "light"}
            // checked={inAppAlerts}
            // onCheckedChange={setInAppAlerts}
            onCheckedChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
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
            onCheckedChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />
        </article>
      </section>
    </section>
  );
};
