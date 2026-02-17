// // ===================================================================
// // NEW FILE: contexts/AuthContext.js
// // React Context for User Authentication State Management
// // ===================================================================

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { AuthService } from '../data/authService';

// /**
//  * AuthContext - Provides authentication state throughout the app
//  */
// const AuthContext = createContext(null);

// /**
//  * AuthProvider Component
//  * Wrap your app with this to provide authentication context
//  */
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Load user data from localStorage on mount
//     const userData = AuthService.getCurrentUser();
//     setUser(userData);
//     setLoading(false);
//   }, []);

//   /**
//    * Login and set user data
//    * @param {Object} userData - User data from AuthService.getUserInfo()
//    */
//   const login = (userData) => {
//     setUser(userData);
//   };

//   /**
//    * Logout and clear user data
//    */
//   const logout = () => {
//     AuthService.logout();
//     setUser(null);
//   };

//   /**
//    * Check if user has specific permission
//    * @param {string} permission 
//    * @returns {boolean}
//    */
//   const hasPermission = (permission) => {
//     if (!user || !user.permissions) return false;
//     return !!user.permissions[permission];
//   };

//   /**
//    * Check if user is in specific department(s)
//    * @param {string|string[]} departments 
//    * @returns {boolean}
//    */
//   const isInDepartment = (departments) => {
//     if (!user) return false;
    
//     if (Array.isArray(departments)) {
//       return departments.includes(user.department);
//     }
//     return user.department === departments;
//   };

//   /**
//    * Check if user has specific role(s)
//    * @param {string|string[]} roles 
//    * @returns {boolean}
//    */
//   const hasRole = (roles) => {
//     if (!user) return false;
    
//     if (Array.isArray(roles)) {
//       return roles.includes(user.role);
//     }
//     return user.role === roles;
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     hasPermission,
//     isInDepartment,
//     hasRole,
//     isAuthenticated: !!user
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// /**
//  * useAuth Hook
//  * Use this hook in any component to access authentication state
//  * 
//  * @example
//  * const { user, logout, hasPermission } = useAuth();
//  * 
//  * if (hasPermission('can_delete_leads')) {
//  *   // Show delete button
//  * }
//  */
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };


// ===================================================================
// NEW FILE: contexts/AuthContext.js
// React Context for User Authentication State Management
// ===================================================================

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { AuthService } from '../data/authService';

// /**
//  * AuthContext - Provides authentication state throughout the app
//  */
// const AuthContext = createContext(null);

// /**
//  * AuthProvider Component
//  * Wrap your app with this to provide authentication context
//  */
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Load user data from localStorage on mount
//     const userData = AuthService.getCurrentUser();
//     setUser(userData);
//     setLoading(false);
//   }, []);

//   /**
//    * Login and set user data
//    * @param {Object} userData - User data from AuthService.getUserInfo()
//    */
//   const login = (userData) => {
//     setUser(userData);
//   };

//   /**
//    * Logout and clear user data
//    */
//   const logout = () => {
//     AuthService.logout();
//     setUser(null);
//   };

//   /**
//    * Check if user has specific permission
//    * @param {string} permission 
//    * @returns {boolean}
//    */
//   const hasPermission = (permission) => {
//     if (!user || !user.permissions) return false;
//     return !!user.permissions[permission];
//   };

//   /**
//    * Check if user is in specific department(s)
//    * @param {string|string[]} departments 
//    * @returns {boolean}
//    */
//   const isInDepartment = (departments) => {
//     if (!user) return false;
    
//     if (Array.isArray(departments)) {
//       return departments.includes(user.department);
//     }
//     return user.department === departments;
//   };

//   /**
//    * Check if user has specific role(s)
//    * @param {string|string[]} roles 
//    * @returns {boolean}
//    */
//   const hasRole = (roles) => {
//     if (!user) return false;
    
//     if (Array.isArray(roles)) {
//       return roles.includes(user.role);
//     }
//     return user.role === roles;
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     hasPermission,
//     isInDepartment,
//     hasRole,
//     isAuthenticated: !!user
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// /**
//  * useAuth Hook
//  * Use this hook in any component to access authentication state
//  * 
//  * @example
//  * const { user, logout, hasPermission } = useAuth();
//  * 
//  * if (hasPermission('can_delete_leads')) {
//  *   // Show delete button
//  * }
//  */
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };


// ===================================================================
// NEW FILE: contexts/AuthContext.js
// React Context for User Authentication State Management
// ===================================================================

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { AuthService } from '../data/authService';

// /**
//  * AuthContext - Provides authentication state throughout the app
//  */
// const AuthContext = createContext(null);

