// ─── Departments (now mutable) ────────────────────────────────────────────────
let DEPARTMENTS = [
  { id: 1, name: 'Sales',       code: 'sales',       color: '#1D4ED8', bg: '#DBEAFE' },
  { id: 2, name: 'Call Center', code: 'call_center',  color: '#6D28D9', bg: '#EDE9FE' },
  { id: 3, name: 'Marketing',   code: 'marketing',    color: '#92400E', bg: '#FEF9C3' },
  { id: 4, name: 'Operations',  code: 'operations',   color: '#065F46', bg: '#D1FAE5' },
  { id: 5, name: 'Management',  code: 'management',   color: '#9D174D', bg: '#FCE7F3' },
];

export const TEAM_MEMBER_ROLES = [
  { value: 'sales_rep',    label: 'Sales Representative' },
  { value: 'team_leader',  label: 'Team Leader' },
  { value: 'supervisor',   label: 'Supervisor' },
  { value: 'manager',      label: 'Manager' },
];

// ─── Employees ────────────────────────────────────────────────────────────────
const MOCK_EMPLOYEES = [
  { id: 1, username: 'ahmed.rashed',   full_name: 'Ahmed Rashed',   email: 'ahmed.rashed@prometheus.com',   department: 1, phone: '01001234567', national_id: '29501010100001', is_active: true,  created_at: '2024-01-10' },
  { id: 2, username: 'sara.hassan',    full_name: 'Sara Hassan',    email: 'sara.hassan@prometheus.com',    department: 1, phone: '01112345678', national_id: '29602020200002', is_active: true,  created_at: '2024-02-15' },
  { id: 3, username: 'omar.ali',       full_name: 'Omar Ali',       email: 'omar.ali@prometheus.com',       department: 2, phone: '01223456789', national_id: '29703030300003', is_active: true,  created_at: '2024-03-01' },
  { id: 4, username: 'nada.kamal',     full_name: 'Nada Kamal',     email: 'nada.kamal@prometheus.com',     department: 2, phone: '01534567890', national_id: '29804040400004', is_active: false, created_at: '2024-04-20' },
  { id: 5, username: 'khaled.ibrahim', full_name: 'Khaled Ibrahim', email: 'khaled.ibrahim@prometheus.com', department: 3, phone: '01045678901', national_id: '29905050500005', is_active: true,  created_at: '2024-05-05' },
  { id: 6, username: 'mona.youssef',   full_name: 'Mona Youssef',   email: 'mona.youssef@prometheus.com',   department: 1, phone: '01156789012', national_id: '30006060600006', is_active: true,  created_at: '2024-06-12' },
  { id: 7, username: 'tarek.saleh',    full_name: 'Tarek Saleh',    email: 'tarek.saleh@prometheus.com',    department: 4, phone: '01267890123', national_id: '30107070700007', is_active: true,  created_at: '2024-07-18' },
  { id: 8, username: 'hana.mostafa',   full_name: 'Hana Mostafa',   email: 'hana.mostafa@prometheus.com',   department: 5, phone: '01578901234', national_id: '30208080800008', is_active: true,  created_at: '2024-08-22' },
  { id: 9, username: 'Reem.Radwan',   full_name: 'Reem Radwan',   email: 'Reema.Radwan@prometheus.com',   department: 1, phone: '01095501766', national_id: '30208080800022', is_active: true,  created_at: '2024-08-22' },
  { id: 10, username: 'Zoz.Helmy',   full_name: 'Hazem Helmy',   email: 'zoz.helmy@prometheus.com',   department: 1, phone: '01095501760', national_id: '302080808000055', is_active: true,  created_at: '2024-08-12' },
];

// ─── Teams ────────────────────────────────────────────────────────────────────
const MOCK_TEAMS = [
  { id: 1, name: 'Alpha Sales Team',   code: 'ALPHA', description: 'Primary sales team for New Cairo and 5th Settlement area', is_active: true,  created_at: '2024-01-15' },
  { id: 2, name: 'Beta Sales Team',    code: 'BETA',  description: 'Covers October City and Sheikh Zayed',                     is_active: true,  created_at: '2024-02-01' },
  { id: 4, name: 'North Coast Team',   code: 'NC-01', description: 'Seasonal team for North Coast projects',                   is_active: false, created_at: '2024-09-01' },
];

// ─── Team Members ─────────────────────────────────────────────────────────────
// Only sales employees (dept 1) are valid team members
// Only sales dept (id:1) employees are valid members.
// Tarek Saleh (id:7) is Operations → removed from Beta Sales Team.
const MOCK_TEAM_MEMBERS = [
  { id: 1, team_id: 1, employee_id: 1, role: 'team_leader', is_team_leader: true,  is_active: true,  created_at: '2024-01-15' },
  { id: 2, team_id: 1, employee_id: 2, role: 'sales_rep',   is_team_leader: false, is_active: true,  created_at: '2024-02-15' },
  { id: 3, team_id: 1, employee_id: 6, role: 'sales_rep',   is_team_leader: false, is_active: true,  created_at: '2024-06-12' },
];

let nextDepartmentId = 6;
let nextEmployeeId   = 9;
let nextTeamId       = 5;
let nextMemberId     = 7;

// Fallback style for unknown/deleted departments
export const FALLBACK_DEPT_STYLE = { bg: '#F3F4F6', color: '#374151' };

export const HRDataService = {
  // ── Departments ─────────────────────────────────────────────────────────────
  getDepartments()      { return [...DEPARTMENTS]; },
  getDepartmentById(id) { return DEPARTMENTS.find((d) => d.id === parseInt(id)) || null; },
  getDepartmentName(id) { return DEPARTMENTS.find((d) => d.id === parseInt(id))?.name || 'Unknown'; },
  getDepartmentStyle(id) {
    const dept = DEPARTMENTS.find((d) => d.id === parseInt(id));
    return dept ? { bg: dept.bg, color: dept.color } : FALLBACK_DEPT_STYLE;
  },
  createDepartment(data) {
    const newDept = {
      id:    nextDepartmentId++,
      name:  data.name.trim(),
      code:  data.code.trim().toLowerCase().replace(/\s+/g, '_'),
      color: data.color || '#374151',
      bg:    data.bg    || '#F3F4F6',
    };
    DEPARTMENTS.push(newDept);
    return newDept;
  },
  updateDepartment(id, updates) {
    const index = DEPARTMENTS.findIndex((d) => d.id === parseInt(id));
    if (index === -1) return null;
    DEPARTMENTS[index] = { ...DEPARTMENTS[index], ...updates, id: DEPARTMENTS[index].id };
    return DEPARTMENTS[index];
  },
  deleteDepartment(id) {
    const index = DEPARTMENTS.findIndex((d) => d.id === parseInt(id));
    if (index === -1) return false;
    DEPARTMENTS.splice(index, 1);
    return true;
  },
  getEmployeeCountByDepartment(deptId) {
    return MOCK_EMPLOYEES.filter((e) => e.department === parseInt(deptId)).length;
  },

  // ── Sales helpers ────────────────────────────────────────────────────────────
  getSalesDepartmentId() {
    const sales = DEPARTMENTS.find(d => d.code === 'sales' || d.name.toLowerCase() === 'sales');
    return sales?.id ?? 1;
  },
  getSalesEmployees() {
    const salesId = this.getSalesDepartmentId();
    return MOCK_EMPLOYEES.filter(e => e.department === salesId && e.is_active);
  },
  isSalesEmployee(employeeId) {
    const emp = MOCK_EMPLOYEES.find(e => e.id === parseInt(employeeId));
    if (!emp) return false;
    return emp.department === this.getSalesDepartmentId();
  },

  // ── Employees ────────────────────────────────────────────────────────────────
  getEmployees()      { return [...MOCK_EMPLOYEES]; },
  getEmployeeById(id) { return MOCK_EMPLOYEES.find((e) => e.id === parseInt(id)) || null; },

  createEmployee(data) {
    const e = { id: nextEmployeeId++, created_at: new Date().toISOString().split('T')[0], is_active: true, ...data };
    MOCK_EMPLOYEES.push(e);
    return e;
  },

  // ── updateEmployee: propagates changes to team members ──────────────────────
  // Rule 1: If employee dept changes AWAY from sales → remove from all teams
  // Rule 2: All edits (name, status, etc.) automatically reflect in team member
  //         views since TeamMembers reads live from getEmployeeById()
  updateEmployee(id, updates) {
    const i = MOCK_EMPLOYEES.findIndex((e) => e.id === parseInt(id));
    if (i === -1) return null;

    const prev = MOCK_EMPLOYEES[i];
    MOCK_EMPLOYEES[i] = { ...prev, ...updates, id: prev.id, created_at: prev.created_at };

    // If department changed away from sales, remove all team memberships
    const salesId = this.getSalesDepartmentId();
    if (updates.department !== undefined && updates.department !== prev.department) {
      if (updates.department !== salesId) {
        // Remove this employee from all teams
        const toRemove = MOCK_TEAM_MEMBERS
          .map((m, idx) => ({ m, idx }))
          .filter(({ m }) => m.employee_id === parseInt(id))
          .map(({ idx }) => idx)
          .reverse(); // reverse so splice doesn't shift indices
        toRemove.forEach(idx => MOCK_TEAM_MEMBERS.splice(idx, 1));
      }
    }

    // If is_active changed to false, deactivate all their team memberships too
    if (updates.is_active === false && prev.is_active === true) {
      MOCK_TEAM_MEMBERS.forEach((m, idx) => {
        if (m.employee_id === parseInt(id)) {
          MOCK_TEAM_MEMBERS[idx] = { ...m, is_active: false };
        }
      });
    }

    return MOCK_EMPLOYEES[i];
  },

  deleteEmployee(id) {
    const i = MOCK_EMPLOYEES.findIndex((e) => e.id === parseInt(id));
    if (i === -1) return false;
    // Also remove all team memberships
    const memberIndices = MOCK_TEAM_MEMBERS
      .map((m, idx) => ({ m, idx }))
      .filter(({ m }) => m.employee_id === parseInt(id))
      .map(({ idx }) => idx)
      .reverse();
    memberIndices.forEach(idx => MOCK_TEAM_MEMBERS.splice(idx, 1));
    MOCK_EMPLOYEES.splice(i, 1);
    return true;
  },

  // ── Teams ────────────────────────────────────────────────────────────────────
  getTeams()      { return [...MOCK_TEAMS]; },
  getTeamById(id) { return MOCK_TEAMS.find((t) => t.id === parseInt(id)) || null; },

  createTeam(data) {
    const t = { id: nextTeamId++, created_at: new Date().toISOString().split('T')[0], is_active: true, ...data };
    MOCK_TEAMS.push(t);
    return t;
  },
  updateTeam(id, updates) {
    const i = MOCK_TEAMS.findIndex((t) => t.id === parseInt(id));
    if (i === -1) return null;
    MOCK_TEAMS[i] = { ...MOCK_TEAMS[i], ...updates, id: MOCK_TEAMS[i].id, created_at: MOCK_TEAMS[i].created_at };
    return MOCK_TEAMS[i];
  },
  deleteTeam(id) {
    const i = MOCK_TEAMS.findIndex((t) => t.id === parseInt(id));
    if (i === -1) return false;
    // Remove all members of this team too
    const memberIndices = MOCK_TEAM_MEMBERS
      .map((m, idx) => ({ m, idx }))
      .filter(({ m }) => m.team_id === parseInt(id))
      .map(({ idx }) => idx)
      .reverse();
    memberIndices.forEach(idx => MOCK_TEAM_MEMBERS.splice(idx, 1));
    MOCK_TEAMS.splice(i, 1);
    return true;
  },
  getTeamMemberCount(teamId) {
    return MOCK_TEAM_MEMBERS.filter((m) => m.team_id === parseInt(teamId) && m.is_active).length;
  },

  // ── Team Members ─────────────────────────────────────────────────────────────
  getTeamMembers()             { return [...MOCK_TEAM_MEMBERS]; },
  getTeamMembersByTeam(teamId) { return MOCK_TEAM_MEMBERS.filter((m) => m.team_id === parseInt(teamId)); },
  getTeamMemberById(id)        { return MOCK_TEAM_MEMBERS.find((m) => m.id === parseInt(id)) || null; },

  // Which team is this employee currently assigned to? (returns team object or null)
  getEmployeeTeam(employeeId) {
    const membership = MOCK_TEAM_MEMBERS.find(m => m.employee_id === parseInt(employeeId) && m.is_active);
    if (!membership) return null;
    return MOCK_TEAMS.find(t => t.id === membership.team_id) || null;
  },

  // Get active membership record for employee
  getEmployeeMembership(employeeId) {
    return MOCK_TEAM_MEMBERS.find(m => m.employee_id === parseInt(employeeId) && m.is_active) || null;
  },

  // addTeamMember — only sales employees allowed
  addTeamMember(data) {
    if (!this.isSalesEmployee(data.employee_id)) return null;
    const m = {
      id:             nextMemberId++,
      created_at:     new Date().toISOString().split('T')[0],
      is_active:      data.is_active ?? true,
      is_team_leader: data.role === 'team_leader',
      ...data,
    };
    MOCK_TEAM_MEMBERS.push(m);
    return m;
  },

  // moveTeamMember — moves employee from their current team to a new team
  // Removes old membership, creates new one
  moveTeamMember(employeeId, newTeamId, role, isActive) {
    if (!this.isSalesEmployee(employeeId)) return null;

    // Remove all existing memberships for this employee
    const toRemove = MOCK_TEAM_MEMBERS
      .map((m, idx) => ({ m, idx }))
      .filter(({ m }) => m.employee_id === parseInt(employeeId))
      .map(({ idx }) => idx)
      .reverse();
    toRemove.forEach(idx => MOCK_TEAM_MEMBERS.splice(idx, 1));

    // Create new membership
    const m = {
      id:             nextMemberId++,
      team_id:        parseInt(newTeamId),
      employee_id:    parseInt(employeeId),
      role:           role || 'sales_rep',
      is_team_leader: (role || 'sales_rep') === 'team_leader',
      is_active:      isActive ?? true,
      created_at:     new Date().toISOString().split('T')[0],
    };
    MOCK_TEAM_MEMBERS.push(m);
    return m;
  },

  createTeamMember(data) {
    const m = { id: nextMemberId++, created_at: new Date().toISOString().split('T')[0], is_active: true, is_team_leader: data.role === 'team_leader', ...data };
    MOCK_TEAM_MEMBERS.push(m);
    return m;
  },
  updateTeamMember(id, updates) {
    const i = MOCK_TEAM_MEMBERS.findIndex((m) => m.id === parseInt(id));
    if (i === -1) return null;
    MOCK_TEAM_MEMBERS[i] = {
      ...MOCK_TEAM_MEMBERS[i], ...updates,
      id:             MOCK_TEAM_MEMBERS[i].id,
      is_team_leader: (updates.role || MOCK_TEAM_MEMBERS[i].role) === 'team_leader',
      created_at:     MOCK_TEAM_MEMBERS[i].created_at,
    };
    return MOCK_TEAM_MEMBERS[i];
  },
  deleteTeamMember(id) {
    const i = MOCK_TEAM_MEMBERS.findIndex((m) => m.id === parseInt(id));
    if (i === -1) return false;
    MOCK_TEAM_MEMBERS.splice(i, 1);
    return true;
  },
  isEmployeeInTeam(employeeId, teamId) {
    return MOCK_TEAM_MEMBERS.some((m) => m.employee_id === parseInt(employeeId) && m.team_id === parseInt(teamId) && m.is_active);
  },
};