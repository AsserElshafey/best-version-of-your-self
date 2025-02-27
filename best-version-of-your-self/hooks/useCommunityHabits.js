import { useState, useEffect, useCallback } from "react";
import { axiosPrivate } from "../api/axios";

export const useCommunityHabits = (communityId) => {
  const [habits, setHabits] = useState([]);

  const fetchHabits = useCallback(async () => {
    try {
      const response = await axiosPrivate.get(`/communities/${communityId}/habits`);
      setHabits(response.data.habits || []);
    } catch (error) {
      console.error("Error fetching community habits", error);
    }
  }, [communityId]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const addHabit = async (newHabit) => {
    try {
      const response = await axiosPrivate.post(`/communities/${communityId}/habits`, newHabit);
      setHabits((prev) => [...prev, response.data.habit]);
    } catch (error) {
      console.error("Error adding habit", error);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await axiosPrivate.delete(`/communities/${communityId}/habits/${habitId}`);
      setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
    } catch (error) {
      console.error("Error deleting habit", error);
    }
    };

    const updateLog = async (habitId, userId, status) => {
    try {
      await axiosPrivate.put(`/communities/${communityId}/habits/${habitId}/logs/${userId}`, { status, notes: "updated" });
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
    }
  }

  return { habits, addHabit, deleteHabit, updateLog };
};
