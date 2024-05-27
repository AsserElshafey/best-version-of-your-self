'use client'
import HabitCard from '@/components/HabitCard'
import Nav from '@/components/Nav'
import { useDisclosure } from '@mantine/hooks';
import {
  MantineProvider, ScrollArea, ActionIcon,
  Tooltip, Modal,
  TextInput, Textarea, NumberInput,
  Button
} from "@mantine/core";
import { PlusIcon } from '@heroicons/react/24/solid';

const MyHabits = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MantineProvider>
      <Nav />
      <ScrollArea className='fullscreen bg-gradient-to-br from-[#acbeab] to-[#3a3a3a]  w-full '>
        <div className='flex flex-col items-center mt-2 mx-2 md:mx-0 mybg'>
          <HabitCard />
          <HabitCard />
          <HabitCard />
          <HabitCard />

        </div>
        <div className="fixed bottom-10 right-4 block md:hidden">
          <Tooltip label="New Habit">
            <ActionIcon
              variant="gradient"
              gradient={{ from: 'green', to: 'cyan', deg: 90 }}
              size="xl"
              radius="xl"
              aria-label="Settings"
              onClick={open}
            >
              <PlusIcon className="h-8 w-8" />
            </ActionIcon>
          </Tooltip>
        </div>
        <div className="fixed bottom-10 right-4 hidden md:block">
          <Tooltip label="Create New Habit">
            <Button
              variant="gradient"
              gradient={{ from: 'green', to: 'cyan', deg: 90 }}
              size="lg"
              radius="xl"
              leftSection={<PlusIcon className="h-7 w-7" />}
              onClick={open}
            >
              New Habit
            </Button>
          </Tooltip>
        </div>
        <Modal opened={opened} onClose={close} title="New Habit" centered>
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
              leftSection={<PlusIcon className="w-5 h-5" />}
              variant="gradient"
              gradient={{ from: 'green', to: 'cyan', deg: 90 }}
              size="md"
              radius="xl"
            >
              Create
            </Button>
          </div>
        </Modal>
      </ScrollArea>
    </MantineProvider>
  )
}

export default MyHabits