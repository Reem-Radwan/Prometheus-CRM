import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../data/authService';

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