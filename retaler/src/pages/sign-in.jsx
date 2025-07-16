import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <>
      <section className="flex items-center justify-center">
        <section className="h-150 w-200 flex items-center justify-center md:h-180 ">
          <div className="h-120 w-86 md:w-129">
            <h1 className="md:text-[36px] md:font-bold text-[20px] font-semibold">
              Welcome Back!
            </h1>
            <p className="mb:text-[20px] text-[14px] text-[#373636] md:text-xl">
              Log in with your email and password
            </p>
            <form action="">
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="mb:text-[14px] text-[16px] text-[#373636]"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  required={true}
                  placeholder="Enter your email address"
                  className="bg-[#EFEEEE]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb:text-[14px] text-[16px] text-[#373636]"
                >
                  Password
                </label>
                <Input
                  type="password"
                  required={true}
                  placeholder="Enter a valid password"
                  className="bg-[#EFEEEE]"
                />
              </div>
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="3.5"
              />
              <label
                htmlFor="checkbox"
                className="ml-1 text-[14px] md:text-[16px]"
              >
                Remember me
              </label>
              <span className="ml-12 text-[14px] md:ml-50 md:text-[16px]">
                <Link to="/forgot-password">Forgot your password?</Link>
              </span>
              <button className="mt-5 mb-3.5 h-10 w-full cursor-pointer rounded-[7px] bg-[#375ED9]">
                Sign in
              </button>
            </form>
            <span className="flex items-center justify-center">Or</span>
            <div className="mt-3.5 mb-3.5 flex h-10 w-full cursor-pointer items-center justify-center rounded-[7px] bg-[#F6F8FD] font-semibold text-[#375ED9]">
              Continue with Google
            </div>
            <div className="mb-7 flex h-10 w-full cursor-pointer items-center justify-center rounded-[7px] bg-[#F6F8FD] font-semibold text-[#375ED9]">
              Continue with Apple
            </div>
            <p className="text-center">
              New to ReTaler?{" "}
              <Link to="/signup" className="font-bold text-[#375ED9]">
                {" "}
                Sign up
              </Link>{" "}
            </p>
          </div>
        </section>
      </section>
    </>
  );
};

export default Signin;
