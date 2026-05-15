import { apiCall } from './config.js';

export const userService = {
  getUsers: async () => {
    try {
      return await apiCall('/users');
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  createUser: async (userData) => {
    try {
      return await apiCall('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
};
