import { apiCall } from './config.js';

export const bookingService = {
  getBookings: async () => {
    try {
      return await apiCall('/bookings');
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  },

  createBooking: async (bookingData) => {
    try {
      return await apiCall('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },
};
