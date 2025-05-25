import { LogoCarouselDemo } from "./component/landing/BrandStrip/BrandStrip";
import Features from "./component/landing/Features/Features";
import Hero from "./component/landing/Hero/Hero";
import NavBar from "./component/landing/Navbar/NavBar";
import NavbarBanner from "./component/landing/Navbar/NavbarBanner";
import NumberCounterStrip from "./component/landing/NumberCounter/NumberCounter";

function App() {
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
    </main>
  );
}

export default App;
