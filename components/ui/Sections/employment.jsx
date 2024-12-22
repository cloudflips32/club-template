import * as React from 'react';
import ListEmployers from '../list-employers';

const Employment = () => {

  return (
    <section id="employment" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl sm:text-4xl font-bold text-center lg:mb-20 md:mb-20 mb-10">Are You Ready? Internship Opportunities Available:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
         <ListEmployers />
        </div>
      </div>
    </section>
  );
};

export default Employment;