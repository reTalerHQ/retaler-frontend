import { terms } from "@/pages/termsOfUse";

export const TermsCondition = () => {
  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-col">
        <h1 className="text-lg font-bold lg:text-2xl"> Terms and Conditions</h1>
        <section className="flex w-full flex-row gap-4 rounded-xl border bg-white px-4 py-4 md:w-[50vw] md:max-w-[50vw] dark:bg-[#1e1e1e]">
          <main className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Welcome to ReTaler!</p>
              <p className="dark:text-gray-400">
                By using our app, you agree to the following:
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {terms.map((term, index) => (
                <ol
                  key={index}
                  className={`flex w-full flex-col justify-between gap-2`}
                >
                  <li>
                    <p className="font-semibold">
                      {index + 1}. {term.title}
                    </p>
                    <p className="dark:text-gray-400">{term.description}</p>
                    {term.support && (
                      <ul className="mt-2 ml-4 list-disc">
                        {term.support.map((item, index) => (
                          <li className="dark:text-gray-400" key={index}>
                            <strong className="text-black dark:text-white">
                              {item.name}:
                            </strong>{" "}
                            {item.description}
                          </li>
                        ))}
                      </ul>
                    )}
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
