import { useRef } from "react";
import {
  Star,
  Package,
  BarChart3,
  CircleDollarSign,
  Heart,
  User,
  AlertTriangle,
} from "lucide-react";

const abouts = [
  {
    icon: Star,
    name: "Role-Based Access",
  },
  {
    icon: Package,
    name: "Inventory Tracking",
  },
  {
    icon: BarChart3,
    name: "Business Analytics",
  },
  {
    icon: CircleDollarSign,
    name: "Sales Recording",
  },
  {
    icon: Heart,
    name: "Product Catalog",
  },
  {
    icon: User,
    name: "Staff Management",
  },
  {
    icon: AlertTriangle,
    name: "Stock Alerts",
  },
];

export function SmoothScroll() {
  const trackRef = useRef(null);
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="w-full">
        <div
          ref={trackRef}
          className="animate-controlled-scroll flex flex-nowrap"
        >
          {Array.from({ length: 2 }, (_, setIndex) => (
            <div key={setIndex} className="flex flex-shrink-0">
              {abouts.map((about, i) => {
                const IconComponent = about.icon;
                return (
                  <div
                    key={`${setIndex}-${i}`}
                    className="mx-3 flex flex-row items-center justify-center rounded-lg border bg-white px-4 py-2 whitespace-nowrap"
                  >
                    <IconComponent className="text-primary mr-2" size={16} />
                    <p className="text-primary text-sm">{about.name}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-controlled-scroll {
          animation: controlled-scroll 15s linear infinite;
          min-width: 100%;
          width: max-content;
        }

        @keyframes controlled-scroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }

        .animate-controlled-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
