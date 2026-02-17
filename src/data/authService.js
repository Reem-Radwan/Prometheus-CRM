// ===================================================================
// authService.js - UPDATED TO MATCH API DOCUMENTATION
// Mock Authentication Service that mirrors Django Backend API
// ===================================================================

/**
 * Mock Users Database
 * Matches the structure returned by GET /api/me/
 * 
 * API Response Structure:
 * {
 *   id, username, full_name, email, department, department_name,
 *   phone, national_id, is_active, role, permissions
 * }
 */
const MOCK_USERS = {
  'ahmed': {
    id: 1,
    username: 'ahmed',
    password: '123456',  // Only used for login check, never returned
    full_name: 'Ahmed Hassan',
    email: 'ahmed@prometheus.com',
    department: 1,  // Department ID
    department_name: 'Sales',
    phone: '+20100000001',
    national_id: '29001011234567',
    is_active: true,
    role: 'sales_rep',
    permissions: {
      can_manage_config: false,
      can_view_team_leads: false,
      can_delete_leads: false,
      can_create_leads: true,
      can_edit_leads: true,
      can_view_own_leads: true
    }
  },
  'admin': {
    id: 2,
    username: 'admin',
    password: 'admin123',
    full_name: 'System Administrator',
    email: 'admin@prometheus.com',
    department: 4,
    department_name: 'Management',
    phone: '+20100000002',
    national_id: '28501011234567',
    is_active: true,
    role: 'admin',
    permissions: {
      can_manage_config: true,
      can_view_team_leads: true,
      can_delete_leads: true,
      can_create_leads: true,
      can_edit_leads: true,
      can_view_own_leads: true
    }
  },
  'manager': {
    id: 3,
    username: 'manager',
    password: '123456',
    full_name: 'Mohamed Salem',
    email: 'manager@prometheus.com',
    department: 1,
    department_name: 'Sales',
    phone: '+20100000003',
    national_id: '27501011234567',
    is_active: true,
    role: 'manager',
    permissions: {
      can_manage_config: false,
      can_view_team_leads: true,
      can_delete_leads: true,
      can_create_leads: true,
      can_edit_leads: true,
      can_view_own_leads: true
    }
  },
  'hr': {
    id: 4,
    username: 'hr',
    password: '123456',
    full_name: 'Sara Ahmed',
    email: 'hr@prometheus.com',
    department: 5,
    department_name: 'HR',
    phone: '+20100000004',
    national_id: '29001011234568',
    is_active: true,
    role: 'hr_manager',
    permissions: {
      can_manage_config: false,
      can_view_team_leads: false,
      can_delete_leads: false,
      can_create_leads: false,
      can_edit_leads: false,
      can_view_own_leads: false,
      can_manage_employees: true,
      can_manage_teams: true
    }
  },
  'callcenter': {
    id: 5,
    username: 'callcenter',
    password: '123456',
    full_name: 'Fatma Ibrahim',
    email: 'callcenter@prometheus.com',
    department: 2,
    department_name: 'Call Center',
    phone: '+20100000005',
    national_id: '29501011234567',
    is_active: true,
    role: 'call_center_agent',
    permissions: {
      can_manage_config: false,
      can_view_team_leads: false,
      can_delete_leads: false,
      can_create_leads: true,
      can_edit_leads: false,
      can_view_own_leads: true
    }
  }
};

/**
 * AuthService - Simulates Django Backend API
 * 
 * Endpoints Simulated:
 * - POST /api-token-auth/ (Login)
 * - GET /api/me/ (Get current user info)
 */
export const AuthService = {
  /**
   * Login - Simulates POST /api-token-auth/
   * 
   * Request Body: { username: string, password: string }
   * Response: { token: string }
   * 
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<{token: string}>}
   */
  login(username, password) {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        const user = MOCK_USERS[username];
        
        if (!user) {
          reject({ 
            error: 'Invalid username or password',
            details: 'User not found'
          });
          return;
        }
        
        if (user.password !== password) {
          reject({ 
            error: 'Invalid username or password',
            details: 'Incorrect password'
          });
          return;
        }
        
        // Simulate successful API response
        // Backend returns: { "token": "abc123xyz" }
        resolve({
          token: `mock_token_${user.id}_${Date.now()}`
        });
      }, 800);
    });
  },

  /**
   * Get User Info - Simulates GET /api/me/
   * 
   * Headers: Authorization: Token abc123xyz
   * Response: User object with permissions
   * 
   * @param {string} username 
   * @returns {Promise<Object>}
   */
  getUserInfo(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS[username];
        
        if (!user) {
          reject({ 
            error: 'User not found',
            details: 'Invalid token or user does not exist'
          });
          return;
        }
        
        // Return user data WITHOUT password (matches API)
        const { password, ...userData } = user;
        resolve(userData);
      }, 300);
    });
  },

  /**
   * Get Current User from localStorage
   * @returns {Object|null}
   */
  getCurrentUser() {
    const userDataStr = localStorage.getItem('userData');
    if (!userDataStr) return null;
    
    try {
      return JSON.parse(userDataStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const userData = this.getCurrentUser();
    return !!(token && userData);
  },

  /**
   * Get auth token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('authToken');
  },

  /**
   * Logout - Clear authentication data
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  /**
   * Check if user has specific permission
   * @param {string} permission 
   * @returns {boolean}
   */
  hasPermission(permission) {
    const user = this.getCurrentUser();
    if (!user || !user.permissions) return false;
    return !!user.permissions[permission];
  },

  /**
   * Check if user is in specific department (by name)
   * @param {string|string[]} departments 
   * @returns {boolean}
   */
  isInDepartment(departments) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    if (Array.isArray(departments)) {
      return departments.includes(user.department_name);
    }
    return user.department_name === departments;
  },

  /**
   * Check if user has specific role
   * @param {string|string[]} roles 
   * @returns {boolean}
   */
  hasRole(roles) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    return user.role === roles;
  }
};

/**
 * Helper: Get all mock users for testing
 * Remove this in production
 */
export const getMockUsers = () => {
  return Object.values(MOCK_USERS).map(user => ({
    username: user.username,
    password: user.password,
    full_name: user.full_name,
    department: user.department_name,
    role: user.role
  }));
};

/**
 * Mock Departments Data (matches GET /api/departments/)
 */
export const MOCK_DEPARTMENTS = [
  { id: 1, name: 'Sales' },
  { id: 2, name: 'Call Center' },
  { id: 3, name: 'Operations' },
  { id: 4, name: 'Management' },
  { id: 5, name: 'HR' },
];