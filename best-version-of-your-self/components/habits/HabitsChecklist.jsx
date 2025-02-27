import { useState } from "react";
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { MantineProvider, Menu, ActionIcon, Skeleton } from "@mantine/core";
import { useCommunityHabits } from "@/hooks/useCommunityHabits";
import HabitModal from "@/components/habits/HabitModal";
import { useDisclosure } from "@mantine/hooks";

const HabitsChecklist = ({ communityId }) => {
  const {
    habits,
    addHabit,
    deleteHabit,
    updateLog,
    loading,
    actionLoading,
    actionHabitId,
  } = useCommunityHabits(communityId);

  const [openedMenuId, setOpenedMenuId] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const toggleHabit = async (id) => {
    const habit = habits.find((h) => h.id === id);
    if (!habit || !habit.habitLogs || habit.habitLogs.length === 0) return;

    try {
      const currentStatus = habit.habitLogs[habit.habitLogs.length - 1].status;
      const newStatus = currentStatus === "completed" ? "missed" : "completed";
      await updateLog(id, localStorage.getItem("userId"), newStatus);
    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Loading skeleton for habit cards
  const HabitCardSkeleton = () => (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-between space-x-3">
      <div className="flex items-center space-x-3 w-full">
        <Skeleton height={24} width={24} radius="sm" />
        <Skeleton height={20} width="70%" radius="sm" />
      </div>
      <Skeleton height={36} width={36} radius="xl" />
    </div>
  );

  return (
    <MantineProvider>
      <div className="w-full max-w-4xl mx-auto p-6 relative">
        {/* Header */}
        <div className="mb-6 mt-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Habits</h1>
          <p className="text-gray-500">{currentDate}</p>
        </div>

        {/* Habits List */}
        <div className="space-y-4 mb-6">
          {loading ? (
            <div className="space-y-4">
              <HabitCardSkeleton />
              <HabitCardSkeleton />
              <HabitCardSkeleton />
            </div>
          ) : habits.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No habits added yet. Start by adding one!
            </p>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-3 relative"
              >
                {/* Individual habit loading overlay */}
                {actionLoading && actionHabitId === habit.id && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
                    <Skeleton height={20} width={20} radius="xl" />
                  </div>
                )}

                {/* Left Section: Checkbox and Habit Title */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-6 h-6 flex items-center justify-center rounded border ${
                      habit.habitLogs &&
                      habit.habitLogs.length > 0 &&
                      habit.habitLogs[habit.habitLogs.length - 1].status ===
                        "completed"
                        ? "bg-primary-dark border-primary text-white"
                        : "bg-white border-gray-300"
                    }`}
                    aria-label={
                      habit.habitLogs &&
                      habit.habitLogs.length > 0 &&
                      habit.habitLogs[habit.habitLogs.length - 1].status ===
                        "completed"
                        ? "Mark as incomplete"
                        : "Mark as complete"
                    }
                    disabled={actionLoading}
                  >
                    {habit.habitLogs &&
                      habit.habitLogs.length > 0 &&
                      habit.habitLogs[habit.habitLogs.length - 1].status ===
                        "completed" && (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                  </button>
                  <span className="text-lg text-gray-800">{habit.title}</span>
                </div>

                {/* Right Section: Menu Icon */}
                <div className="flex-row items-center space-x-2">
                  <div>
                    <Menu
                      shadow="md"
                      width="w-48 sm: w-1/4"
                      opened={openedMenuId === habit.id}
                      onChange={(isOpen) =>
                        setOpenedMenuId(isOpen ? habit.id : null)
                      }
                      withArrow
                    >
                      <Menu.Target>
                        <ActionIcon
                          variant="subtle"
                          color="rgba(60, 60, 60, 1)"
                          size="xl"
                          radius="xl"
                          aria-label="Settings"
                          disabled={actionLoading}
                        >
                          <EllipsisHorizontalIcon className="h-5 w-5" />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Label>Card Settings</Menu.Label>
                        <Menu.Item
                          icon={<PencilSquareIcon className="w-5 h-5" />}
                          onClick={open}
                        >
                          Edit Habit
                        </Menu.Item>
                        <Menu.Item
                          icon={<TrashIcon className="w-5 h-5" />}
                          onClick={() => deleteHabit(habit.id)}
                          color="red"
                        >
                          Delete Habit
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <HabitModal addHabit={addHabit} />
      </div>
    </MantineProvider>
  );
};

export default HabitsChecklist;
