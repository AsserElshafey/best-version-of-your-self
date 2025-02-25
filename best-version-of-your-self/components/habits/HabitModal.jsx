"use client";
import React, { useState, useCallback } from 'react';
import { useDisclosure } from "@mantine/hooks";

import {
    ActionIcon,
    Tooltip,
    Modal,
    TextInput,
    Textarea,
    Button,
  } from "@mantine/core";
  import {
    PlusIcon,
  } from "@heroicons/react/24/solid";
  
export default function HabitModal({ addHabit }) {

    const [opened, { open: openFirst, close: closeFirst }] = useDisclosure(false);

    const [name, setHabitName] = useState("");
    const [description, setHabitDesc] = useState("");
    const [frequency, setHabitFrequency] = useState("");
    const [duration, setHabitDuration] = useState("");
    const [motivation, setHabitMotivation] = useState("");


    const handleSubmit = useCallback(
      async (e) => {
        e.preventDefault();
    
        try {
        await addHabit({
          title: name,
          description: description,
          motivation: motivation,
          interval: "daily",
        });
        setHabitName("");
        setHabitDesc("");
        setHabitFrequency(1);
        setHabitMotivation("");
        closeFirst();
        } catch (error) {
        alert(error);
        }
      },
      [name, description, frequency, motivation, duration]
    );
    
    return (
      <>
        <div className="fixed bottom-10 right-4">
        <Tooltip label="New Habit">
          <ActionIcon
            variant="gradient"
            gradient={{ from: "green", to: "cyan", deg: 90 }}
            size="xl"
            radius="xl"
            aria-label="Settings"
            onClick={openFirst}
          >
            <PlusIcon className="h-6 w-6" />
          </ActionIcon>
        </Tooltip>
        </div>
            <Modal
            opened={opened}
            onClose={closeFirst}
            title="New Habit"
            centered
            >
            <TextInput
            className="mt-4"
            size="md"
            radius="md"
            label="Habit Title"
            withAsterisk
            placeholder="Input placeholder"
            value={name}
            onChange={(e) => setHabitName(e.target.value)}
            />
            <Textarea
            className="mt-4"
            size="md"
            radius="md"
            label="Habit Details"
            withAsterisk
            placeholder="Input placeholder"
            value={description}
            onChange={(e) => setHabitDesc(e.target.value)}
            />
            <Textarea
            className="mt-4"
            size="md"
            radius="md"
            label="Habit Motivation"
            withAsterisk
            placeholder="Input placeholder"
            value={motivation}
            onChange={(e) => setHabitMotivation(e.target.value)}
            />
            <div className="flex-between p-2 gap-10 mt-4"></div>
            <div className="flex justify-end mt-8 mb-2">
            <Button
                leftSection={<PlusIcon className="w-5 h-5" />}
                variant="gradient"
                gradient={{ from: "green", to: "cyan", deg: 90 }}
                size="md"
                radius="xl"
                onClick={handleSubmit}
            >
                Create
            </Button>
            </div>
        </Modal>
      </>
    );
}