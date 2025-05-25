import { motion, AnimatePresence } from "framer-motion";
import { NavbarMenu } from "./data";

function ResponsiveMenu({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blurred Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-xs z-20 overscroll-none lg:hidden"
          />

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 w-full z-30 lg:hidden"
          >
            <div className="text-xl py-6 px-4 font-semibold font-inter rounded-3xl bg-primary-p3 text-black shadow-lg">
              <ul className="flex flex-col justify-center items-center gap-6">
                {NavbarMenu.map((item) => (
                  <li key={item.id}>
                    <a href={item.link}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ResponsiveMenu;
