import {create} from 'zustand';

const useUserStore = create((set) => ({
  data: null, // Store fetched data
  fetchData: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user');

      const result = await response.json();
      set({ data: result });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}));

export default useUserStore;