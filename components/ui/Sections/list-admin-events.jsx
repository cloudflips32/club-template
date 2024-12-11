import React, {useState, useEffect} from 'react'
import { getDocs, collection, deleteDoc, doc } from '@firebase/firestore'
import db from '@/app/config/firestore'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react';

const ListAdminEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const eventRef = collection(db, 'events')
      const querySnapshot = await getDocs(eventRef)
      setEvents(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id })))
    }
    fetchEvents()
  }, [])

  const handleEditEvent = (event) => {
    const [time, ampm] = event.time.split(' ')
    setEditingEvent({...event, time, ampm})
    setIsEditEventDialogOpen(true)
  }

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, 'events', id))
      fetchEvents() // Update the list of events to reflect the deletion
    } catch (error) {
      console.error("Error deleting event: ", error)
    }
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
