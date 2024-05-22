"use client";
import { useState } from "react";
import { MantineProvider, ScrollArea, ActionIcon, Tooltip, Modal, Menu } from "@mantine/core";
import Image from "next/image";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useDisclosure } from '@mantine/hooks';
import HabitCard from "./HabitCard";

const Community = ({ community }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedMenu, setOpened] = useState(false);

  if (!community) {
    return (<div className="flex-center fullscreen">
      Select a community to view its details
    </div>);
  }

  return (
    <MantineProvider>
      <ScrollArea>
        <div className="fullscreen bg-gray-100">
          <div className="flex-between p-2 pr-4 bg-gradient-to-r from-gray-800 via-slate-900 to-gray-700 border-b border-gray-500 fixed w-2/3 z-50">
            <div className="flex items-center gap-2">
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
              width={200}
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
                <Menu.Label>Application</Menu.Label>
                <Menu.Item>
                  sdfsfd
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="mb-20" />
            <HabitCard />
            <HabitCard />
            <HabitCard />
          </div>
          <div className="fixed bottom-10 right-4">
            <Tooltip label="New Habit">
              <ActionIcon variant="filled" color="rgba(16, 166, 0, 1)" size="xl" radius="xl" aria-label="Settings" onClick={open}>
                <PlusIcon className="h-6 w-6" />
              </ActionIcon>
            </Tooltip>
          </div>
          <Modal opened={opened} onClose={close} title="Authentication" centered>
            {/* Modal content */}
          </Modal>
        </div>
      </ScrollArea>
    </MantineProvider>
  );
};

export default Community;
