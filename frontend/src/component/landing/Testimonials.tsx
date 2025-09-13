import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  avatar: string; // image url
  feedback: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Freelancer",
    avatar: "/profilepic.svg",
    feedback:
      "DocMitra saved me hours drafting freelance contracts. Simple and super reliable!",
  },
  {
    name: "Rahul Verma",
    role: "Startup Founder",
    avatar: "/profilepic.svg",
    feedback:
      "Managing business documents became effortless thanks to DocMitra. Highly recommended!",
  },
  {
    name: "Anjali Singh",
    role: "Legal Consultant",
    avatar: "/profilepic.svg",
    feedback:
      "The professional templates and ease of use make DocMitra my go-to legal document tool.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <motion.div
    key={testimonial.name}
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto"
  >
    <p className="text-gray-700 text-lg mb-6">"{testimonial.feedback}"</p>
    <div className="flex items-center gap-4">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const length = TESTIMONIALS.length;

  const prev = () => setIndex((i) => (i === 0 ? length - 1 : i - 1));
  const next = () => setIndex((i) => (i === length - 1 ? 0 : i + 1));

  return (
    <section className="pt-4  pb-12 px-4 sm:px-8 lg:px-24 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What our users say
      </h2>
      <div className="relative max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <TestimonialCard key={index} testimonial={TESTIMONIALS[index]} />
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            aria-label="Previous testimonial"
            onClick={prev}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={next}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
