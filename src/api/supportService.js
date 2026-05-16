import { apiCall } from './config.js';

export const supportService = {
  submitHelp: async (payload) => {
    return await apiCall('/support', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
