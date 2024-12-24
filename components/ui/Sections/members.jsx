'use client';

import React, {useState} from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Mock data for club members
const initialClubMembers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'President', joinedAt: '2023-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Vice President', joinedAt: '2023-02-01' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Secretary', joinedAt: '2023-02-15' },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Treasurer', joinedAt: '2023-03-01' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Member', joinedAt: '2023-03-15' },
]

const Members = () => {
  const [clubMembers, setClubMembers] = useState(initialClubMembers)
  const [editingMember, setEditingMember] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleDeleteMember = (id) => {
    setClubMembers(clubMembers.filter(member => member.id !== id))
  }

  const handleEditMember = (id) => {
    const memberToEdit = clubMembers.find(member => member.id === id)
    if (memberToEdit) {
      setEditingMember(memberToEdit)
      setIsEditDialogOpen(true)
    }
  }

  const handleSaveEdit = () => {
    if (editingMember) {
      setClubMembers(clubMembers.map(member => 
        member.id === editingMember.id ? editingMember : member
      ))
      setIsEditDialogOpen(false)
      setEditingMember(null)
    }
  }

  return (
    <>
      <section id="members" className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Club Members</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clubMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{new Date(member.joinedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEditMember(member.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMember(member.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Make changes to the member's information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Members
