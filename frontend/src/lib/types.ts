export type Theme = 
  | "NATIONAL_SECURITY"
  | "HEALTHCARE"
  | "EMERGENCY_MANAGEMENT"
  | "ENVIRONMENT_AND_SUSTAINABILITY"
  | "SMART_CITY"
  | "SMART_HOME"
  | "SMART_EDUCATION"
  | "SECURE_DIGITAL_TRANSACTIONS_AND_LOGISTICS"
  | "RURAL_DEVELOPMENT"
  | "ZERO_HUNGER"
  | "GOOD_HEALTH_AND_WELL_BEING"
  | "QUALITY_EDUCATION"
  | "CLEAN_WATER_AND_SANITATION"
  | "AFFORDABLE_AND_CLEAN_ENERGY"
  | "AQUATIC_LIFE"
  | "CLIMATE_ACTION"
  | "LIFE_ON_LAND"
  | "ALGORITHMIC_TRADING"
  | "LEGAL_TECH"
  | "FINANCIAL_SERVICES";

export interface Member {
  id?: number;
  name: string;
  year: string;
  department: string;
  college: string;
  mobileNumber: string;
  emailId: string;
}

export interface MemberDto {
  name: string;
  emailId: string;
}

// Teams
export interface RegisterTeamRequest {
  teamId: string;
  password: string;
  teamName: string;
  members: Member[];
  theme: Theme;
}

export interface TeamDetailsDto {
  teamId: string;
  teamName: string;
  theme: string;
  psId: string;
  psTitle: string;
  buildingName: string;
  floor: string;
  tableNumber: string;
  score: number;
  members: Member[];
}

export interface AllTeamDetailsResponse {
  teams: TeamDetailsDto[];
}

export interface UpdateTeamVenueRequest {
  buildingName: string;
  floor: string;
  tableNumber: string;
}

export interface UpdateTeamScoreRequest {
  score: number;
}

export interface UpdateTeamMembersRequest {
  members: Member[];
}

export interface UpdateTeamThemeRequest {
  theme: string;
}

export interface ResetPasswordRequest {
  newPassword?: string;
}

export interface UpdateTeamProblemRequest {
  psId: string;
}

// Problem Statements
export interface ProblemStatementDto {
  psId: string;
  psTitle: string;
  theme: string;
  psPdfLink: string;
}

export interface AllProblemStatementResponse {
  problemStatements: ProblemStatementDto[];
}

export interface ProblemStatementRequest {
  psId?: string;
  theme: string;
  title: string;
  pdfUrl: string;
}

// To maintain compatibility with previously placed mock type usages where possible
export type TeamDto = TeamDetailsDto;
