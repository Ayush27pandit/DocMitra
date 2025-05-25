import type { IconType } from "react-icons";
import { FaRocket, FaLock, FaBolt, FaBrain, FaRupeeSign } from "react-icons/fa";
import { GiIndiaGate } from "react-icons/gi";
import { motion } from "framer-motion";
import { SliderLeft } from "@/utility/animation";
interface FeatureItems {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  bgColor: string;
  delay: number;
}
function Features() {
  const featureData: FeatureItems[] = [
    {
      id: 1,
      title: "Made for India",
      description:
        "Tailored legal documents for Indian laws, businesses, and individuals with full compliance.",
      icon: GiIndiaGate,
      bgColor: "#0063ff", // light blue
      delay: 0.1,
    },
    {
      id: 2,
      title: "No Legal Jargon",
      description:
        "Legal terms rewritten in plain language, so you understand what you're signing.",
      icon: FaBrain,
      bgColor: "#73bc00", // light yellow
      delay: 0.2,
    },
    {
      id: 3,
      title: "Instant Docs",
      description:
        "Answer a few questions and get downloadable PDFs instantly. No waiting.",
      icon: FaBolt,
      bgColor: "#78350f", // light pink
      delay: 0.3,
    },
    {
      id: 4,
      title: "Privacy First",
      description:
        "All your data is encrypted and never shared. We respect your privacy.",
      icon: FaLock,
      bgColor: "#1e293b", // light gray
      delay: 0.4,
    },
  ];
  return (
    <div className="bg-[#EAEFEF] ">
      <div className="mx-auto  px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 max-w-screen-2xl py-16">
        <div className=" font-semibold text-center space-y-2 ">
          <h1 className="text-md font-semibold text-primary-p2 uppercase font-poppins">
            Why Choose DocMitra ?
          </h1>
          <p className="text-2xl font-semibold font-inter">
            Everything you need for your legal needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {featureData.map((items) => {
            return (
              <motion.div
                variants={SliderLeft({ delay: items.delay })}
                initial="hidden"
                whileInView={"visible"}
                className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)] bg-white hover:shadow-[0_0_22px_rgba(0,0,0,0.25)] hover:scale-102 transition-all duration-300 ease-in-out"
              >
                {/* icon */}
                <div
                  style={{ backgroundColor: items.bgColor }}
                  className="w-10 h-10 rounded-lg flex justify-center items-center"
                >
                  <div className="text-2xl text-white">
                    <items.icon />
                  </div>
                </div>
                <p className="text-md font-bold font-inter">{items.title}</p>
                <p className="font-inter text-gray-500">{items.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Features;
// d6d6d6
