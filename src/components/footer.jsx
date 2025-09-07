export function Footer() {
    return (
      <>
        <footer className="p-10 font-trap font-medium">
          <div className="mx-auto max-w-6xl justify-between md:px-20">
            <div className="order-1 flex flex-col md:flex-row w-full justify-between gap-6 md:order-none items-center">
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
              {/* Copyright */}
              <p className="order-2 md:order-none">
                Copyright © {new Date().getFullYear()} ReTaler
              </p>
              <a href="/terms" className="hover:underline">
                Terms of Use
              </a>
            </div>
          </div>
        </footer>
      </>
    );
}