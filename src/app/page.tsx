import HowItWorks from "@/components/layout/Sections/HowItWorks";
import HeroSection from "../components/layout/Sections/HeroSection";
import PrdocutCatalog from "../components/layout/Sections/ProductCatalog";
import WhatsAppChatInput from "@/components/ui/WhatsAppChatInput";

import OurStory from "@/components/layout/Sections/OurStory";
import LocationSection from "@/components/layout/Sections/LocationSection";
import { getProducts } from "@/lib/getProduct";
import { FeaturedWorks } from "@/components/layout/Sections/FeatureWorks";

import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";

const POSTS_QUERY = `*[_type == "product"] | order(name asc) {
  ...,
  "id": _id,
  "slug": slug.current,
  "imagen_url": imagen_url.asset->url
}`;
const options = { next: { revalidate: 30 } };
export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  return (
    <main
      className={`min-h-screen w-full font-base bg-background overflow-x-hidden`}
    >
      <HeroSection />
      {/* <RoomsSection /> */}
      {/* <ServiceSection /> */}
      <PrdocutCatalog posts={posts} />
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
