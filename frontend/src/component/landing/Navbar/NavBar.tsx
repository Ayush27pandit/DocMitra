import { motion } from "framer-motion";
import { NavbarMenu } from "./data";
import { SiMaterialformkdocs } from "react-icons/si";
import { li } from "framer-motion/client";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";

function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="z-40 relative bg-primarybg-100 font-inter  flex justify-between items-center px-4.5 py-4">
          {/* logo-section */}
          <div className="text-2xl font-bold flex items-center gap-2">
            <SiMaterialformkdocs className=" text-3xl text-secondary-200" />
            <p className="text-stone-800  ">DocMitra</p>
          </div>

          {/* Links */}
          <div className="hidden lg:block">
            <ul className="flex gap-8">
              {NavbarMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.link}
                      className="inline-block text-stone-700 font-medium text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-secondary-200  transition-all duration-300 ease-in-out hover:cursor-pointer hover"
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Cta button */}
          <div className="hidden lg:block space-x-6">
            <button className="font-semibold hover:scale-103 hover:cursor-pointer hover:text-gray-600 transition-all duration-300 ease-in-out hover:underline">
              Sign-In
            </button>
            <button className="text-white rounded-full  bg-secondary-200 font-semibold px-6 py-3 hover:scale-105 hover:bg-primary-p3 hover:text-black transition-all duration-300 ease-in-out shadow-lg hover:cursor-pointer hover">
              Register
            </button>
          </div>
          {/* Hamburger */}
          <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <MdClose className="text-3xl text-secondary-200" />
            ) : (
              <MdMenu className="text-3xl text-secondary-200" />
            )}
          </div>
        </div>
      </motion.div>

      {/* mobile-sidebar-section */}
      <ResponsiveMenu open={isOpen} />
    </>
  );
}

export default NavBar;
