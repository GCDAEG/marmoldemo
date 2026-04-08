import HowItWorks from "@/components/layout/Sections/HowItWorks";
import HeroSection from "../components/layout/Sections/HeroSection";
import PrdocutCatalog from "../components/layout/Sections/ProductCatalog";
import WhatsAppChatInput from "@/components/ui/WhatsAppChatInput";

import OurStory from "@/components/layout/Sections/OurStory";
import LocationSection from "@/components/layout/Sections/LocationSection";
import { getProducts } from "@/lib/getProduct";
import { FeaturedWorks } from "@/components/layout/Sections/FeatureWorks";

export default async function Home() {
  const initialProducts = await getProducts();

  return (
    <main className={`min-h-screen w-full font-base bg-background `}>
      <HeroSection />
      {/* <RoomsSection /> */}
      {/* <ServiceSection /> */}
      <PrdocutCatalog initialProducts={initialProducts} />
      <FeaturedWorks />
      <HowItWorks />
      <OurStory />
      <LocationSection />
      {/* <LocationSection />*/}
      {/* <Testimonials /> */}
      <WhatsAppChatInput />
    </main>
  );
}
