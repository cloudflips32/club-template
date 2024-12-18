'use client';

import React, { useState, useEffect } from 'react'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } 
  from '@/components/ui/dialog'
import AdminAside from '@/components/ui/admin-aside';
import AdminHamburger from '@/components/ui/admin-hamburger';
import CalendarAndEvents from '@/components/ui/Sections/calendar-events'
import Members from '@/components/ui/Sections/members'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { auth } from '@/app/config/firebaseConfig'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setIsLoginModalOpen(false);
      } else {
        setIsAuthenticated(false);
        setIsLoginModalOpen(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password);
    } catch (error) {
      console.error("Error signing in with Firebase", error);
      alert('Invalid credentials');
    }
  }

  if (!isAuthenticated) {
    return (
      /* Admin login modal */
      /* Admin login modal */
      /* Admin login modal */
      /* Admin login modal */
      /* Admin login modal */
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>
              Enter your credentials to access the admin dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={loginCredentials.email}
                onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleLogin}>Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
    {/* HAMBURGER MENU */}
      <div className="flex h-screen bg-gray-100 mr-4">
        <header className="px-4 lg:px-6 h-14 flex items-center my-4">
          <AdminHamburger />
        </header>
      {/* Sidebar */}
        <AdminAside signOut={signOut} />
      {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mr-4 mb-6">Admin Dashboard</h1>
      {/* Admin Components */}
          <Members />
          <CalendarAndEvents isAuthenticated={isAuthenticated} />
        </main>
      </div>
    </>
  )
}