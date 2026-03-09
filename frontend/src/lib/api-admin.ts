import { api } from './api';
import type { RegisterTeamRequest, AllTeamDetailsResponse, UpdateTeamVenueRequest, UpdateTeamScoreRequest, UpdateTeamMembersRequest, UpdateTeamThemeRequest, ResetPasswordRequest, AllProblemStatementResponse, ProblemStatementRequest, UpdateTeamProblemRequest } from './types.ts';

export const adminApi = {
  // Teams
  registerTeam: async (data: RegisterTeamRequest) => {
    const response = await api.post('/admin/teams/register', data);
    return response.data;
  },
  getAllTeams: async (): Promise<AllTeamDetailsResponse> => {
    const response = await api.get('/admin/teams');
    return response.data;
  },
  deleteTeam: async (teamId: string) => {
    const response = await api.delete(`/admin/teams/${teamId}`);
    return response.data;
  },
  updateTeamVenue: async (teamId: string, data: UpdateTeamVenueRequest) => {
    const response = await api.put(`/admin/teams/${teamId}/venue`, data);
    return response.data;
  },
  updateTeamScore: async (teamId: string, data: UpdateTeamScoreRequest) => {
    const response = await api.put(`/admin/teams/${teamId}/score`, data);
    return response.data;
  },
  updateTeamMembers: async (teamId: string, data: UpdateTeamMembersRequest) => {
    const response = await api.put(`/admin/teams/${teamId}/members`, data);
    return response.data;
  },
  updateTeamTheme: async (teamId: string, data: UpdateTeamThemeRequest) => {
    const response = await api.put(`/admin/teams/${teamId}/theme`, data);
    return response.data;
  },
  resetTeamPassword: async (teamId: string, data: ResetPasswordRequest) => {
    const response = await api.put(`/admin/teams/${teamId}/reset-passwd`, data);
    return response.data;
  },
  updateTeamProblemStatement: async (teamId: string, data: UpdateTeamProblemRequest) => {
    const response = await api.put(`/admin/teams/${teamId}/problem-statement`, data);
    return response.data;
  },

  // Problem Statements
  getAllProblemStatements: async (): Promise<AllProblemStatementResponse> => {
    const response = await api.get('/admin/problem-statements');
    return response.data;
  },
  createProblemStatement: async (data: ProblemStatementRequest) => {
    const response = await api.post('/admin/problem-statements', data);
    return response.data;
  },
  updateProblemStatement: async (problemStatementId: string, data: ProblemStatementRequest) => {
    const response = await api.put(`/admin/problem-statements/${problemStatementId}`, data);
    return response.data;
  },
  deleteProblemStatement: async (problemStatementId: string) => {
    const response = await api.delete(`/admin/problem-statements/${problemStatementId}`);
    return response.data;
  },
  releaseProblemStatements: async (isReleased: boolean) => {
    const response = await api.post(`/admin/problem-statements/release?released=${isReleased}`);
    return response.data;
  }
};
