import ListFAQs from "../list-faqs"

const FAQ = () => {

  return (
    <>
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-6 md:px-8 mx-auto">
          <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl text-center lg:mb-24 mb-6">
            Frequently Asked Questions
          </h2>
          <ListFAQs />
        </div>
      </section>
    </>
  )
}

export default FAQ