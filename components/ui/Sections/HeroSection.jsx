import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import "@/public/heroSection.scss";
import Link from 'next/link';

const MatrixEffect = ({particle}) => {
  // Toggle between "0" and "1" and update CSS accordingly
  // This will ensure each particle will have a unique pattern

  const particles = Array.from({ length: particle }, () => ( Math.random() > 0.5 ? "0" : "1") );
  
  const [matrixs, setMatrixs] = useState(particles);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixs((prevMatrixs) =>
        prevMatrixs.map((char) => (char === "0" ? "1" : "0")) 
      )
    }, 250)

    return () => clearInterval(interval)
  }, []);

  return (
    <div className="matrixs">
      {matrixs.map((char, index) => (
        <div 
          key={index} 
          className="matrix" 
          character={char}>
        </div>
      ))}
    </div>
  )
}

function HeroSection() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
        <div className='matrixs '>
          <MatrixEffect particle={50} />
        </div>    
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 
                className="text-3xl text-white 
                font-bold tracking-tighter 
                sm:text-4xl md:text-5xl lg:text-6xl/none
                border w-fit bg-gradient-to-r blur-xl absolute">
                Software Engineering Club
              </h1>
              <h1 
                className="text-3xl text-white 
                font-bold tracking-tighter 
                sm:text-4xl md:text-5xl lg:text-6xl/none relative
              ">
                FSW Software Engineering Club
              </h1>
              <p className="mx-auto max-w-[700px] text-white md:text-xl dark:text-gray-400">
                Improving the educational experience for programming students here at Florida SouthWestern State College. We review coding fundamentals, engage in workforce interview preparation, and promote the practice of constructive collaboration.
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