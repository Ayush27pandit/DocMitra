import { LogoCarouselDemo } from "./BrandStrip/BrandStrip";
import CTASection from "./Cta";
import UserTypesTabs from "./DocumentCategory/DocCategory";
import Features from "./Features/Features";
import Footer from "./Footer";
import Hero from "./Hero/Hero";
import NavBar from "./Navbar/NavBar";
import NavbarBanner from "./Navbar/NavbarBanner";
import NumberCounterStrip from "./NumberCounter/NumberCounter";
import Testimonials from "./Testimonials";

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden ">
      <div className="bg-primarybg-100">
        <NavBar />
        <NavbarBanner />
        <Hero />
      </div>
      <NumberCounterStrip />
      <LogoCarouselDemo />
      <Features />
      <UserTypesTabs />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
