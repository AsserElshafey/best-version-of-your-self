import { useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";


export const useCommunityHabits = (communityId) => {
    const [habits, setHabits] = useState([]);
    
    useEffect(() => {
      const fetchHabits = async () => {
        try {
          const response = await axiosPrivate.get(`/communities/${communityId}/habits`);
          setHabits(response.data.habits || []);
        } catch (error) {
          console.error("Error fetching community habits", error);
        }
      };
      fetchHabits();
    }, [communityId]);
  
    const addHabit = (newHabit) => setHabits((prev) => [...prev, newHabit]);
    const deleteHabit = async (habitId) => {
      try {
        await axiosPrivate.delete(`/communities/${communityId}/habits/${habitId}`);
        setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
      } catch (error) {
        console.error("Error deleting habit", error);
      }
    };
  
    return { habits, addHabit, deleteHabit };
};
  