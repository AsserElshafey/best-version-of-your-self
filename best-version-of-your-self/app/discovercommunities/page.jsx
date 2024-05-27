import Background from '@/components/Background'
import CommunityList from '@/components/CommunityList'
import Nav from '@/components/Nav'
import { Input, MantineProvider, ScrollArea } from '@mantine/core'
import React from 'react'

const page = () => {
  return (
    <MantineProvider>
      <Nav />
      <div className="fixed left-0 right-0 z-20 px-4 py-2 bg-white shadow-md">
        <Input
          type="text"
          placeholder="Search..."
        />
      </div>
      <ScrollArea className='fullscreen'>
        <Background>
          <div className='flex-center mt-16'>
            <CommunityList />
          </div>
        </Background>
      </ScrollArea>
    </MantineProvider>
  )
}

export default page