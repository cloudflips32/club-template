import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, LogOut } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '@/app/config/firebaseConfig'

const AdminAside = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoginCredentials({ email: '', password: '' });
      setIsAuthenticated(false);
      // If successful, onAuthStateChanged will update the state
    } catch (error) {
      console.error("Error signing out with Firebase", error);
    }
  }

  return (
    <>
      <aside className="w-64 hidden lg:block bg-white shadow-md">
        <nav className="mt-6">
          <Link href="#" className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Link>
          <Link href="/" onClick={handleLogout} className="flex items-center px-4 py-2 mt-2 text-gray-600 hover:bg-gray-200">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Link>
        </nav>
      </aside>
    </>
  )
}

export default AdminAside
