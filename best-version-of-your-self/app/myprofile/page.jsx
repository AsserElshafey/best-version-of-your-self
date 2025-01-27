"use client"

import Nav from '@/components/Nav'
import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  MantineProvider, Modal,
  FileButton, Button,
  TextInput, PasswordInput
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { TrashIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/solid';
import Background from '@/components/Background';

const MyProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteButton, setDeleteButton] = useState(true);

  const handleClose = () => {
    setDeleteButton(true);
    close();
  };

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
                onClick={open}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Delete Profile modal */}
        <Modal opened={opened} onClose={handleClose} title="Delete Community" centered>
          <div className="text-center mb-4">
            <p className="text-3xl mb-2">
              Are you sure you want to delete <span className="font-bold">Your Account</span>?
            </p>

            <p>Once this action is done, it cannot be reversed.</p>
          </div>
          <TextInput
            className="mb-5"
            size="md"
            radius="md"
            label="Please type 'CONFIRM' to enable the delete button."
            placeholder="Please type CONFIRM here"
            onChange={(e) => {
              if (e.target.value === 'CONFIRM') {
                setDeleteButton(false);
              } else {
                setDeleteButton(true);
              }
            }}
          />
          <div className="flex-center gap-5">
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              leftSection={<TrashIcon className="w-5 h-5" />}
              variant="gradient"
              gradient={{ from: 'red', to: 'rgba(255, 130, 130, 1)', deg: 190 }}
              disabled={deleteButton}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </Background>
    </MantineProvider>
  )
}

export default MyProfile