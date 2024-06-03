import { useState } from "react";
import {
  HashtagIcon, HeartIcon,
  NewspaperIcon, CalendarDaysIcon,
  Cog8ToothIcon, EllipsisHorizontalIcon,
  PencilSquareIcon, TrashIcon
}
  from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import {
  MantineProvider, Avatar,
  Chip, Menu, Modal,
  ActionIcon, Button,
  TextInput, Textarea,
  NumberInput
}
  from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';


const HabitCard = ({data}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedMenu, setOpened] = useState(false);

  return (
    <MantineProvider>
      <div class="rounded-lg border shadow-md w-full max-w-md md:max-w-lg mb-5 bg-white">
        <div className='p-4'>
          <div className="flex-between gap-1 h-10">
            <div className="flex-start">
              <HashtagIcon className="h-7 w-7" /><p className='font-extrabold text-3xl'>{data.name}</p>
            </div>
            <div>
              <Menu
                shadow="md"
                width={200}
                opened={openedMenu}
                onChange={setOpened}
                withArrow
              >
                <Menu.Target>
                  <ActionIcon variant="subtle" color="rgba(60, 60, 60, 1)" size="xl" radius="xl" aria-label="Settings">
                    <EllipsisHorizontalIcon className="h-10 w-10" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Card Settings</Menu.Label>
                  <Menu.Item>
                    <Button
                      w={175}
                      leftSection={<PencilSquareIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                      onClick={open}
                    >
                      Edit Card
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      w={175}
                      leftSection={<TrashIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: 'red', to: 'rgba(255, 130, 130, 1)', deg: 190 }}
                    >
                      Delete Card
                    </Button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex-start ml-2">
              <NewspaperIcon className="h-7 w-5" /><p className='ml-2 text-xl font-semibold'>Details:</p>
            </div>
            <p className='ml-6 mt-2'>
              {data.description}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex-start ml-2">
              <HeartIcon className="h-7 w-5" /><p className='ml-2 text-xl font-semibold'>Motivation:</p>
            </div>
            <p className='ml-4 mt-2'>
              {data.motivation}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex-start ml-2">
              <Cog8ToothIcon className="h-7 w-7" /><p className='ml-2 text-xl font-semibold'>Frequency:</p>
            </div>
            <div className="grid grid-cols-2 gap-4 ml-4 mt-4">
              <div className="flex-center gap-2">
                <CalendarDaysIcon className="h-8 w-7" /><p className="font-semibold"><span className="text-lg">3</span> Days per Week</p>
              </div>
              <div className="flex-center gap-2">
                <ClockIcon className="h-8 w-8" /><p className="font-semibold">60 Mins</p>
              </div>
            </div>
          </div>
          <div className="flex-between mt-4 p-2">
            <Avatar.Group>
              <Avatar src="/images/gigachad.jpg" />
              <Avatar src="/images/gigachad.jpg" />
              <Avatar src="/images/gigachad.jpg" />
              <Avatar>+5</Avatar>
            </Avatar.Group>
            <Chip color="green" size="md" radius="md">Done</Chip>
          </div>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Edit Habit" centered>
        <TextInput
          className="mt-4"
          size="md"
          radius="md"
          label="Habit Title"
          withAsterisk
          placeholder="Input placeholder"
        />
        <Textarea
          className="mt-4"
          size="md"
          radius="md"
          label="Habit Details"
          withAsterisk
          placeholder="Input placeholder"
        />
        <Textarea
          className="mt-4"
          size="md"
          radius="md"
          label="Habit Motivation"
          withAsterisk
          placeholder="Input placeholder"
        />
        <div className="flex-between p-2 gap-10 mt-4">
          <NumberInput
            size="md"
            radius="md"
            label="Days per week"
            withAsterisk
            placeholder="Input placeholder"
            min={1}
            max={7}
          />
          <NumberInput
            size="md"
            radius="md"
            label="Duration"
            withAsterisk
            placeholder="In Mins"
            min={1}
          />
        </div>
        <div className="flex justify-end mt-8 mb-2">
          <Button
            leftSection={<PencilSquareIcon className="w-5 h-5" />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            size="md"
            radius="xl"
          >
            Edit
          </Button>
        </div>
      </Modal>
    </MantineProvider>
  )
}

export default HabitCard