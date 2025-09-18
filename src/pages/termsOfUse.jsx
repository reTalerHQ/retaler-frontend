
export const terms = [
  {
    title: "Usage: ",
    description:
      "You must be 18+ or have legal authority to manage a business.",
  },
  {
    title: "Account Security:",
    description:
      "Keep your login credentials confidential. You're responsible for activity under your account.",
  },
  {
    title: "Data Ownership:  ",
    description:
      "You own your business data. We provide tools to manage and export it.",
  },
  {
    id: 4,
    title: "Service Availability: ",
    description:
      "We strive for 99.9% uptime but may perform maintenance or updates occasionally. These updates are required to improve our service delivery and serve you better. We use encryption, secure servers, and regular audits to keep your data safe.",
  },
  {
    title: "Termination: ",
    description:
      "You may cancel your account anytime. We reserve the right to suspend accounts for misuse or violation of terms.",
  },
  {
    title: "Support / Help:  ",
    description: "Need assistance? We're here for you.",
    support: [
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
        description: "Visit our Help Center for guides, tutorials and troubleshooting tips",
      },
    ],
  },
];
export function TermsOfUse() {
  return (
    <>
      <section className="mt-30 mb-35 flex flex-col px-4">
        <div className="mb-10 w-full px-4 text-center">
          <label className="md:text-5xl text-4xl font-medium">Terms and Conditions</label>
        </div>
        <main className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Welcome to ReTaler!</p>
            <p className="dark:text-gray-400">
              By using our app, you agree to the following:
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {terms.map((term, index) => (
              <ol
                key={index}
                className={`flex w-full flex-col justify-between gap-2`}
              >
                <li>
                  <p className="font-bold">{index + 1}. {term.title}
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
    </>
  );
}
