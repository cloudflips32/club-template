import { useState } from "react";
import React from "react";

function MemberCard() {

  const [dropIsDown, setDropIsDown] = useState(false);  

  const seedMemberData = [
    {id: 1, name: 'Melissa Elizondo', bio: '☀️♈ ● 🌙♈ ● ⬆️♊ ● ENTP ● I like coding :p ', image: 'https://i.pinimg.com/enabled_hi/564x/64/8b/bf/648bbfd67197bd5d2beacd9de37f608d.jpg' },
    {id: 2, name: 'Elissa Ayalem Fonseca Saybe', bio: '(っ◔◡◔)っ ♡ it’s a perfect love ♡ she/they', image: 'https://pbs.twimg.com/media/GZ7_h9nb0AIg_It?format=jpg&name=4096x4096' },
    {id: 3, name: 'Kiana Leal', bio: "yup this is the bio, that's it" , image: 'https://i.pinimg.com/736x/1b/6c/dc/1b6cdcb0ca861bd72c795a165e29247c.jpg' },
    {id: 4, name: 'Melissa Elizondo', bio: '☀️♈ ● 🌙♈ ● ⬆️♊ ● ENTP ● I like coding :p ', image: 'https://i.pinimg.com/enabled_hi/564x/64/8b/bf/648bbfd67197bd5d2beacd9de37f608d.jpg' },
    {id: 5, name: 'Elissa Ayalem Fonseca Saybe', bio: '(っ◔◡◔)っ ♡ it’s a perfect love ♡ she/they', image: 'https://pbs.twimg.com/media/GZ7_h9nb0AIg_It?format=jpg&name=4096x4096' },
    {id: 6, name: 'Kiana Leal', bio: "yup this is the bio, that's it" , image: 'https://i.pinimg.com/736x/1b/6c/dc/1b6cdcb0ca861bd72c795a165e29247c.jpg' },

  ]

  const populateMembers = seedMemberData.map((member) => 
    <div key={member.id} className="p-2 flex justify-center">
      <div className="content-center">
        <img className="h-44 w-44 rounded-full object-cover mx-auto" src={member.image} alt={member.name}
        ></img>
        <p className="text-center p-4 font-sans font-bold">{member.name}</p>
      </div>
    </div>
  )

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="
          text-3xl font-bold tracking-tighter 
          sm:text-4xl md:text-5xl text-center mb-8"
          onClick={() => setDropIsDown(!dropIsDown)}> View Members ▷</h2>
          {dropIsDown && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-center justify-items-center">
              {populateMembers}
            </div> )}
          </div>
      </section>
    </>
  )
}

export default MemberCard 