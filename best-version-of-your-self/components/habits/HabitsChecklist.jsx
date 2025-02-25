import { useState } from "react";
import {
  HashtagIcon,
  HeartIcon,
  NewspaperIcon,
  CalendarDaysIcon,
  Cog8ToothIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { MantineProvider, Avatar, Menu, ActionIcon } from "@mantine/core";
import { useCommunityHabits } from "@/hooks/useCommunityHabits";
import HabitModal from "@/components/habits/HabitModal";
import { useDisclosure } from "@mantine/hooks";

const HabitsChecklist = ({ communityId }) => {
  const { habits, addHabit, deleteHabit } = useCommunityHabits(communityId);
  const [openedMenuId, setOpenedMenuId] = useState(null); // Track which menu is open
  const [opened, { open, close }] = useDisclosure(false);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <MantineProvider>
      <div className="w-full max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 mt-6 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Habits</h1>
          <p className="text-gray-500">{currentDate}</p>
        </div>

        {/* Habits List */}
        <div className="space-y-4 mb-6">
          {habits.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No habits added yet. Start by adding one!
            </p>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-3"
              >
                {/* Left Section: Checkbox and Habit Title */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-6 h-6 flex items-center justify-center rounded border ${
                      habit.completed
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                    aria-label={
                      habit.completed
                        ? "Mark as incomplete"
                        : "Mark as complete"
                    }
                  >
                    {habit.completed && (
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

                {/* Right Section: Streak Counter and Menu Icon */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {/* <span className="text-sm font-medium text-gray-600">
                      🏆 {habit.streak}
                    </span> */}
                  </div>
                  <div>
                    <Menu
                      shadow="md"
                      width={200}
                      opened={openedMenuId === habit.id} // Only open the current menu
                      onChange={(isOpen) =>
                        setOpenedMenuId(isOpen ? habit.id : null)
                      } // Update state
                      withArrow
                    >
                      <Menu.Target>
                        <ActionIcon
                          variant="subtle"
                          color="rgba(60, 60, 60, 1)"
                          size="xl"
                          radius="xl"
                          aria-label="Settings"
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