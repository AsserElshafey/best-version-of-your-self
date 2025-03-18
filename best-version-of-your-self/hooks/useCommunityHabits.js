import { useState, useEffect, useCallback } from "react";
import { axiosPrivate } from "../api/axios";
import { notifications } from "@mantine/notifications";
import { CheckIcon, XIcon } from "lucide-react";

export const useCommunityHabits = (communityId) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionHabitId, setActionHabitId] = useState(null);

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get(`/communities/${communityId}/habits`);
      setHabits(response.data.habits || []);
    } catch (error) {
      console.error("Error fetching community habits", error);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch habits. Please try again later.',
        color: 'red',
        icon: <XIcon size={18} />,
        autoClose: 5000,
      });
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
      const response = await axiosPrivate.post(`/communities/${communityId}/habits`, newHabit);
      setHabits((prev) => [...prev, response.data.habit]);
      
      notifications.show({
        title: 'Success',
        message: 'Habit added successfully!',
        color: 'green',
        icon: <CheckIcon size={18} />,
        autoClose: 3000,
      });
      
      return response.data.habit;
    } catch (error) {
      console.error("Error adding habit", error);
      
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to add habit. Please try again.',
        color: 'red',
        icon: <XIcon size={18} />,
        autoClose: 5000,
      });
      
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteHabit = async (habitId) => {
    setActionLoading(true);
    setActionHabitId(habitId);
    try {
      await axiosPrivate.delete(`/communities/${communityId}/habits/${habitId}`);
      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
      
      notifications.show({
        title: 'Success',
        message: 'Habit deleted successfully!',
        color: 'green',
        icon: <CheckIcon size={18} />,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting habit", error);
      
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to delete habit. Please try again.',
        color: 'red',
        icon: <XIcon size={18} />,
        autoClose: 5000,
      });
      
      throw error;
    } finally {
      setActionLoading(false);
      setActionHabitId(null);
    }
  };

  const updateLog = async (habitId, userId, status) => {
    setActionLoading(true);
    setActionHabitId(habitId);
    try {
      const response = await axiosPrivate.put(
        `/communities/${communityId}/habits/${habitId}/logs/${userId}`, 
        { status, notes: "updated" }
      );
      
      // Update the habits state with the updated log
      setHabits((prev) =>
        prev.map((habit) => {
          if (habit.id === habitId) {
            // Get the updated log from response
            const updatedLog = response.data.log;
            
            // Check if the log already exists in habitLogs
            const existingLogIndex = habit.habitLogs?.findIndex(log => log.userId === userId) ?? -1;
            
            let updatedLogs;
            if (existingLogIndex >= 0) {
              // Update existing log
              updatedLogs = [...habit.habitLogs];
              updatedLogs[existingLogIndex] = updatedLog;
            } else {
              // Add new log
              updatedLogs = [...(habit.habitLogs || []), updatedLog];
            }
            
            return {
              ...habit,
              habitLogs: updatedLogs
            };
          }
          return habit;
        })
      );
      
      // Show appropriate notification based on status
      notifications.show({
        title: status === 'completed' ? 'Habit Completed' : 'Habit Marked Incomplete',
        message: status === 'completed' 
          ? 'Great job! Keep up the good work.' 
          : 'Habit marked as incomplete.',
        color: status === 'completed' ? 'green' : 'blue',
        icon: status === 'completed' ? <CheckIcon size={18} /> : null,
        autoClose: 3000,
      });
      
    } catch (error) {
      console.error("Error updating log", error);
      
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update habit status. Please try again.',
        color: 'red',
        icon: <XIcon size={18} />,
        autoClose: 5000,
      });
      
      throw error;
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