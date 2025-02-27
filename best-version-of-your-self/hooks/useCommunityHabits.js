import { useState, useEffect, useCallback } from "react";
import { axiosPrivate } from "../api/axios";

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
      return response.data.habit;
    } catch (error) {
      console.error("Error adding habit", error);
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
    } catch (error) {
      console.error("Error deleting habit", error);
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
      await axiosPrivate.put(
        `/communities/${communityId}/habits/${habitId}/logs/${userId}`, 
        { status, notes: "updated" }
      );
      
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === habitId
          ? {
            ...habit,
            habitLogs: habit.habitLogs.map((log) =>
              log.userId === userId ? { ...log, status } : log
            ),
            }
          : habit
        )
      );
    } catch (error) {
      console.error("Error updating log", error);
      throw error;
    } finally {
      // Small delay to ensure the UI updates properly
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