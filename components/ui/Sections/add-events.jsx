import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import db from '@/app/config/firestore';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const AddEvents = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', time: '09:00', ampm: 'AM' });
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      setEvents(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events. Please try again later.');
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleAddEvent = async () => {
    if (date && newEvent.title) {
      try {
        const eventDateTime = new Date(date);
        let [hours, minutes] = newEvent.time.split(':');
        hours = parseInt(hours, 10);
        if (newEvent.ampm === 'PM' && hours !== 12) {
          hours += 12;
        } else if (newEvent.ampm === 'AM' && hours === 12) {
          hours = 0;
        }
        eventDateTime.setHours(hours, parseInt(minutes, 10));

        const newEventObj = {
          date: eventDateTime.toISOString(),
          title: newEvent.title,
          description: newEvent.description,
          time: `${newEvent.time} ${newEvent.ampm}`,
        };
        await addDoc(collection(db, 'events'), newEventObj);
        setNewEvent({ date: '', title: '', description: '', time: '09:00', ampm: 'AM' });
        setIsAddEventDialogOpen(false); // Close the modal
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error adding event:', error);
        setError('Error adding event. Please try again later.');
      }
    }
  };
  
  return (
    <>
      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event for the selected date. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                Title
              </Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-time" className="text-right">
                Time
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Select
                  value={newEvent.time}
                  onValueChange={(value) => setNewEvent({ ...newEvent, time: value })}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={newEvent.ampm}
                  onValueChange={(value) => setNewEvent({ ...newEvent, ampm: value })}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="AM/PM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="event-description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddEvent}>Save Event</Button>
          </DialogFooter>
        </DialogContent>
        {error && <div className="text-red-500">{error}</div>}
      </Dialog>
    </>
  )
}

export default AddEvents
