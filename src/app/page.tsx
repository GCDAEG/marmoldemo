"use client";
import HowItWorks from "@/components/layout/Sections/HowItWorks";
import HeroSection from "../components/layout/Sections/HeroSection";
import PrdocutCatalog from "../components/layout/Sections/ProductCatalog";
import WhatsAppChatInput from "@/components/ui/WhatsAppChatInput";
import { useState } from "react";
import OurStory from "@/components/layout/Sections/OurStory";
// export const roboto = Roboto({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-roboto",
// });

// export const lora = Lora({
//   subsets: ["latin"],
//   display: "optional",
//   variable: "--font-lora",
// });

// export const montserrat = Montserrat({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-montserrat",
// });

// export const title = lora.className;
// export const titleH2 = montserrat.className;
// export const base = roboto.className;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const onCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };
  return (
    <main className={`min-h-screen w-full font-base bg-background `}>
      <HeroSection />
      {/* <RoomsSection /> */}
      {/* <ServiceSection /> */}
      <PrdocutCatalog
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
      <HowItWorks />
      <OurStory />
      {/* <LocationSection />*/}
      {/* <Testimonials /> */}
      <WhatsAppChatInput />
    </main>
  );
}
