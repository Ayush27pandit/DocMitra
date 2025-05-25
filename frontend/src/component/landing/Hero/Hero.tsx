import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { RippleButton } from "@/components/magicui/ripple-button";
import { motion } from "framer-motion";
import { SliderRight } from "@/utility/animation";
import { AvatarComponent } from "./AvatarBagde";

function Hero() {
  return (
    <>
      <div className=" bg-primarybg-100 grid grid-cols-1 md:grid-cols-2 relative min-h-[650px] ">
        {/* Brand-info */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
          <div className="text-center md:text-left space-y-6 md:pl-24">
            <motion.div
              variants={SliderRight({ delay: 0.2 })}
              initial="hidden"
              animate="visible"
              className="text-sm ml-4 w-111 text-stone-500 font-inter font-medium mb-2"
            >
              <AnimatedGradientTextDemo />
            </motion.div>
            <motion.h1
              variants={SliderRight({ delay: 0.3 })}
              initial="hidden"
              animate="visible"
              className="text-4xl pl-4 uppercase lg:text-5xl font-bold font-poppins text-stone-900 leading-tight mb-4"
            >
              Your Legal Docs, <br className="hidden md:block" />
              <span className="text-secondary-200">Simplified</span>.
            </motion.h1>
            <motion.p
              variants={SliderRight({ delay: 0.5 })}
              initial="hidden"
              animate="visible"
              className="text-md pl-4 px-1 font-inter text-stone-800 mb-6 leading-relaxed"
            >
              Create{" "}
              <a
                href="#documents"
                className="text-secondary-500 underline hover:text-secondary-700 transition"
              >
                legal documents
              </a>{" "}
              in minutes — without the legal jargon. <br />
              Simple, fast, and built for{" "}
              <span className="font-semibold">Indian</span> individuals &
              startups.
            </motion.p>
            <motion.div
              variants={SliderRight({ delay: 0.6 })}
              initial="hidden"
              animate="visible"
              className="flex gap-4 justify-center md:justify-start md:pl-4"
            >
              <ShimmerButton className="shadow-2xl hover:scale-102 transition-transform duration-300 ">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Get Started
                </span>
              </ShimmerButton>
              <RippleButton
                rippleColor="#90d1ca"
                className="font-semibold shadow-2xl hover:scale-102 transition-transform duration-300"
              >
                Watch Demo
              </RippleButton>
            </motion.div>
            <motion.div
              variants={SliderRight({ delay: 0.6 })}
              initial="hidden"
              animate="visible"
              className=" text-center px-32 md:pl-6 flex items-center "
            >
              <AvatarComponent />
            </motion.div>
          </div>
        </div>
        {/* Hero-image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            src="../../../../HeroNew.svg"
            alt=""
            className="w-[350px] xl:w-[580px] xl:pr-3 "
          />
        </div>
      </div>
    </>
  );
}

export default Hero;

function AnimatedGradientTextDemo() {
  return (
    <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
      <span
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      🛡️ <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
      <AnimatedGradientText className="text-sm font-medium">
        Trusted by smart individuals & startups across India
      </AnimatedGradientText>
      <ChevronRight
        className="ml-1 size-4 stroke-neutral-500 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
      />
    </div>
  );
}
