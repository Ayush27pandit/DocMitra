import { useState } from "react";
import { motion } from "framer-motion";

type UserTypeKey = "Individuals" | "Businesses" | "Professionals";

type UserTypeData = {
  image: string;
  title: string;
  documents: string[];
};

const USER_TYPES: Record<UserTypeKey, UserTypeData> = {
  Individuals: {
    image: " /individuals.jpg", // Replace with your real paths
    title: "For Individuals",
    documents: [
      "Rent Agreement",
      "Freelance Contract",
      "Affidavit",
      "Personal Legal Notice",
    ],
  },
  Businesses: {
    image: "/business.jpg",
    title: "For Businesses",
    documents: [
      "Invoice Generator",
      "Employment Contract",
      "Non-Disclosure Agreement (NDA)",
      "Vendor Agreement",
    ],
  },
  Professionals: {
    image: "/professionals.jpg",
    title: "For Professionals",
    documents: [
      "Client Onboarding Form",
      "Service Agreement",
      "Consultation Contract",
      "Work Proposal Document",
    ],
  },
};

const UserTypesTabs = () => {
  const [selected, setSelected] = useState<UserTypeKey>("Individuals");

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-24 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-poppins font-bold text-gray-800">
          Who is DocMitra for?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2 font-inter">
          Explore how different users benefit from our smart legal document
          generation.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        {(Object.keys(USER_TYPES) as UserTypeKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
              selected === key
                ? "bg-secondary-200 text-white border-blue-600"
                : "bg-gray-100 text-gray-600 border-transparent hover:border-gray-300"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Animated Content Card */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ willChange: "transform, opacity" }}
        className="max-w-3xl mx-auto bg-primary-p3 rounded-2xl shadow-md overflow-hidden md:flex "
      >
        {/* Left Image */}
        <div className="w-full md:w-3/4 h-64 md:h-64 relative">
          <img
            src={USER_TYPES[selected].image}
            alt={USER_TYPES[selected].title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 px-6 py-8 flex flex-col justify-center item-center ">
          <h3 className="text-2xl font-semibold font-poppins text-gray-800 mb-4">
            {USER_TYPES[selected].title}
          </h3>
          <ul className="list-disc list-inside text-gray-700 font-inter space-y-2">
            {USER_TYPES[selected].documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default UserTypesTabs;
