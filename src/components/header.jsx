import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState } from "react";
export function Header() {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 flex flex-row items-center justify-between bg-white dark:bg-black derk:text-white
       p-2 shadow-xs md:px-50">
        <div>
          <img src="/assets/images/retaler-logo.svg" alt="retaler logo" />
        </div>
        <ul className="text-white-500 flex flex-row items-center gap-8 text-sm">
          <HeaderLinks />
          <div className="items-center gap-4">
            <Hamburger />
          </div>
        </ul>
        <div className="hidden md:block">
          <ActionButton />
        </div>
      </header>
    </>
  );
}

function HeaderLinks() {
    const handleClick = (e, targetId) => {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const headerHeight = 80; // Adjust based on your header height
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    };
  return (
    <main>
      <nav className="font-trap hidden flex-row gap-10 text-base md:flex">
        <a
          href="#benefits"
          className="hover:text-blue-700"
          onClick={(e) => handleClick(e, "benefits")}
        >
          Benefits
        </a>
        <a
          href="#faqs"
          className="hover:text-blue-700"
          onClick={(e) => handleClick(e, "faqs")}
        >
          FAQs
        </a>
        <a
          href="#aboutRetaler"
          className="hover:text-blue-700"
          onClick={(e) => handleClick(e, "aboutRetaler")}
        >
          About ReTaler
        </a>
      </nav>
    </main>
  );
}

function Hamburger() {
    const [open, setOpen] = useState(false);
    const handleClick = (e, targetId) => {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const headerHeight = 80; // Adjust based on your header height
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    };
  return (
    <>
      <main
        className="cursor-pointer md:hidden"
        aria-haspopup="menu"
        aria-expanded={open}
        tabIndex={0}
      >
        <Button
          variant="secondary"
          onClick={() => setOpen((prev) => !prev)}
          className="grid place-items-center rounded px-2"
        >
          <span className="block h-0.5 w-5 rounded-full bg-black dark:bg-white"></span>
          <span className="block h-0.5 w-5 rounded-full bg-black dark:bg-white"></span>
          <span className="block h-0.5 w-5 rounded-full bg-black dark:bg-white"></span>
        </Button>

        <aside
          className={[
            "fixed top-0 right-0 z-50 flex h-screen w-50 flex-col gap-5 rounded bg-white/5 p-5 shadow-xl backdrop-blur-md md:hidden",
            "origin-right transform-gpu transition-all duration-300 ease-out",
            open
              ? "pointer-events-auto translate-x-0 scale-x-100 opacity-100"
              : "pointer-events-none translate-x-0 scale-x-0 opacity-0",
          ].join(" ")}
          role="menu"
          aria-hidden={!open}
        >
          <div
            onClick={() => setOpen(false)}
            className="flex justify-end pb-10 text-xl font-bold"
          >
            <X />
          </div>
          <a
            href="#benefits"
            className="hover:text-blue-700"
            onClick={(e) => handleClick(e, "benefits")}
          >
            Benefits
          </a>
          <a
            href="#faqs"
            className="hover:text-blue-700"
            onClick={(e) => handleClick(e, "faqs")}
          >
            FAQs
          </a>
          <a
            href="#aboutRetaler"
            className="hover:text-blue-700"
            onClick={(e) => handleClick(e, "aboutRetaler")}
          >
            About ReTaler
          </a>
        </aside>
      </main>
    </>
  );
}

export function ActionButton() {
    return (
      <>
        <Button className="font-trap p-6 text-base font-medium text-white">
          Get Started
        </Button>
      </>
    );
}
