import { apiCall } from './config.js';

export const flightService = {
  getFlights: async () => {
    try {
      return await apiCall('/flights');
    } catch (error) {
      console.error('Error fetching flights:', error);
      // Fallback to demo data if API fails
      return [
        {
          id: 1,
          code: 'MD042',
          route: 'TNR → CDG',
          depTime: '08:30',
          arrTime: '21:50',
          price: 830000,
          seats: 280,
          aircraft: 'Boeing 787',
          className: 'Économique',
          duration: '13h 20min',
          stops: 'Direct',
          displayLogo: 'AIR\nMADAGASCAR',
          premium: false,
          priceMga: 830000,
          taxMga: 120000,
        },
        {
          id: 2,
          code: 'AF844',
          route: 'CDG → TNR',
          depTime: '22:15',
          arrTime: '14:30+1',
          price: 820000,
          seats: 350,
          aircraft: 'Airbus A350',
          className: 'Économique',
          duration: '13h 15min',
          stops: 'Direct',
          displayLogo: 'AIR\nFRANCE',
          premium: false,
          priceMga: 820000,
          taxMga: 115000,
        },
        {
          id: 3,
          code: 'TK072',
          route: 'IST → TNR',
          depTime: '14:00',
          arrTime: '02:40+1',
          price: 930000,
          seats: 300,
          aircraft: 'Boeing 777',
          className: 'Business',
          duration: '12h 40min',
          stops: '1 escale',
          displayLogo: 'TURKISH\nAIRLINES',
          premium: true,
          priceMga: 930000,
          taxMga: 140000,
        },
      ];
    }
  },

  getPopularFlights: async () => {
    try {
      return await apiCall('/flights/popular');
    } catch (error) {
      console.error('Error fetching popular flights:', error);
      return [];
    }
  },
};
