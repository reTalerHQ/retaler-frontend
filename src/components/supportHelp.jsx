const supports = [
  {
    name: "Live Chat",
    description: "Available 9am-6pm WAT, Monday to Saturday",
  },
  {
    name: "Email Support",
    description: "support@retaler.com",
  },
  {
    name: "Phone",
    description: "+234 01234567",
  },
  {
    name: "Knowledge Base",
    description:
      "Visit our Help Center for guides, tutorials and troubleshooting tips",
  },
];

export const SupportHelp = () => {
  return (
    <>
      <div className="flex flex-col justify-between gap-3 lg:flex-col">
        <h1 className="text-lg font-bold lg:text-2xl">
          {" "}
          Support & Help Centre
        </h1>
        <section className="flex w-full flex-col gap-5 rounded-xl border bg-white px-4 py-4 md:w-[50vw] md:max-w-[50vw]">
          <p>Need assistance? We're here for you.</p>
          {supports && (
            <ul className="mt-2 flex flex-col gap-10">
              {supports.map((item, index) => (
                <li className="dark:text-gray-400" key={index}>
                  <p className="font-semibold text-black dark:text-white">
                    {index + 1}. {item.name}:
                  </p>{" "}
                  {item.description}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};
