'use client';

import React, { useState, useEffect } from 'react'
import { db } from '@/app/config/firebaseConfig'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code } from 'lucide-react';

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ListEvents = () => {
  const [events, setEvents] = useState([])

  // Get the URL of the current page dynamically
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Get the Title of the current page dynamically
  const title = typeof document !== 'undefined' ? document.title : 'Check out this awesome content!';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, orderBy('date', 'asc'), limit(3));
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
          <Card key={event.id} className="flex flex-col md:flex-row">
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
            <div className="w-full md:w-auto h-40 rounded-md mb-5">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="hidden md:flex flex-row justify-end mb-3 space-evenly items-center mt-1">
                <FacebookShareButton url={shareUrl} quote={title} className='mr-2' >
                  <FacebookIcon size={16} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title} className='mr-2' >
                  <TwitterIcon size={16} round />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title={title} className='mr-2' >
                  <WhatsappIcon size={16} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={shareUrl} title={title} className='mr-2' >
                  <LinkedinIcon size={16} round />
                </LinkedinShareButton>
              </div>
            </div>
            <div className="flex flex-row md:hidden md:flex-col justify-end md:justify-center mb-3 space-evenly items-center">
              <FacebookShareButton url={shareUrl} quote={title} className='mr-2' >
                <FacebookIcon size={24} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title} className='mr-2' >
                <TwitterIcon size={24} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={title} className='mr-2' >
                <WhatsappIcon size={24} round />
              </WhatsappShareButton>
              <LinkedinShareButton url={shareUrl} title={title} className='mr-2' >
                <LinkedinIcon size={24} round />
              </LinkedinShareButton>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

export default ListEvents
