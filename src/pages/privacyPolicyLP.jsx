const date = 10;
export const effectiveDate = "[----Insert Date----]";

export const policies = [
  {
    title: "Data Collection: ",
    description:
      "We collect business data (e.g., inventory, sales records, staff activity) to provide core app functionality.",
  },
  {
    title: "Usage:",
    description:
      "Data is used to improve your experience, generate insights, and offer support.",
  },
  {
    title: "Third Parties: ",
    description:
      "We do not sell your data. We may share anonymized data with trusted partners for analytics or service improvements.",
  },
  {
    title: "Security:",
    description:
      "We use encryption, secure servers, and regular audits to keep your data safe.",
  },
  {
    title: "Your Rights:",
    description:
      "You can request data deletion, correction, or export at any time.",
  },
];
export function PrivacyPolicyLP() {
  return (
    <>
      <section className="mb-35 mt-30 flex flex-col px-4 ">
        <div className="mb-10 w-full px-4 text-center">
          <label className="md:text-5xl text-4xl font-medium">Privacy Policy</label>
        </div>
        <main className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Effective Date: {effectiveDate}</p>
            <p className="dark:text-gray-400">
              ReTaler values your privacy. Here's how we protect and use your
              data:
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {policies.map((policy, index) => (
              <ol
                key={index}
                className={`flex w-full flex-col justify-between gap-2`}
              >
                <li>
                  <p className="font-bold">
                    {index + 1}. {policy.title}
                  </p>
                  <p className="dark:text-gray-400">
                    {policy.description}
                  </p>
                </li>
              </ol>
            ))}
          </div>
        </main>
      </section>
    </>
  );
}
