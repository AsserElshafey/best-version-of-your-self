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
        <div className="flex transition-all duration-300">
          <div className={`fixed inset-0 mt-81px md:mt-0 md:relative md:w-1/3 ${selectedCommunity ? 'translate-x-[-100%] md:translate-x-0' : 'translate-x-0'} transition-transform duration-300 ease-in-out`}>
            <SideBar
              onSelectCommunity={setSelectedCommunity}
              selectedCommunity={selectedCommunity}
            />
          </div>
          <div className={`w-full md:w-2/3 ml-0 md:ml-auto ${!selectedCommunity ? 'hidden md:block' : 'block'} transition-transform duration-300 ease-in-out`}>
            {selectedCommunity && (
              <Community
                community={selectedCommunity}
                onBack={() => setSelectedCommunity(null)}
              />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default User;
