"use client"
import Nav from '@/components/Nav'
import React from 'react'
import ProtectedRoute from '../../components/ProtectedRoute';

const user = () => {
  return (
    <ProtectedRoute>
      <div>
        <Nav />
        <div>user loged in</div>
      </div>
    </ProtectedRoute>
  )
}

export default user