// /**
//  * AuthProvider Component
//  * Wrap your app with this to provide authentication context
//  */
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Load user data from localStorage on mount
//     const userData = AuthService.getCurrentUser();
//     setUser(userData);
//     setLoading(false);
//   }, []);

//   /**
//    * Login and set user data
//    * @param {Object} userData - User data from AuthService.getUserInfo()
//    */
//   const login = (userData) => {
//     setUser(userData);
//   };

//   /**
//    * Logout and clear user data
//    */
//   const logout = () => {
//     AuthService.logout();
//     setUser(null);
//   };

//   /**
//    * Check if user has specific permission
//    * @param {string} permission 
//    * @returns {boolean}
//    */
//   const hasPermission = (permission) => {
//     if (!user || !user.permissions) return false;
//     return !!user.permissions[permission];
//   };

//   /**
//    * Check if user is in specific department(s)
//    * @param {string|string[]} departments 
//    * @returns {boolean}
//    */
//   const isInDepartment = (departments) => {
//     if (!user) return false;
    
//     if (Array.isArray(departments)) {
//       return departments.includes(user.department);
//     }
//     return user.department === departments;
//   };

//   /**
//    * Check if user has specific role(s)
//    * @param {string|string[]} roles 
//    * @returns {boolean}
//    */
//   const hasRole = (roles) => {
//     if (!user) return false;
    
//     if (Array.isArray(roles)) {
//       return roles.includes(user.role);
//     }
//     return user.role === roles;
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//     hasPermission,
//     isInDepartment,
//     hasRole,
//     isAuthenticated: !!user
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// /**
//  * useAuth Hook
//  * Use this hook in any component to access authentication state
//  * 
//  * @example
//  * const { user, logout, hasPermission } = useAuth();
//  * 
//  * if (hasPermission('can_delete_leads')) {
//  *   // Show delete button
//  * }
//  */
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { AuthService } from '../data/authService';

// // ─────────────────────────────────────────────────────────────────────────────
// // ACCESS DERIVATION
// // Reads the raw user object (from /api/me/) and returns clean boolean flags.
// //
// // Rules from API docs section 6 "UI Permission Logic":
// //  1. Hide Marketing + Locations if  can_manage_config = false
// //  2. Hide HR module  if department_name NOT in [HR, Management, Operations]
// //     AND not can_manage_employees / can_manage_teams
// //  3. Hide Delete button in Leads if  can_delete_leads = false
// //  4. Show "Team Leads" tab in Leads if  can_view_team_leads = true
// //
// // Partners rule (derived from docs context):
// //  Anyone who can create or view leads needs access to partners
// //  because partners appear as dynamic fields in the lead form.
// // ─────────────────────────────────────────────────────────────────────────────
// const HR_DEPARTMENTS = ['HR', 'Management', 'Operations'];

// export function deriveAccess(user) {
//   if (!user) return {};

//   const p   = user.permissions || {};
//   const dept = user.department_name || '';

//   // ── Leads ──────────────────────────────────────────────────────────────────
//   const canAccessLeads   = !!(p.can_view_own_leads || p.can_view_team_leads || p.can_create_leads);
//   const canCreateLeads   = !!p.can_create_leads;
//   const canEditLeads     = !!p.can_edit_leads;
//   const canDeleteLeads   = !!p.can_delete_leads;    // doc: "Hide Delete button if can_delete_leads=false"
//   const canViewTeamLeads = !!p.can_view_team_leads; // doc: "Show Team Leads tab if can_view_team_leads=true"

//   // ── Partners ────────────────────────────────────────────────────────────────
//   // Partners are referenced in lead forms (broker/ambassador/visit sources),
//   // so anyone who touches leads must see partners.
//   const canAccessPartners = canAccessLeads;

//   // ── Marketing & Locations ───────────────────────────────────────────────────
//   // Doc: "Hide Admin screens if can_manage_config = false"
//   const canAccessMarketing  = !!p.can_manage_config;
//   const canAccessLocations  = !!p.can_manage_config;

//   // ── HR ──────────────────────────────────────────────────────────────────────
//   // Doc: "Hide HR module if department is not HR/Management/Operations"
//   // Also requires the HR-specific permissions from authService
//   const inHrDept         = HR_DEPARTMENTS.includes(dept);
//   const canManageEmployees = !!p.can_manage_employees;
//   const canManageTeams     = !!p.can_manage_teams;
//   const canAccessHR        = inHrDept && (canManageEmployees || canManageTeams);

//   return {
//     // Leads
//     canAccessLeads,
//     canCreateLeads,
//     canEditLeads,
//     canDeleteLeads,
//     canViewTeamLeads,
//     // Partners
//     canAccessPartners,
//     // Marketing
//     canAccessMarketing,
//     // Locations
//     canAccessLocations,
//     // HR
//     canAccessHR,
//     canManageEmployees,
//     canManageTeams,
//     // Config shortcut
//     canManageConfig: !!p.can_manage_config,
//   };
// }

