"use client"
import Nav from '@/components/Nav'
import React from 'react'
import ProtectedRoute from '../../components/ProtectedRoute';
import SideBar from '@/components/SideBar';
import Community from '@/components/Community';

const user = () => {
  return (
    <ProtectedRoute>
      <div>
        <Nav />
        <div className='flex'>
          <div className='w-1/3'>
            <SideBar />
          </div>
          <div className='w-2/3'>
            <Community />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default user