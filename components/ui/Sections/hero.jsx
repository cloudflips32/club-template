import { Button } from "@/components/ui/button"
import "@/public/heroSection.scss";
import Link from 'next/link';
import MatrixEffect from "../matrix-effect";

function HeroSection() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
        <div className='matrixs'>
          <MatrixEffect particle={50} />
        </div>    
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 
                className="text-3xl text-white 
                font-bold tracking-tighter 
                sm:text-4xl md:text-5xl lg:text-6xl/none
                border w-fit bg-gradient-to-r blur-xl absolute lg:mb-24 mb-16 ml-44">
                Sample Club
              </h1>
              <h1 
                className="text-3xl text-white 
                font-bold tracking-tighter 
                sm:text-4xl md:text-5xl lg:text-6xl/none relative lg:mb-24 mb-16
              ">
                Sample Club
              </h1>
              <p className="mx-auto max-w-[700px] text-white md:text-xl dark:text-gray-400">
                Improving the educational experience for potential programmers here at the Sample Technology club. We review coding fundamentals, engage in workforce interview preparation, and promote the practice of constructive collaboration. We are a community of like-minded individuals who are passionate about technology and want to help each other succeed.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="#join">
                <Button>Join Now</Button>
              </Link>
              <Link href="#faq">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection