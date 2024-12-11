import React, {useState, useEffect} from 'react'
import { getDocs, collection } from '@firebase/firestore'
import db from '@/app/config/firestore'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react';

const ListAdminEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const eventRef = collection(db, 'events')
    const querySnapshot = await getDocs(eventRef)
    setEvents(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id })))
  }

  return (
    <>
      {events.map((event) => (
        <li key={event.id} className="bg-gray-100 p-2 rounded flex justify-between items-start">
          <div>
            <strong>{new Date(event.date).toDateString()} at {event.time} {event.ampm}: {event.title}</strong>
            <p className="text-sm text-gray-600">{event.description}</p>
          </div>
          <div>
            <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </li>
      ))}
    </>
  )
}

export default ListAdminEvents
