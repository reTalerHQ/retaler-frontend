import { Header, ActionButton } from "@/components/header";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const benefits = [
  {
    image: "/assets/images/keep record of each sales.svg",
    title: "Keep records of every sale",
    description:
      "Every transaction is stored securely, giving you a complete sales history.",
  },
  {
    image: "/assets/images/retailer-friendly.svg",
    title: "Retailer-friendly, easy-to-use",
    description:
      "ReTaler is designed to be simple for anyone to use, no headaches.",
  },
  {
    image: "/assets/images/monitor-business.svg",
    title: "Monitor your business, anywhere, anytime ",
    description:
      "Have access to your business no matter where you are, you can track without missing a thing.",
  },
];
const faqs = [
  {
    question: "Do I need technical skills to use ReTaler?",
    answer:
      "ReTaler is beginner friendly, even if you’re not tech savvy you can use ReTaler.",
  },
  {
    question: "Can I access ReTaler offline?",
    answer: "Currently, ReTaler requires an internet connection.",
  },
  {
    question: "Who is ReTaler for?",
    answer:
      "ReTaler is for small business owners and entrepreneurs who want to manage sales easily.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes, your data is encrypted and stored securely.",
  },
];

export function LandingPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <Header />
      <main className="font-trap mt-60 flex flex-col gap-35 px-4 py-5 md:mt-50 md:px-50">
        <section className="flex flex-col items-center justify-center gap-8 px-3 text-center">
          <p className="text-5xl font-medium md:text-7xl">
            Every Sale, Every Insight All in one place.
          </p>
          <p className="text-lg">
            Built for small to mid sized retailers to stay on top of your
            business, every sale, every day with zero stress.
          </p>
          <ActionButton />
          <div>
            <img src="/assets/images/screens.svg" alt="screens" />
          </div>
        </section>
        <section
          id="benefits"
          className="flex flex-col items-center justify-center gap-8 text-center"
        >
          <label className="text-4xl font-medium md:text-5xl">
            Why Retailers Love ReTaler
          </label>
          <div className="flex flex-col justify-between gap-10 md:gap-20">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-between gap-5 p-4 md:gap-30 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } `}
              >
                <div>
                  <img src={benefit.image} alt="benefit 1" />
                </div>
                <div className="flex flex-col items-start gap-8 text-left md:w-90">
                  <p className="text-4xl font-medium">{benefit.title}</p>
                  <p className="text-md">{benefit.description}</p>
                  {index === 0 && <ActionButton />}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="faqs" className="">
          <div className="mb-10 w-full md:text-center px-4">
            <label className="text-4xl font-medium md:text-5xl">
              Frequently Asked Questions
            </label>
          </div>
          <div className="divide-y divide-gray-200 md:px-20">
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
                  <p className="text-left text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col items-center gap-10 rounded-xl bg-blue-100 p-15">
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
