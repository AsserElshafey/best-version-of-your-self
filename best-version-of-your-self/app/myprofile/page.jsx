"use client"

import Nav from '@/components/Nav'
import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  MantineProvider, ScrollArea,
  FileButton, Button,
  TextInput, PasswordInput
} from "@mantine/core";
import { TrashIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/solid';
import Background from '@/components/Background';

const MyProfile = () => {

  const [file, setFile] = useState(undefined);
  const resetRef = useRef(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };


  return (
    <MantineProvider>
      <Background>
        <Nav />
        <div className='fullscreen flex-center py-3 px-3 md:px-0'>
          <div className='rounded-lg border shadow-md w-full max-w-md md:max-w-2xl bg-white h-full p-4 overflow-x-auto hide-scrollbar'>
            <div>
              <p className='text-4xl font-bold p-2 mb-5'>
                Profile Page
              </p>
            </div>
            <hr />
            <div className="flex items-end gap-4 p-4">
              <Image
                src={file ? URL.createObjectURL(file) : '/images/gigachad.jpg'}
                width={85}
                height={85}
                className="rounded-full mr-2"
                alt="profile-img"
              />
              <FileButton resetRef={resetRef} onChange={setFile} accept="image/png,image/jpeg">
                {(props) => <Button {...props}>Upload image</Button>}
              </FileButton>
              <Button disabled={!file} color="red" onClick={clearFile}>
                Reset
              </Button>
            </div>
            <div className='flex gap-4 my-4'>
              <TextInput
                className='w-1/2'
                label="First Name"
                placeholder="Input placeholder"
                disabled={!isEditable}
              />
              <TextInput
                className='w-1/2'
                label="Last Name"
                placeholder="Input placeholder"
                disabled={!isEditable}
              />
            </div>
            <div>
              <TextInput
                className='my-4'
                label="User Name"
                placeholder="Input placeholder"
                disabled={!isEditable}
              />
              <TextInput
                className='my-4'
                label="Email"
                placeholder="Input placeholder"
                disabled={!isEditable}
              />
              <PasswordInput
                className='my-4'
                label="Password"
                placeholder="Input placeholder"
                disabled={!isEditable}
              />
            </div>
            <div className='flex justify-end mt-8'>
              <Button
                leftSection={isEditable ? <CheckIcon className="w-5 h-5" /> : <PencilSquareIcon className="w-5 h-5" />}
                variant="gradient"
                gradient={isEditable ? { from: 'green', to: 'cyan', deg: 45 } : { from: 'blue', to: 'cyan', deg: 90 }}
                onClick={toggleEdit}
              >
                {isEditable ? 'Save' : 'Edit'}
              </Button>
            </div>
            <div>
              <p className='text-3xl font-semibold p-2 mt-10 text-red-600'>
                Danger Zone
              </p>
            </div>
            <hr />
            <div className='w-full flex justify-end mt-14'>
              <Button
                leftSection={<TrashIcon className="w-5 h-5" />}
                variant="gradient"
                gradient={{ from: 'red', to: 'rgba(255, 130, 130, 1)', deg: 190 }}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </Background>
    </MantineProvider>
  )
}

export default MyProfile