import { Header, ActionButton } from "@/components/header";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "phosphor-react";
import { Outlet } from "react-router-dom";

const faqs = [
  {
    question: "What is ReTaler? ",
    answer:
      "ReTaler is a digital business management app designed to help small and medium-sized businesses track inventory, record sales, monitor staff performance, and analyze sales trends—all in one place.",
  },
  {
    question: "Who can use ReTaler?",
    answer:
      "ReTaler   is   perfect   for   retail   shops,   boutiques,   mini-marts,   and   growing enterprises looking to streamline operations and make smarter decisions.",
  },
  {
    question: "Is ReTaler available on mobile and desktop? ",
    answer:
      "Yes! ReTaler is accessible via web and mobile apps for both Android and iOS.",
  },
  {
    question: "Can I track multiple branches or outlets?",
    answer:
      "Absolutely. ReTaler allows you to manage multiple locations from a single dashboard",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use industry-standard encryption and security protocols to protect your data. See our Privacy Policy for more details.",
  },
];

export function LandingPageLayout() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <main className="font-trap px-4 py-5 md:px-50">
        <Outlet />

        <section id="faqs" className="">
          <div className="mb-10 w-[30%] px-4 ">
            <p className="text-primary pt-8 pb-4 font-semibold">FAQS</p>
            <label className="text-4xl font-medium">
              Frequently Asked Questions
            </label>
          </div>
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`flex w-full flex-col justify-between gap-5 p-4`}
              >
                <button
                  className="flex w-full items-center justify-between pb-5 text-left text-lg font-medium"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {/* Answer */}
                {openIndex === index && (
                  <p className="text-left text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="mt-35 flex flex-col items-center gap-10 rounded-xl bg-blue-100 p-15 text-black">
          <p className="text-center text-3xl font-medium md:text-4xl">
            Ready to track your business the right way?
          </p>
          <ActionButton />
        </section>
      </main>
      <div className="mx-10">
        <Footer />
      </div>
    </>
  );
}
