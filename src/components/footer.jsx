import { Link } from "react-router-dom";
export function Footer() {
  return (
    <>
      <footer className="font-trap p-10 font-medium">
        <div className="mx-auto max-w-6xl justify-between md:px-20">
          <div className="order-1 flex w-full flex-col items-center justify-between gap-6 md:order-none md:flex-row">
            <Link to="/landing-page/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            {/* Copyright */}
            <p className="order-2 md:order-none">
              Copyright © {new Date().getFullYear()} ReTaler
            </p>

            <Link to="/landing-page/terms-of-use" className="hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
