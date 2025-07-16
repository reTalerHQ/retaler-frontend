import { Input } from "../components/ui/input";

const ResetPassword = () => {
  return (
    <>
      <section className="flex items-center justify-center md:my-[40px]">
        <section className="h-110 w-150 flex items-center justify-center md:h-120">
          <div className="h-65 w-86 md:h-70 md:w-120">
            <h1 className="text-[20px] font-semibold md:text-[36px] md:font-bold">
              Reset Your Password
            </h1>
            <p className="text-[14px] font-normal text-[#373636] md:text-[20px]">
              Enter your new Password
            </p>
            <form action="">
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="text-[16px] font-semibold text-[#373636]"
                >
                  New Password
                </label>
                <Input
                  type="password"
                  required={true}
                  placeholder="Enter your new password"
                  className="bg-[#EFEEEE]"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="text-[16px] font-semibold text-[#373636]"
                >
                  New Password
                </label>
                <Input
                  type="password"
                  required={true}
                  placeholder="Enter your new password"
                  className="bg-[#EFEEEE]"
                />
              </div>
              <button className="mt-5 mb-3.5 h-10 w-full cursor-pointer rounded-[7px] bg-[#375ED9] text-[16px] font-semibold">
                Save
              </button>
            </form>
          </div>
        </section>
      </section>
    </>
  );
};

export default ResetPassword;
