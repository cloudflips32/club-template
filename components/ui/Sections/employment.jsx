import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

const employers = [
  { 
    name: "Google", 
    logo: "/logos/google.png",
    recruitLink: "https://careers.google.com/"
  },
  { 
    name: "Microsoft", 
    logo: "/logos/microsoft.png",
    recruitLink: "https://careers.microsoft.com/"
  },
  { 
    name: "Amazon", 
    logo: "/logos/amazon.png",
    recruitLink: "https://www.amazon.jobs/"
  },
  { 
    name: "Meta", 
    logo: "/logos/meta.png",
    recruitLink: "https://www.metacareers.com/" 
  },
  { 
    name: "Apple", 
    logo: "/logos/apple.png",
    recruitLink: "https://www.apple.com/jobs/us/"
  },
  { 
    name: "Netflix", 
    logo: "/logos/netflix.png",
    recruitLink: "https://jobs.netflix.com/"
  },
  { 
    name: "Spotify", 
    logo: "/logos/spotify.png", 
    recruitLink: "https://www.spotify.com/us/jobs/" 
  },
  { 
    name: "Uber", 
    logo: "/logos/uber.png", 
    recruitLink: "https://www.uber.com/us/en/careers/" 
  },
  { 
    name: "Airbnb", 
    logo: "/logos/airbnb.png", 
    recruitLink: "" 
  },
  { 
    name: "Salesforce", 
    logo: "/logos/salesforce.png", 
    recruitLink: "https://www.salesforce.com/company/careers/" 
  },
  { 
    name: "Adobe", 
    logo: "/logos/adobe.png", 
    recruitLink: "https://careers.adobe.com/us/en/home" 
  },
  { 
    name: "Tesla", 
    logo: "/logos/tesla.png", 
    recruitLink: "https://www.tesla.com/careers" 
  },
  { 
    name: "SpaceX", 
    logo: "/logos/spacex.png", 
    recruitLink: "https://www.spacex.com/careers/index.html" 
  },
];

const getRandomEmployers = (num) => {
  if (num > employers.length) {
    console.warn("Not enough employers in the list to select that many.");
    return employers.slice();
  }
  const shuffled = [...employers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Employment = () => {
  const randomEmployers = getRandomEmployers(5);

  return (
    <section id="employment" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl sm:text-4xl font-bold text-center mb-8">Potential Employers Include:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {randomEmployers.map((company) => (
            <div key={company.name} className="bg-white content-center items-center space-around p-6 rounded-lg shadow-md">
              <Link className="flex flex-col items-left justify-center text-gray-600 text-sm text-center" href={company.recruitLink} aria-label="Find Your Career">
                <Image src={company.logo} alt={`${company.name} Logo`} width={40} height={40} className="mx-auto my-2 mb-4" />
                <h3 className="text-xl font-medium mb-2 text-center">{company.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Employment;