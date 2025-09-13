import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="bg-[#61C0BF] py-16 mt-6 md:py-8 px-6  w-full mx-auto text-center text-white shadow-lg">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold font-poppins mb-4"
      >
        Ready to simplify your legal documents?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg mb-8 max-w-xl font-inter mx-auto"
      >
        Join thousands of users trusting DocMitra for fast, accurate, and
        customizable legal documents.
      </motion.p>
      <motion.a
        href="/signup" // update to your sign-up or get started URL
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block bg-white font-inter text-secondary-200 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        Get Started Now
      </motion.a>
    </section>
  );
};

export default CTASection;
