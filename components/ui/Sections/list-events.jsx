import React, { useState,useEffect} from 'react'
import { db } from '@/app/config/firebaseConfig'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ListEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, orderBy('date', 'asc'),limit(3));
        const querySnapshot = await getDocs(q);
        const newEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(newEvents);
      } catch (error) {
        console.error("Error fetching events: ", error)
      }
    }
    fetchEvents()
  }, [])

  return (
    <>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
        <Card key={event.id} className="flex overflow-hidden">
          <div className="flex-grow">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><span className='font-semibold'>
                Date:</span> {new Date(event.date).toLocaleDateString()}</p>
              <p><span className='font-semibold'>Time:</span> {event.time}</p>
            </CardContent>
          </div>
          <div className="w-2/5 overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </Card>
        ))}
      </div>
    </>
  )
}

export default ListEvents
