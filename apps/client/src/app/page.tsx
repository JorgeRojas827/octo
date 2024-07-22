import Footer from "@/modules/home/footer";
import Functions from "@/modules/home/functions";
import Header from "@/modules/home/header";
import Navbar from "@/modules/home/navbar";
import PoweredBadge from "@/modules/home/powered-badge";
import Testimonials from "@/modules/home/testimonials";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "@/common/helpers/client-provider";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col">
      <Provider session={session}>
        <Navbar />
        <Header />
        <PoweredBadge />
        <Functions />
        <Testimonials />
        <Footer />
      </Provider>
    </main>
  );
}
