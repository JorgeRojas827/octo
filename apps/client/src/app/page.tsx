import Footer from "@/modules/home/footer";
import Functions from "@/modules/home/functions";
import Hero from "@/modules/home/hero";
import Navbar from "@/modules/home/navbar";
import PoweredBadge from "@/modules/home/powered-badge";
import Testimonials from "@/modules/home/testimonials";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <PoweredBadge />
      <Functions />
      <Testimonials />
      <Footer />
    </main>
  );
}
