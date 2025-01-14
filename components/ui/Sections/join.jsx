import SignUpForm from "@/components/formComponents/SignUpForm";

const Join = () => {
  return (
    <>
      <section id="join" className="relative h-full w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="images/8199326-hd_1920_1080_25fps.mp4" alt="meeting" />
          Your browser does not support the video tag.
        </video>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Software Engineering Club
              </h2>
              <p className="mx-auto max-w-[600px] md:text-xl dark:text-gray-400 text-white">
                Be part of a community that's shaping the future of software engineering.
              </p>
            </div>
            <SignUpForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default Join;