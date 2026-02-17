/**
 * HR Data Service
 * Simulates Django Backend API for HR Module
 *
 * Endpoints simulated:
 *   GET/POST/PATCH/DELETE /api/employees/
 *   GET/POST/PATCH/DELETE /api/teams/
 *   GET/POST/PATCH/DELETE /api/team-members/
 */

// ─── Departments (read-only, from system config) ──────────────────────────────
export const DEPARTMENTS = [
  { id: 1, name: 'Sales',       code: 'sales' },
  { id: 2, name: 'Call Center', code: 'call_center' },
  { id: 3, name: 'Marketing',   code: 'marketing' },
  { id: 4, name: 'Operations',  code: 'operations' },
  { id: 5, name: 'Management',  code: 'management' },
];

export const TEAM_MEMBER_ROLES = [
  { value: 'sales_rep',    label: 'Sales Representative' },
  { value: 'team_leader',  label: 'Team Leader' },
  { value: 'supervisor',   label: 'Supervisor' },
  { value: 'manager',      label: 'Manager' },
];

// ─── Employees ────────────────────────────────────────────────────────────────
const MOCK_EMPLOYEES = [
  {
    id: 1,
    username: 'ahmed.rashed',
    full_name: 'Ahmed Rashed',
    email: 'ahmed.rashed@prometheus.com',
    department: 1,
    phone: '01001234567',
    national_id: '29501010100001',
    is_active: true,
    created_at: '2024-01-10',
  },
  {
    id: 2,
    username: 'sara.hassan',
    full_name: 'Sara Hassan',
    email: 'sara.hassan@prometheus.com',
    department: 1,
    phone: '01112345678',
    national_id: '29602020200002',
    is_active: true,
    created_at: '2024-02-15',
  },
  {
    id: 3,
    username: 'omar.ali',
    full_name: 'Omar Ali',
    email: 'omar.ali@prometheus.com',
    department: 2,
    phone: '01223456789',
    national_id: '29703030300003',
    is_active: true,
    created_at: '2024-03-01',
  },
  {
    id: 4,
    username: 'nada.kamal',
    full_name: 'Nada Kamal',
    email: 'nada.kamal@prometheus.com',
    department: 2,
    phone: '01534567890',
    national_id: '29804040400004',
    is_active: false,
    created_at: '2024-04-20',
  },
  {
    id: 5,
    username: 'khaled.ibrahim',
    full_name: 'Khaled Ibrahim',
    email: 'khaled.ibrahim@prometheus.com',
    department: 3,
    phone: '01045678901',
    national_id: '29905050500005',
    is_active: true,
    created_at: '2024-05-05',
  },
  {
    id: 6,
    username: 'mona.youssef',
    full_name: 'Mona Youssef',
    email: 'mona.youssef@prometheus.com',
    department: 1,
    phone: '01156789012',
    national_id: '30006060600006',
    is_active: true,
    created_at: '2024-06-12',
  },
  {
    id: 7,
    username: 'tarek.saleh',
    full_name: 'Tarek Saleh',
    email: 'tarek.saleh@prometheus.com',
    department: 4,
    phone: '01267890123',
    national_id: '30107070700007',
    is_active: true,
    created_at: '2024-07-18',
  },
  {
    id: 8,
    username: 'hana.mostafa',
    full_name: 'Hana Mostafa',
    email: 'hana.mostafa@prometheus.com',
    department: 5,
    phone: '01578901234',
    national_id: '30208080800008',
    is_active: true,
    created_at: '2024-08-22',
  },
];

// ─── Teams ────────────────────────────────────────────────────────────────────
const MOCK_TEAMS = [
  {
    id: 1,
    name: 'Alpha Sales Team',
    code: 'ALPHA',
    description: 'Primary sales team for New Cairo and 5th Settlement area',
    is_active: true,
    created_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'Beta Sales Team',
    code: 'BETA',
    description: 'Covers October City and Sheikh Zayed',
    is_active: true,
    created_at: '2024-02-01',
  },
  {
    id: 3,
    name: 'Call Center Team A',
    code: 'CC-A',
    description: 'Inbound leads and initial qualification',
    is_active: true,
    created_at: '2024-03-10',
  },
  {
    id: 4,
    name: 'North Coast Team',
    code: 'NC-01',
    description: 'Seasonal team for North Coast projects',
    is_active: false,
    created_at: '2024-09-01',
  },
];

// ─── Team Members ─────────────────────────────────────────────────────────────
const MOCK_TEAM_MEMBERS = [
  {
    id: 1,
    team_id: 1,
    employee_id: 1,
    role: 'team_leader',
    is_team_leader: true,
    is_active: true,
    created_at: '2024-01-15',
  },
  {
    id: 2,
    team_id: 1,
    employee_id: 2,
    role: 'sales_rep',
    is_team_leader: false,
    is_active: true,
    created_at: '2024-02-15',
  },
  {
    id: 3,
    team_id: 1,
    employee_id: 6,
    role: 'sales_rep',
    is_team_leader: false,
    is_active: true,
    created_at: '2024-06-12',
  },
  {
    id: 4,
    team_id: 2,
    employee_id: 7,
    role: 'team_leader',
    is_team_leader: true,
    is_active: true,
    created_at: '2024-02-01',
  },
  {
    id: 5,
    team_id: 3,
    employee_id: 3,
    role: 'supervisor',
    is_team_leader: true,
    is_active: true,
    created_at: '2024-03-10',
  },
  {
    id: 6,
    team_id: 3,
    employee_id: 4,
    role: 'sales_rep',
    is_team_leader: false,
    is_active: false,
    created_at: '2024-04-20',
  },
];