// // ─────────────────────────────────────────────────────────────────────────────
// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user,    setUser]    = useState(null);
//   const [access,  setAccess]  = useState({});
//   const [loading, setLoading] = useState(true);

//   // Rehydrate from localStorage on mount (matches the Login page flow)
//   useEffect(() => {
//     const stored = AuthService.getCurrentUser();
//     if (stored) {
//       setUser(stored);
//       setAccess(deriveAccess(stored));
//     }
//     setLoading(false);
//   }, []);

//   /** Called by Login page after successful /api/me/ response */
//   const login = (userData) => {
//     setUser(userData);
//     setAccess(deriveAccess(userData));
//   };

//   const logout = () => {
//     AuthService.logout();
//     setUser(null);
//     setAccess({});
//   };

//   /** Check a single raw permission key, e.g. hasPermission('can_delete_leads') */
//   const hasPermission = (perm) => !!(user?.permissions?.[perm]);

//   /** Check role: hasRole('admin') or hasRole(['admin','manager']) */
//   const hasRole = (roles) => {
//     if (!user) return false;
//     return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
//   };

//   return (
//     <AuthContext.Provider value={{ user, access, loading, login, logout, hasPermission, hasRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be inside AuthProvider');
//   return ctx;
// }


import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../data/authService';

// ─────────────────────────────────────────────────────────────────────────────
// ACCESS DERIVATION
// Reads the raw user object (from /api/me/) and returns clean boolean flags.
//
// Rules from API docs section 6 "UI Permission Logic":
//  1. Hide Marketing + Locations if  can_manage_config = false
//  2. Hide HR module if department_name NOT in [HR, Management, Operations]
//  3. Hide Delete button in Leads if  can_delete_leads = false
//  4. Show "Team Leads" tab in Leads if  can_view_team_leads = true
//
// Admin override: role === 'admin' gets full access to every module.
// ─────────────────────────────────────────────────────────────────────────────
const HR_DEPARTMENTS = ['HR', 'Management', 'Operations'];

export function deriveAccess(user) {
  if (!user) return {};

  // ── Admin: full access to all modules ──────────────────────────────────────
  if (user.role === 'admin') {
    return {
      canAccessLeads:     true,
      canCreateLeads:     true,
      canEditLeads:       true,
      canDeleteLeads:     true,
      canViewTeamLeads:   true,
      canAccessPartners:  true,
      canAccessMarketing: true,
      canAccessLocations: true,
      canAccessHR:        true,
      canManageEmployees: true,
      canManageTeams:     true,
      canManageConfig:    true,
    };
  }

  const p    = user.permissions || {};
  const dept = user.department_name || '';

  // ── Leads ──────────────────────────────────────────────────────────────────
  const canAccessLeads   = !!(p.can_view_own_leads || p.can_view_team_leads || p.can_create_leads);
  const canCreateLeads   = !!p.can_create_leads;
  const canEditLeads     = !!p.can_edit_leads;
  const canDeleteLeads   = !!p.can_delete_leads;
  const canViewTeamLeads = !!p.can_view_team_leads;

  // ── Partners ────────────────────────────────────────────────────────────────
  const canAccessPartners = canAccessLeads;

  // ── Marketing & Locations ───────────────────────────────────────────────────
  const canAccessMarketing = !!p.can_manage_config;
  const canAccessLocations = !!p.can_manage_config;

  // ── HR ──────────────────────────────────────────────────────────────────────
  const inHrDept           = HR_DEPARTMENTS.includes(dept);
  const canManageEmployees = !!p.can_manage_employees;
  const canManageTeams     = !!p.can_manage_teams;
  const canAccessHR        = inHrDept && (canManageEmployees || canManageTeams);

  return {
    canAccessLeads,
    canCreateLeads,
    canEditLeads,
    canDeleteLeads,
    canViewTeamLeads,
    canAccessPartners,
    canAccessMarketing,
    canAccessLocations,
    canAccessHR,
    canManageEmployees,
    canManageTeams,
    canManageConfig: !!p.can_manage_config,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [access,  setAccess]  = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = AuthService.getCurrentUser();
    if (stored) {
      setUser(stored);
      setAccess(deriveAccess(stored));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setAccess(deriveAccess(userData));
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setAccess({});
  };

  const hasPermission = (perm) => !!(user?.permissions?.[perm]);

  const hasRole = (roles) => {
    if (!user) return false;
    return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
  };

  return (
    <AuthContext.Provider value={{ user, access, loading, login, logout, hasPermission, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}