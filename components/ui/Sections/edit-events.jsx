import React, {useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const EditEvents = () => {
  const [date, setDate] = useState(new Date())
  const [editingEvent, setEditingEvent] = useState(null)
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false)

  const handleSaveEventEdit = async () => {
    if (editingEvent) {
      const updatedEvent = {
        ...editingEvent,
        time: `${editingEvent.time} ${editingEvent.ampm}`
      }
      try {
        await updateDoc(doc(db, 'events', editingEvent.id), updatedEvent)
        setIsEditEventDialogOpen(false)
        setEditingEvent(null)
      } catch (error) {
        console.error("Error updating event: ", error)
      }
    }
  }

  const handleEditEvent = (event) => {
    const [time, ampm] = event.time.split(' ')
    setEditingEvent({...event, time, ampm})
    setIsEditEventDialogOpen(true)
  }

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, 'events', id))
    } catch (error) {
      console.error("Error deleting event: ", error)
    }
  }



  return (
    <>
      <Dialog open={isEditEventDialogOpen} onOpenChange={setIsEditEventDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Make changes to the event details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-event-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-event-title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-event-time" className="text-right">
                  Time
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Select
                    value={editingEvent.time}
                    onValueChange={(value) => setEditingEvent({ ...editingEvent, time: value })}
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
                    value={editingEvent.ampm}
                    onValueChange={(value) => setEditingEvent({ ...editingEvent, ampm: value })}
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
                <Label htmlFor="edit-event-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-event-description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEventEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditEvents
