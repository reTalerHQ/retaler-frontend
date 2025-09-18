import { policies, effectiveDate } from "@/pages/privacyPolicyLP";
export const PrivacyPolicy = () => {
  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-col">
        <h1 className="text-lg font-bold lg:text-2xl"> Privacy Policy</h1>
        <section className="bg-white dark:bg-[#1e1e1e] dark:border-gray-500 flex w-full flex-row gap-4 rounded-xl border px-4 py-4 md:w-[50vw] md:max-w-[50vw]">
          <main className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Effective Date: {effectiveDate}</p>
              <p className="dark:text-gray-400">
                ReTaler values your privacy. Here's how we protect and use your
                data:
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {policies.map((policy, index) => (
                <ol
                  key={index}
                  className={`flex w-full flex-col justify-between gap-2`}
                >
                  <li>
                    <p className="font-semibold">
                      {index + 1}. {policy.title}
                    </p>
                    <p className="dark:text-gray-400 ">{policy.description}</p>
                  </li>
                </ol>
              ))}
            </div>
          </main>
        </section>
      </div>
    </>
  );
};
