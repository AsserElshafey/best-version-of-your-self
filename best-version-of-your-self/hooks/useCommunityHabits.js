import { useState, useEffect, useCallback } from "react";
import { axiosPrivate } from "../api/axios";
import { notifications } from "@mantine/notifications";
import { CheckIcon, XIcon } from "lucide-react";

export const useCommunityHabits = (communityId) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionHabitId, setActionHabitId] = useState(null);

  // Simplified notification handler
  const showNotification = (isSuccess, message, options = {}) => {
    notifications.show({
      title: isSuccess ? 'Success' : 'Error',
      message,
      color: isSuccess ? options.color || 'green' : 'red',
      icon: isSuccess ? (options.icon || <CheckIcon size={18} />) : <XIcon size={18} />,
      autoClose: isSuccess ? 3000 : 5000,
    });
  };

  // Simplified API action handler
  const performAction = async (actionFn) => {
    try {
      return await actionFn();
    } catch (error) {
      console.error("API Error:", error);
      showNotification(false, error.response?.data?.message || 'Operation failed. Please try again.');
      throw error;
    }
  };

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get(`/communities/${communityId}/habits`);
      setHabits(response.data.habits || []);
    } catch (error) {
      console.error("Error fetching community habits", error);
      showNotification(false, 'Failed to fetch habits. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [communityId]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const addHabit = async (newHabit) => {
    setActionLoading(true);
    try {
      const result = await performAction(async () => {
        const response = await axiosPrivate.post(`/communities/${communityId}/habits`, newHabit);
        setHabits((prev) => [...prev, response.data.habit]);
        showNotification(true, 'Habit added successfully!');
        return response.data.habit;
      });
      return result;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteHabit = async (habitId) => {
    setActionLoading(true);
    setActionHabitId(habitId);
    try {
      await performAction(async () => {
        await axiosPrivate.delete(`/communities/${communityId}/habits/${habitId}`);
        setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
        showNotification(true, 'Habit deleted successfully!');
      });
    } finally {
      setActionLoading(false);
      setActionHabitId(null);
    }
  };

  const updateLog = async (habitId, userId, status) => {
    setActionLoading(true);
    setActionHabitId(habitId);
    try {
      await performAction(async () => {
        const response = await axiosPrivate.put(
          `/communities/${communityId}/habits/${habitId}/logs/${userId}`, 
          { status, notes: "updated" }
        );
        
        // Update the habits state with the updated log
        setHabits((prev) =>
          prev.map((habit) => {
            if (habit.id === habitId) {
              const updatedLog = response.data.log;
              const existingLogIndex = habit.habitLogs?.findIndex(log => log.userId === userId) ?? -1;
              
              const updatedLogs = existingLogIndex >= 0
                ? habit.habitLogs.map((log, i) => i === existingLogIndex ? updatedLog : log)
                : [...(habit.habitLogs || []), updatedLog];
              
              return { ...habit, habitLogs: updatedLogs };
            }
            return habit;
          })
        );
        
        // Show status-specific notification
        showNotification(true, 
          status === 'completed' ? 'Great job! Keep up the good work.' : 'Habit marked as incomplete.',
          { 
            color: status === 'completed' ? 'green' : 'blue',
            icon: status === 'completed' ? <CheckIcon size={18} /> : null
          }
        );
      });
    } finally {
      setTimeout(() => {
        setActionLoading(false);
        setActionHabitId(null);
      }, 300);
    }
  };

  return { 
    habits, 
    addHabit, 
    deleteHabit, 
    updateLog, 
    loading,
    actionLoading,
    actionHabitId,
    refreshHabits: fetchHabits
  };
};