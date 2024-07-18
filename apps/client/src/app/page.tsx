import Footer from "@/components/Footer";
import Functions from "@/components/Home/Functions";
import Header from "@/components/Home/Header";
import Navbar from "@/components/Home/Navbar";
import PoweredBadge from "@/components/Home/PoweredBadge";
import Testimonials from "@/components/Home/Testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Header />
      <PoweredBadge />
      <Functions />
      <Testimonials />
      <Footer />
    </main>
  );
}
