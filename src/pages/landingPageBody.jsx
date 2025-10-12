import { ActionButton } from "@/components/header";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "phosphor-react";
import { SmoothScroll } from "@/components/smoothScrool";

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
const pricings = [
  {
    name: "Basic",
    description:
      "Best for self-employed retailers and individual shop owners just starting out. Get tools to manage your store for free",
    price: "0",
    button: "Get Started",
    frequency: "One Time",
    features: [
      "All-in-One Dashboard",
      "No staff accounts",
      "50 stock limit",
      "Unlimited sales recording",
    ],
  },
  {
    name: "Standard",
    description:
      "Built for growing enterprises that need more features, team access, and smoother operations to scale their retail business.",
    price: "5",
    button: "Subscribe",
    frequency: "/monthly",
    features: [
      "All-in-One Dashboard",
      "Create 5 staff accounts",
      "100 stock limit",
      "Unlimited sales recording",
      "Advanced Analytics",
    ],
  },
  {
    name: "Premium",
    description:
      "Built for organisations. Enjoy advanced tools, integrations, and dedicated support for seamless retail management.",
    price: "10",
    button: "Subscribe",
    frequency: "/monthly",
    features: [
      "All-in-One Dashboard",
      "Create 10+ staff accounts",
      "200 stock limit",
      "Unlimited sales recording",
      "Advanced Analytics",
    ],
  },
];
export function LandingPageBody() {
  return (
    <>
      <main className="mt-50 flex flex-col gap-35">
        <section className="flex flex-col items-center justify-center gap-8 px-3 text-center">
          <p className="text-5xl font-medium md:text-7xl">
            Every Sale, Every Insight All in one place.
          </p>
          <p className="text-lg dark:text-gray-300">
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
          <div>
            <p className="text-primary p-4 pt-8 font-semibold">BENEFITS</p>
            <label className="text-4xl font-medium md:text-5xl">
              Why Retailers Love ReTaler
            </label>
          </div>

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
        <section
          id="pricing"
          className="flex flex-col items-center justify-center gap-8 text-center"
        >
          <div className="flex flex-col px-4 md:w-[50%]">
            <p className="text-primary p-4 pt-8 font-semibold">PRICING</p>
            <label className="px-2 text-4xl font-medium">
              Flexible Pricing That Grows With Retailers
            </label>
            <label className="text-md mt-5">
              From solo shop owners to enterprises and organisations our plans
              are built to support every retailer’s journey.
            </label>
          </div>
          <div className="flex flex-col justify-center gap-10 p-4 md:flex-row md:gap-4">
            {pricings.map((pricing, index) => (
              <div
                key={index}
                className={`rounded-xl p-5 text-left ${index === 1 ? "bg-primary text-white" : "bg white dark:border-primary border border-1 border-gray-200 text-black dark:text-white"}`}
              >
                <p className="text-2xl font-semibold">{pricing.name}</p>
                <p
                  className={`mt-4 text-sm font-thin ${index === 1 ? "bg-primary text-gray-200" : "bg white text-gray-500"}`}
                >
                  {pricing.description}
                </p>
                <p className="mt-8 text-4xl font-bold">
                  ${pricing.price}
                  <span className="text-xs font-normal">
                    {" "}
                    {pricing.frequency}
                  </span>
                </p>
                <div className="w-full">
                  <Button
                    className={`my-5 w-full ${index === 1 ? "text-primary bg-white hover:bg-gray-100" : "bg-primary text-white"}`}
                    label={``}
                  >
                    {" "}
                    {pricing.button}
                  </Button>
                </div>
                <ul className="flex flex-col gap-2">
                  {pricing.features.map((feature, i) => (
                    <div className="flex flex-row items-center gap-2">
                      <CheckCircle
                        size={20}
                        color={`${index === 1 ? "white" : "blue"}`}
                      />
                      <li
                        className={`text-sm ${index === 1 ? "bg-primary text-gray-200" : "bg white text-gray-500"}`}
                        key={i}
                      >
                        {feature}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section
          id="about"
          className="flex flex-col items-center justify-center gap-8 text-center"
        >
          <div className="flex flex-col px-4 md:w-[85%]">
            <p className="text-primary p-4 pt-8 font-semibold">ABOUT RETALER</p>
            <p className="px-2 text-4xl font-medium md:px-50">
              Empowering Retailers, One Sale at a Time
            </p>
            <p className="text-md mt-5">
              ReTaler is built for the heartbeat of the economy for small and
              medium businesses. We understand various business demands,
              inventory issues, and the need for real-time insights. Whether
              you're running a single shop or managing multiple outlets, ReTaler
              gives you the tools to track, analyze and grow with confidence.
            </p>
          </div>
          <div className="mb-35 w-full">
            <SmoothScroll />
          </div>
        </section>
      </main>
    </>
  );
}