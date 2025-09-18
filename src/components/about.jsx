const uses = [
  "Track inventory effortlessly",
  "Monitor staff performance",
  "Analyze sales trends",
  "Make data-driven decisions",
];

export const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-col">
        <h1 className="text-lg font-bold lg:text-2xl"> About Page</h1>
        <section className="flex w-full flex-row gap-4 rounded-xl border bg-white pb-4 md:w-[50vw] md:max-w-[50vw] dark:bg-[#1e1e1e]">
          <div className="flex flex-col px-4">
            <p className="text-md mt-5">
              ReTaler is built for the heartbeat of the economy for small and
              medium businesses. We understand various business demands,
              inventory issues, and the need for real-time insights.
            </p>
            <p className="text-md mt-5">
              That’s why we created a smart, innovative digital platform that
              helps you:
            </p>
            <ul className="mt-2 ml-4 list-disc">
              {uses.map((item, index) => (
                <li className="dark:text-gray-400" key={index}>
                    {item}
                </li>
              ))}
            </ul>
            <p className="text-md mt-5">
              Whether you're running a single shop or managing multiple outlets,
              ReTaler gives you the tools to track, analyze and grow with
              confidence.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};
