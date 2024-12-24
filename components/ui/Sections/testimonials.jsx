import * as React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

const Testimonials = () => {
  return (
    <>
      <section
        id="testimonials"
        className="w-full py-12 md:py-24 lg:py-32 bg-slate-100 dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-black lg:mb-24 mb-12">
            Hear What Members Have To Say
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  Melissa E
                </CardTitle>
                <CardDescription>
                  Vice President
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>"There's no better feeling than being part of a community that supports and encourages you to grow."</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Zachariah D</CardTitle>
                <CardDescription>
                Member
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>"Has been a great experience! The club has helped me grow as a developer and connect with like-minded individuals."</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Christopher G</CardTitle>
                <CardDescription>
                Secretary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>"I have learned so much from the club and have made some amazing friends along the way."</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonials
