"use client";
import { useState } from "react";
import {
  MantineProvider, ScrollArea, ActionIcon,
  Tooltip, Modal, Menu,
  TextInput, Textarea, NumberInput,
  Button
} from "@mantine/core";
import Image from "next/image";
import {
  EllipsisHorizontalIcon, PlusIcon,
  UserPlusIcon, UserMinusIcon,
  PencilSquareIcon, TrashIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/solid";
import { useDisclosure } from '@mantine/hooks';
import HabitCard from "./HabitCard";
import Background from "./Background";

const Community = ({ community, onBack }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedMenu, setOpened] = useState(false);

  return (
    <MantineProvider>
      <ScrollArea>
        <div className="fullscreen">
          <Background>
            <div className="flex-between p-2 pr-4 bg-gradient-to-r from-gray-800 via-slate-900 to-gray-700 border-b border-gray-500 fixed w-full md:w-2/3 z-50">
              <div className="flex items-center gap-2">
                <div className="block md:hidden">
                  <ActionIcon
                    variant="subtle"
                    size='xl'
                    radius='xl'
                    onClick={onBack}
                  >
                    <ArrowLeftIcon className="h-7 w-7 text-white" />
                  </ActionIcon>
                </div>
                <Image
                  src="/images/gigachad.jpg"
                  alt="Prmptopia Logo"
                  width={55}
                  height={55}
                  className="object-contain rounded-full"
                />
                <p className="font-semibold text-white text-lg">
                  {community.name}
                </p>
              </div>
              <Menu
                shadow="md"
                width={210}
                opened={openedMenu}
                onChange={setOpened}
                withArrow
              >
                <Menu.Target>
                  <ActionIcon variant="outline" color="gray" size="lg" radius="xl" aria-label="Settings">
                    <EllipsisHorizontalIcon className="h-8 w-8" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Manage community</Menu.Label>
                  <Menu.Item>
                    <Button
                      w={185}
                      leftSection={<UserPlusIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: 'green', to: 'cyan', deg: 90 }}
                    >
                      Add members
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      w={185}
                      leftSection={<UserMinusIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: 'red', to: 'cyan', deg: 190 }}
                    >
                      Remove members
                    </Button>
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item>
                    <Button
                      w={185}
                      leftSection={<PencilSquareIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                      onClick={open}
                    >
                      Edit Community
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      w={185}
                      leftSection={<TrashIcon className="w-5 h-5" />}
                      variant="gradient"
                      gradient={{ from: 'red', to: 'rgba(255, 130, 130, 1)', deg: 190 }}
                    >
                      Delete Community
                    </Button>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>

            <div className="flex flex-col items-center justify-center mx-4 md:mx-0">
              <div className="mb-20" />
              <HabitCard />
              <HabitCard />
              <HabitCard />
            </div>
            <div className="fixed bottom-10 right-4">
              <Tooltip label="New Habit">
                <ActionIcon
                  variant="gradient"
                  gradient={{ from: 'green', to: 'cyan', deg: 90 }}
                  size="xl"
                  radius="xl"
                  aria-label="Settings"
                  onClick={open}
                >
                  <PlusIcon className="h-6 w-6" />
                </ActionIcon>
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
          </Background>
        </div>
      </ScrollArea>
    </MantineProvider>
  );
};

export default Community;
