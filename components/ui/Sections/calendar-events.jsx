'use client'

import React, { useState, useEffect } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import db from '@/app/config/firestore'
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import AddEvents from './add-events'
import EditEvents, {handleEditEvent,handleDeleteEvent} from './edit-events'
import ListAdminEvents from './list-admin-events'

export default function CalendarAndEvents() {
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'))
      setEvents(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id })))
      } catch (error) {
      console.error("Error fetching events: ", error)
    }
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Club Calendar</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Events</h3>
          <ul className="space-y-2">
            <ListAdminEvents events={events} />
          </ul>
          <AddEvents events={events} />
        </div>
      </div>
      <EditEvents events={events} />
    </section>
  )
}