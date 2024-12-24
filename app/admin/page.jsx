'use client';

import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/app/config/firebaseConfig'
import AdminAside from '@/components/ui/admin-aside'
import AdminHeader from '@/components/ui/admin-header'
import CalendarAndEvents from '@/components/ui/admin-calendar-events'
import Members from '@/components/ui/Sections/members'
import AdminFAQ from '@/components/ui/admin-faq'
import AdminAuth from '@/components/ui/admin-auth'

export default function AdminDashboard({ handleLogin,handleLogout }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
    })

    return () => unsubscribe()
  }, []);

  if(!isAuthenticated) { 
    return <AdminAuth handleLogin={handleLogin} /> 
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100 mr-4">
        <AdminHeader handleLogout={handleLogout} />
        <AdminAside handleLogout={handleLogout} />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mr-4 mb-6">Admin Dashboard</h1>
      {/* Admin Components */}
          <Members />
          <CalendarAndEvents />
          <AdminFAQ />
        </main>
      </div>
    </>
  )
}
