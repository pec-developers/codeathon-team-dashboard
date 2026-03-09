import { api } from './api';
import type { TeamDashboardResponse, LeaderBoardResponse } from './types';

export const participantApi = {
  getDashboard: async (): Promise<TeamDashboardResponse> => {
    const response = await api.get('/team/dashboard');
    return response.data;
  },

  completeProfile: async (newPassword: string): Promise<string> => {
    const response = await api.post('/team/complete-profile', { newPassword });
    return response.data;
  },

  finalizeProblemStatement: async (psId: string): Promise<string> => {
    const response = await api.post('/team/finalize-ps', { psId });
    return response.data;
  },

  getLeaderboard: async (top: number = 10): Promise<LeaderBoardResponse> => {
    const response = await api.get(`/teams/leaderboard`, { params: { top } });
    return response.data;
  },
};
