import Header from "@/components/ui/Sections/header";
import Footer from "@/components/ui/Sections/footer";
import About from "@/components/ui/Sections/about";
import ClubEvents from "@/components/ui/Sections/events";
import FAQ from "@/components/ui/Sections/faq";
import Join from "@/components/ui/Sections/join";
import Testimonials from "@/components/ui/Sections/testimonials";
import HeroSection from "@/components/ui/Sections/hero";
import Employment from "@/components/ui/Sections/employment";


export default function Component() {
  return (
    <div className="flex flex-col min-h-screen from-slate-50 to-slate-100 bg-gradient-to-tr">
      <Header />
      <main className="relative flex-1 bg-gradient-to-tr from-violet-700 to-blue-800">
        <HeroSection />
        <About />
        <ClubEvents />
        <Employment />
        <FAQ />
        <Testimonials />
        <Join />
      </main>
      <Footer />
    </div>
  );
}
