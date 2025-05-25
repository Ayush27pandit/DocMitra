import { useState } from "react";
import { motion } from "framer-motion";

function NavbarBanner() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    isOpen && (
      <motion.div
        className="bg-primary-p3 text-sm text-center font-inter font-semibold p-1.5 hidden lg:block tracking-widest relative  "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        Need help? Explore our{" "}
        <a href="#" className="text-white underline ">
          free templates
        </a>
        <div
          className="absolute  text-red-500 font-bold top-1/2 right-10 cursor-pointer -translate-y-1/2"
          onClick={() => setIsOpen(false)}
        >
          X
        </div>
      </motion.div>
    )
  );
}

export default NavbarBanner;
