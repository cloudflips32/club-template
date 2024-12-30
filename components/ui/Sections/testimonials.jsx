'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { db } from '@/app/config/firebaseConfig'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonialRef = collection(db, 'testimonials');
      const q = query(testimonialRef, orderBy('name', 'asc'))
      const querySnapshot = await getDocs(q);
      const newTestimonials = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(newTestimonials);
    };

    fetchTestimonials();
  }, []);

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
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonials
