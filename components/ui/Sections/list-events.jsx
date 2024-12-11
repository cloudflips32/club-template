import React, { useState,useEffect} from 'react'
import db from '@/app/config/firestore'
import { collection, getDocs } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ListEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'))
      setEvents(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id })))
    }
    fetchEvents()
  }, [])

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><span className='font-semibold'>
              Date:</span> {new Date(event.date).toLocaleDateString()}</p>
            <p><span className='font-semibold'>Time:</span> {event.time}</p>
          </CardContent>
        </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>AI & Machine Learning Seminar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: July 5, 2024</p>
            <p>Time: 1:00 PM - 4:00 PM</p>
            <p>Location: Virtual Event</p>
          </CardContent>`
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ML & Backend Convention</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: December 5, 2024</p>
            <p>Time: 1:00 PM - 4:00 PM</p>
            <p>Location: Virtual Event</p>
          </CardContent>`
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hackathon: Code for Good</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Date: August 20-22, 2024</p>
            <p>Time: 48-hour event</p>
            <p>Location: Innovation Center</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ListEvents
