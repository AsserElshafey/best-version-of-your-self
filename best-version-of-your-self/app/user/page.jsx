"use client";
import Nav from '@/components/Nav';
import React, { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import SideBar from '@/components/SideBar';
import Community from '@/components/Community';

const User = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  return (
    <ProtectedRoute>
      <div>
        <Nav />
        <div className='flex'>
          <div className='w-1/3'>
            <SideBar
              onSelectCommunity={setSelectedCommunity}
              selectedCommunity={selectedCommunity}
            />
          </div>
          <div className='w-2/3'>
            <Community community={selectedCommunity} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default User;
