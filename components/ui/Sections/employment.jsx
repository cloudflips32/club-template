'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/config/firebaseConfig'

const Employment = () => {
  const [employers, setEmployers] = useState([])

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const employersRef = collection(db, 'employers');
        const querySnapshot = await getDocs(employersRef);
        const allEmployers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const shuffled = allEmployers.sort(() => 0.5 - Math.random());

        const randomEmployers = shuffled.slice(0,5);

        setEmployers(randomEmployers);
      } catch (error) {
        console.error("Error fetching employers: ", error)
      }
    }
    fetchEmployers()
  }, [])

  return (
    <section id="employment" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl sm:text-4xl font-bold text-center lg:mb-20 md:mb-20 mb-10">Are You Ready? Internship Opportunities Available:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {employers.map((employer) => (
            <div key={employer.id} className="bg-white content-center items-center space-around p-6 rounded-lg shadow-md">
            <Link className="flex flex-col items-left justify-center text-gray-600 text-sm text-center" href={employer.recruitLink} aria-label="Find Your Career">
              <img src={employer.logo} alt={`${employer.name} Logo`} width={40} height={40} className="mx-auto my-2 mb-4" />
              <h3 className="text-xl font-medium mb-2 text-center">{employer.name}</h3>
            </Link>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Employment;