let nextEmployeeId  = 9;
let nextTeamId      = 5;
let nextMemberId    = 7;

// ─── HRDataService ────────────────────────────────────────────────────────────
export const HRDataService = {
  // ── Departments (read-only) ─────────────────────────────────────────────────
  getDepartments() {
    return [...DEPARTMENTS];
  },
  getDepartmentById(id) {
    return DEPARTMENTS.find((d) => d.id === parseInt(id)) || null;
  },
  getDepartmentName(id) {
    return DEPARTMENTS.find((d) => d.id === parseInt(id))?.name || 'Unknown';
  },

  // ── Employees ───────────────────────────────────────────────────────────────
  getEmployees() {
    return [...MOCK_EMPLOYEES];
  },
  getEmployeeById(id) {
    return MOCK_EMPLOYEES.find((e) => e.id === parseInt(id)) || null;
  },
  createEmployee(data) {
    const newEmployee = {
      id: nextEmployeeId++,
      created_at: new Date().toISOString().split('T')[0],
      is_active: true,
      ...data,
    };
    MOCK_EMPLOYEES.push(newEmployee);
    return newEmployee;
  },
  updateEmployee(id, updates) {
    const index = MOCK_EMPLOYEES.findIndex((e) => e.id === parseInt(id));
    if (index === -1) return null;
    MOCK_EMPLOYEES[index] = {
      ...MOCK_EMPLOYEES[index],
      ...updates,
      id: MOCK_EMPLOYEES[index].id,
      created_at: MOCK_EMPLOYEES[index].created_at,
    };
    return MOCK_EMPLOYEES[index];
  },
  deleteEmployee(id) {
    const index = MOCK_EMPLOYEES.findIndex((e) => e.id === parseInt(id));
    if (index === -1) return false;
    MOCK_EMPLOYEES.splice(index, 1);
    return true;
  },

  // ── Teams ───────────────────────────────────────────────────────────────────
  getTeams() {
    return [...MOCK_TEAMS];
  },
  getTeamById(id) {
    return MOCK_TEAMS.find((t) => t.id === parseInt(id)) || null;
  },
  createTeam(data) {
    const newTeam = {
      id: nextTeamId++,
      created_at: new Date().toISOString().split('T')[0],
      is_active: true,
      ...data,
    };
    MOCK_TEAMS.push(newTeam);
    return newTeam;
  },
  updateTeam(id, updates) {
    const index = MOCK_TEAMS.findIndex((t) => t.id === parseInt(id));
    if (index === -1) return null;
    MOCK_TEAMS[index] = {
      ...MOCK_TEAMS[index],
      ...updates,
      id: MOCK_TEAMS[index].id,
      created_at: MOCK_TEAMS[index].created_at,
    };
    return MOCK_TEAMS[index];
  },
  deleteTeam(id) {
    const index = MOCK_TEAMS.findIndex((t) => t.id === parseInt(id));
    if (index === -1) return false;
    MOCK_TEAMS.splice(index, 1);
    return true;
  },
  /** Count active members for a team */
  getTeamMemberCount(teamId) {
    return MOCK_TEAM_MEMBERS.filter(
      (m) => m.team_id === parseInt(teamId) && m.is_active
    ).length;
  },

  // ── Team Members ────────────────────────────────────────────────────────────
  getTeamMembers() {
    return [...MOCK_TEAM_MEMBERS];
  },
  getTeamMembersByTeam(teamId) {
    return MOCK_TEAM_MEMBERS.filter((m) => m.team_id === parseInt(teamId));
  },
  getTeamMemberById(id) {
    return MOCK_TEAM_MEMBERS.find((m) => m.id === parseInt(id)) || null;
  },
  createTeamMember(data) {
    const newMember = {
      id: nextMemberId++,
      created_at: new Date().toISOString().split('T')[0],
      is_active: true,
      is_team_leader: data.role === 'team_leader',
      ...data,
    };
    MOCK_TEAM_MEMBERS.push(newMember);
    return newMember;
  },
  updateTeamMember(id, updates) {
    const index = MOCK_TEAM_MEMBERS.findIndex((m) => m.id === parseInt(id));
    if (index === -1) return null;
    MOCK_TEAM_MEMBERS[index] = {
      ...MOCK_TEAM_MEMBERS[index],
      ...updates,
      id: MOCK_TEAM_MEMBERS[index].id,
      is_team_leader: (updates.role || MOCK_TEAM_MEMBERS[index].role) === 'team_leader',
      created_at: MOCK_TEAM_MEMBERS[index].created_at,
    };
    return MOCK_TEAM_MEMBERS[index];
  },
  deleteTeamMember(id) {
    const index = MOCK_TEAM_MEMBERS.findIndex((m) => m.id === parseInt(id));
    if (index === -1) return false;
    MOCK_TEAM_MEMBERS.splice(index, 1);
    return true;
  },
  /** Check if employee is already a member of a specific team */
  isEmployeeInTeam(employeeId, teamId) {
    return MOCK_TEAM_MEMBERS.some(
      (m) => m.employee_id === parseInt(employeeId) && m.team_id === parseInt(teamId) && m.is_active
    );
  },
};