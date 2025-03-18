"use client";
import React, { useState, useCallback } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  Tooltip,
  Modal,
  TextInput,
  Textarea,
  Button,
  Alert,
  LoadingOverlay,
} from "@mantine/core";
import { PlusIcon } from "@heroicons/react/24/solid";
import { AlertTriangle } from "lucide-react";

export default function HabitModal({ addHabit }) {
  const [opened, { open: openFirst, close: closeFirst }] = useDisclosure(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    motivation: "",
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form fields
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      motivation: "",
    });
    setError("");
  };

  // Handle modal close
  const handleClose = () => {
    resetForm();
    closeFirst();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      // Validate form
      if (!formData.name.trim()) {
        setError("Habit title is required");
        return;
      }

      setLoading(true);
      try {
        await addHabit({
          title: formData.name,
          description: formData.description,
          motivation: formData.motivation,
          interval: "daily",
        });

        // Reset form and close modal on success
        resetForm();
        closeFirst();
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to create habit. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, addHabit, closeFirst]
  );

  return (
    <>
      <div className="fixed bottom-10 right-4">
        <Tooltip label="New Habit">
          <ActionIcon
            size="xl"
            radius="xl"
            color="black"
            aria-label="Create New Habit"
            onClick={openFirst}
          >
            <PlusIcon className="h-6 w-6" />
          </ActionIcon>
        </Tooltip>
      </div>

      <Modal opened={opened} onClose={handleClose} title="New Habit" centered>
        <div className="relative p-2">
          <LoadingOverlay
            visible={loading}
            overlayProps={{ blur: 2 }}
            loaderProps={{ size: "md" }}
          />

          {error && (
            <Alert
              icon={<AlertTriangle size={16} />}
              title="Error"
              color="red"
              className="mb-4"
              withCloseButton
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}

          <TextInput
            className="mt-4"
            size="md"
            radius="md"
            label="Habit Title"
            withAsterisk
            placeholder="What habit would you like to build?"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!formData.name && error ? "Required" : ""}
            disabled={loading}
          />

          <Textarea
            className="mt-4"
            size="md"
            radius="md"
            label="Habit Details"
            placeholder="Describe the details of this habit"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />

          <Textarea
            className="mt-4"
            size="md"
            radius="md"
            label="Habit Motivation"
            placeholder="Why is this habit important to you?"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            disabled={loading}
          />

          <div className="flex justify-end mt-8 mb-2">
            <Button
              leftSection={<PlusIcon className="w-5 h-5" />}
              variant="gradient"
              gradient={{ from: "green", to: "cyan", deg: 90 }}
              size="md"
              radius="xl"
              onClick={handleSubmit}
              loading={loading}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
