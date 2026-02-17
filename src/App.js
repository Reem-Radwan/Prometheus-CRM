// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { theme } from './theme/theme';
// import Layout from './components/shared/Layout';
// import Login from './pages/Login';

// // Pages
// import Dashboard from './pages/Dashboard';
// import LeadsList from './pages/leads/LeadsList';
// import LeadCreate from './pages/leads/LeadCreate';
// import LeadEdit from './pages/leads/LeadEdit';

// // Protected Route Component
// function ProtectedRoute({ children }) {
//   const isAuthenticated = localStorage.getItem('authToken');
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           {/* Public Route - Login */}
//           <Route path="/login" element={<Login />} />
          
//           {/* Protected Routes */}
//           <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/leads" element={<LeadsList />} />
//                     <Route path="/leads/create" element={<LeadCreate />} />
//                     <Route path="/leads/edit/:id" element={<LeadEdit />} />
//                     <Route path="*" element={<Navigate to="/" replace />} />
//                   </Routes>
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Box, CircularProgress } from '@mui/material';
// import { theme } from './theme/theme';
// import Layout from './components/shared/Layout';
// import Login from './pages/Login';

// // Import AuthProvider
// import { AuthProvider, useAuth } from './contexts/AuthContext';

// // Pages
// import Dashboard from './pages/Dashboard';
// import LeadsList from './pages/leads/LeadsList';
// import LeadCreate from './pages/leads/LeadCreate';
// import LeadEdit from './pages/leads/LeadEdit';

// // Protected Route Component - Now uses AuthContext
// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
  
//   // Show loading spinner while checking auth
//   if (loading) {
//     return (
//       <Box 
//         sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           minHeight: '100vh',
//           backgroundColor: '#F8FAFC'
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
  
//   // Redirect to login if not authenticated
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         {/* Wrap entire app with AuthProvider */}
//         <AuthProvider>
//           <Routes>
//             {/* Public Route - Login */}
//             <Route path="/login" element={<Login />} />
            
//             {/* Protected Routes */}
//             <Route
//               path="/*"
//               element={
//                 <ProtectedRoute>
//                   <Layout>
//                     <Routes>
//                       <Route path="/" element={<Dashboard />} />
//                       <Route path="/leads" element={<LeadsList />} />
//                       <Route path="/leads/create" element={<LeadCreate />} />
//                       <Route path="/leads/edit/:id" element={<LeadEdit />} />
//                       <Route path="*" element={<Navigate to="/" replace />} />
//                     </Routes>
//                   </Layout>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </AuthProvider>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;









// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Box, CircularProgress } from '@mui/material';
// import { theme } from './theme/theme';
// import Layout from './components/shared/Layout';
// import Login from './pages/Login';

// // Import AuthProvider
// import { AuthProvider, useAuth } from './contexts/AuthContext';

// // Pages
// import Dashboard from './pages/Dashboard';
// import LeadsList from './pages/leads/LeadsList';
// import LeadCreate from './pages/leads/LeadCreate';
// import LeadEdit from './pages/leads/LeadEdit';

// // Protected Route Component - Now uses AuthContext
// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
  
//   // Show loading spinner while checking auth
//   if (loading) {
//     return (
//       <Box 
//         sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           minHeight: '100vh',
//           backgroundColor: '#F8FAFC'
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
  
//   // Redirect to login if not authenticated
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         {/* Wrap entire app with AuthProvider */}
//         <AuthProvider>
//           <Routes>
//             {/* Public Route - Login */}
//             <Route path="/login" element={<Login />} />
            
//             {/* Protected Routes */}
//             <Route
//               path="/*"
//               element={
//                 <ProtectedRoute>
//                   <Layout>
//                     <Routes>
//                       <Route path="/" element={<Dashboard />} />
//                       <Route path="/leads" element={<LeadsList />} />
//                       <Route path="/leads/create" element={<LeadCreate />} />
//                       <Route path="/leads/edit/:id" element={<LeadEdit />} />
//                       <Route path="*" element={<Navigate to="/" replace />} />
//                     </Routes>
//                   </Layout>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </AuthProvider>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Box, CircularProgress } from '@mui/material';
// import { theme } from './theme/theme';
// import Layout from './components/shared/Layout';
// import Login from './pages/Login';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import ModuleGuard from './components/shared/ModuleGuard';

// // ── Pages ──────────────────────────────────────────────────────────────────
// import Dashboard        from './pages/Dashboard';
// import LeadsList        from './pages/leads/LeadsList';
// import LeadCreate       from './pages/leads/LeadCreate';
// import LeadEdit         from './pages/leads/LeadEdit';
// import PartnersList     from './pages/partners/PartnersList';
// import PartnerCreate    from './pages/partners/PartnerCreate';
// import PartnerEdit      from './pages/partners/PartnerEdit';
// import Marketing        from './pages/marketing/Marketing';
// import CampaignCreate   from './pages/marketing/CampaignCreate';
// import CampaignEdit     from './pages/marketing/CampaignEdit';
// import EventCreate      from './pages/marketing/EventCreate';
// import EventEdit        from './pages/marketing/EventEdit';
// import Locations        from './pages/locations/Locations';
// import BranchCreate     from './pages/locations/BranchCreate';
// import BranchEdit       from './pages/locations/BranchEdit';
// import ProjectSiteCreate from './pages/locations/ProjectSiteCreate';
// import ProjectSiteEdit  from './pages/locations/ProjectSiteEdit';
// import HR               from './pages/hr/HR';
// import EmployeeCreate   from './pages/hr/EmployeeCreate';
// import EmployeeEdit     from './pages/hr/EmployeeEdit';
// import TeamCreate       from './pages/hr/TeamCreate';
// import TeamEdit         from './pages/hr/TeamEdit';
// import TeamMembers      from './pages/hr/TeamMembers';
// import TeamMemberAssign from './pages/hr/TeamMemberAssign';

// // ── Loading spinner shown while auth state is rehydrating ─────────────────
// function FullScreenLoader() {
//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
//       <CircularProgress />
//     </Box>
//   );
// }

// // ── Redirects to /login if unauthenticated ────────────────────────────────
// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   if (loading) return <FullScreenLoader />;
//   if (!user)   return <Navigate to="/login" replace />;
//   return children;
// }

// // ── Inner routes (needs useAuth, so lives inside AuthProvider) ────────────
// function AppRoutes() {
//   const { access } = useAuth();

//   return (
//     <Routes>

//       {/* ── Public ──────────────────────────────────────────────────────── */}
//       <Route path="/login" element={<Login />} />

//       {/* ── Protected shell ─────────────────────────────────────────────── */}
//       <Route
//         path="/*"
//         element={
//           <ProtectedRoute>
//             <Layout>
//               <Routes>

//                 {/* Dashboard — always accessible when logged in */}
//                 <Route path="/" element={<Dashboard />} />

//                 {/* ── Leads ─────────────────────────────────────────────
//                     canAccessLeads  = can_view_own_leads OR can_view_team_leads OR can_create_leads
//                     canCreateLeads  = can_create_leads
//                     canEditLeads    = can_edit_leads
//                     ─────────────────────────────────────────────────── */}
//                 <Route path="/leads" element={
//                   <ModuleGuard allowed={!!access.canAccessLeads}>
//                     <LeadsList />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/leads/create" element={
//                   <ModuleGuard allowed={!!access.canCreateLeads}>
//                     <LeadCreate />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/leads/edit/:id" element={
//                   <ModuleGuard allowed={!!access.canEditLeads}>
//                     <LeadEdit />
//                   </ModuleGuard>
//                 } />

//                 {/* ── Partners ───────────────────────────────────────────
//                     canAccessPartners = same as canAccessLeads
//                     (partners are referenced inside lead forms)
//                     ─────────────────────────────────────────────────── */}
//                 <Route path="/partners" element={
//                   <ModuleGuard allowed={!!access.canAccessPartners}>
//                     <PartnersList />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/partners/create" element={
//                   <ModuleGuard allowed={!!access.canAccessPartners}>
//                     <PartnerCreate />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/partners/edit/:id" element={
//                   <ModuleGuard allowed={!!access.canAccessPartners}>
//                     <PartnerEdit />
//                   </ModuleGuard>
//                 } />

//                 {/* ── Marketing ──────────────────────────────────────────
//                     Docs: "Hide Admin screens if can_manage_config = false"
//                     canAccessMarketing = can_manage_config
//                     ─────────────────────────────────────────────────── */}
//                 <Route path="/marketing" element={
//                   <ModuleGuard allowed={!!access.canAccessMarketing}>
//                     <Marketing />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/marketing/campaigns/create" element={
//                   <ModuleGuard allowed={!!access.canAccessMarketing}>
//                     <CampaignCreate />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/marketing/campaigns/edit/:id" element={
//                   <ModuleGuard allowed={!!access.canAccessMarketing}>
//                     <CampaignEdit />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/marketing/events/create" element={
//                   <ModuleGuard allowed={!!access.canAccessMarketing}>
//                     <EventCreate />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/marketing/events/edit/:id" element={
//                   <ModuleGuard allowed={!!access.canAccessMarketing}>
//                     <EventEdit />
//                   </ModuleGuard>
//                 } />

//                 {/* ── Locations ──────────────────────────────────────────
//                     Docs: "Hide Admin screens if can_manage_config = false"
//                     canAccessLocations = can_manage_config
//                     ─────────────────────────────────────────────────── */}
//                 <Route path="/locations" element={
//                   <ModuleGuard allowed={!!access.canAccessLocations}>
//                     <Locations />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/locations/branches/create" element={
//                   <ModuleGuard allowed={!!access.canAccessLocations}>
//                     <BranchCreate />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/locations/branches/edit/:id" element={
//                   <ModuleGuard allowed={!!access.canAccessLocations}>
//                     <BranchEdit />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/locations/sites/create" element={
//                   <ModuleGuard allowed={!!access.canAccessLocations}>
//                     <ProjectSiteCreate />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/locations/sites/edit/:id" element={
//                   <ModuleGuard allowed={!!access.canAccessLocations}>
//                     <ProjectSiteEdit />
//                   </ModuleGuard>
//                 } />

//                 {/* ── HR ────────────────────────────────────────────────
//                     Docs: "Hide HR module if dept not HR/Management/Operations"
//                     canAccessHR        = inHrDept AND (can_manage_employees OR can_manage_teams)
//                     canManageEmployees = can_manage_employees
//                     canManageTeams     = can_manage_teams
//                     ─────────────────────────────────────────────────── */}
//                 <Route path="/hr" element={
//                   <ModuleGuard allowed={!!access.canAccessHR}>
//                     <HR />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/hr/employees/create" element={
//                   <ModuleGuard allowed={!!access.canManageEmployees}>
//                     <EmployeeCreate />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/hr/employees/edit/:id" element={
//                   <ModuleGuard allowed={!!access.canManageEmployees}>
//                     <EmployeeEdit />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/hr/teams/create" element={
//                   <ModuleGuard allowed={!!access.canManageTeams}>
//                     <TeamCreate />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/hr/teams/edit/:id" element={
//                   <ModuleGuard allowed={!!access.canManageTeams}>
//                     <TeamEdit />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/hr/teams/:teamId/members" element={
//                   <ModuleGuard allowed={!!access.canAccessHR}>
//                     <TeamMembers />
//                   </ModuleGuard>
//                 } />
//                 <Route path="/hr/teams/:teamId/assign" element={
//                   <ModuleGuard allowed={!!access.canManageTeams}>
//                     <TeamMemberAssign />
//                   </ModuleGuard>
//                 } />

//                 {/* Fallback */}
//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Routes>
//             </Layout>
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AuthProvider>
//           <AppRoutes />
//         </AuthProvider>
//       </Router>
//     </ThemeProvider>
//   );
// }



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { theme } from './theme/theme';
// import Layout from './components/shared/Layout';
// import Login from './pages/Login';

// // Pages
// import Dashboard from './pages/Dashboard';
// import LeadsList from './pages/leads/LeadsList';
// import LeadCreate from './pages/leads/LeadCreate';
// import LeadEdit from './pages/leads/LeadEdit';

// // Protected Route Component
// function ProtectedRoute({ children }) {
//   const isAuthenticated = localStorage.getItem('authToken');
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           {/* Public Route - Login */}
//           <Route path="/login" element={<Login />} />
          
//           {/* Protected Routes */}
//           <Route
//             path="/*"
//             element={
//               <ProtectedRoute>
//                 <Layout>
//                   <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/leads" element={<LeadsList />} />
//                     <Route path="/leads/create" element={<LeadCreate />} />
//                     <Route path="/leads/edit/:id" element={<LeadEdit />} />
//                     <Route path="*" element={<Navigate to="/" replace />} />
//                   </Routes>
//                 </Layout>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Box, CircularProgress } from '@mui/material';
// import { theme } from './theme/theme';
// import Layout from './components/shared/Layout';
// import Login from './pages/Login';

// // Import AuthProvider
// import { AuthProvider, useAuth } from './contexts/AuthContext';

// // Pages
// import Dashboard from './pages/Dashboard';
// import LeadsList from './pages/leads/LeadsList';
// import LeadCreate from './pages/leads/LeadCreate';
// import LeadEdit from './pages/leads/LeadEdit';

// // Protected Route Component - Now uses AuthContext
// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
  
//   // Show loading spinner while checking auth
//   if (loading) {
//     return (
//       <Box 
//         sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           minHeight: '100vh',
//           backgroundColor: '#F8FAFC'
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
  
//   // Redirect to login if not authenticated
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         {/* Wrap entire app with AuthProvider */}
//         <AuthProvider>
//           <Routes>
//             {/* Public Route - Login */}
//             <Route path="/login" element={<Login />} />
            
//             {/* Protected Routes */}
//             <Route
//               path="/*"
//               element={
//                 <ProtectedRoute>
//                   <Layout>
//                     <Routes>
//                       <Route path="/" element={<Dashboard />} />
//                       <Route path="/leads" element={<LeadsList />} />
//                       <Route path="/leads/create" element={<LeadCreate />} />
//                       <Route path="/leads/edit/:id" element={<LeadEdit />} />
//                       <Route path="*" element={<Navigate to="/" replace />} />
//                     </Routes>
//                   </Layout>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </AuthProvider>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;









// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Box, CircularProgress } from '@mui/material';
// import { theme } from './theme/theme';
// import Layout from './components/shared/Layout';
// import Login from './pages/Login';

// // Import AuthProvider
// import { AuthProvider, useAuth } from './contexts/AuthContext';

// // Pages
// import Dashboard from './pages/Dashboard';
// import LeadsList from './pages/leads/LeadsList';
// import LeadCreate from './pages/leads/LeadCreate';
// import LeadEdit from './pages/leads/LeadEdit';

// // Protected Route Component - Now uses AuthContext
// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
  
//   // Show loading spinner while checking auth
//   if (loading) {
//     return (
//       <Box 
//         sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           minHeight: '100vh',
//           backgroundColor: '#F8FAFC'
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
  
//   // Redirect to login if not authenticated
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// }

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         {/* Wrap entire app with AuthProvider */}
//         <AuthProvider>
//           <Routes>
//             {/* Public Route - Login */}
//             <Route path="/login" element={<Login />} />
            
//             {/* Protected Routes */}
//             <Route
//               path="/*"
//               element={
//                 <ProtectedRoute>
//                   <Layout>
//                     <Routes>
//                       <Route path="/" element={<Dashboard />} />
//                       <Route path="/leads" element={<LeadsList />} />
//                       <Route path="/leads/create" element={<LeadCreate />} />
//                       <Route path="/leads/edit/:id" element={<LeadEdit />} />
//                       <Route path="*" element={<Navigate to="/" replace />} />
//                     </Routes>
//                   </Layout>
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </AuthProvider>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
import { theme } from './theme/theme';
import Layout from './components/shared/Layout';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ModuleGuard from './components/shared/ModuleGuard';

// ── Pages ──────────────────────────────────────────────────────────────────
import Dashboard        from './pages/Dashboard';
import LeadsList        from './pages/leads/LeadsList';
import LeadCreate       from './pages/leads/LeadCreate';
import LeadEdit         from './pages/leads/LeadEdit';
import PartnersList     from './pages/partners/PartnersList';
import PartnerCreate    from './pages/partners/PartnerCreate';
import PartnerEdit      from './pages/partners/PartnerEdit';
import Marketing        from './pages/marketing/Marketing';
import CampaignCreate   from './pages/marketing/CampaignCreate';
import CampaignEdit     from './pages/marketing/CampaignEdit';
import EventCreate      from './pages/marketing/EventCreate';
import EventEdit        from './pages/marketing/EventEdit';
import Locations        from './pages/locations/Locations';
import BranchCreate     from './pages/locations/BranchCreate';
import BranchEdit       from './pages/locations/BranchEdit';
import ProjectSiteCreate from './pages/locations/ProjectSiteCreate';
import ProjectSiteEdit  from './pages/locations/ProjectSiteEdit';
import HR               from './pages/hr/HR';
import EmployeeCreate   from './pages/hr/EmployeeCreate';
import EmployeeEdit     from './pages/hr/EmployeeEdit';
import TeamCreate       from './pages/hr/TeamCreate';
import TeamEdit         from './pages/hr/TeamEdit';
import TeamMembers      from './pages/hr/TeamMembers';
import TeamMemberAssign from './pages/hr/TeamMemberAssign';
import LeadSources      from './pages/leads/LeadSources';

// ── Loading spinner shown while auth state is rehydrating ─────────────────
function FullScreenLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <CircularProgress />
    </Box>
  );
}

// ── Redirects to /login if unauthenticated ────────────────────────────────
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <FullScreenLoader />;
  if (!user)   return <Navigate to="/login" replace />;
  return children;
}

// ── Inner routes (needs useAuth, so lives inside AuthProvider) ────────────
function AppRoutes() {
  const { access } = useAuth();

  return (
    <Routes>

      {/* ── Public ──────────────────────────────────────────────────────── */}
      <Route path="/login" element={<Login />} />

      {/* ── Protected shell ─────────────────────────────────────────────── */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>

                {/* Dashboard — always accessible when logged in */}
                <Route path="/" element={<Dashboard />} />

                {/* ── Leads ─────────────────────────────────────────────
                    canAccessLeads  = can_view_own_leads OR can_view_team_leads OR can_create_leads
                    canCreateLeads  = can_create_leads
                    canEditLeads    = can_edit_leads
                    ─────────────────────────────────────────────────── */}
                <Route path="/leads" element={
                  <ModuleGuard allowed={!!access.canAccessLeads}>
                    <LeadsList />
                  </ModuleGuard>
                } />
                <Route path="/leads/create" element={
                  <ModuleGuard allowed={!!access.canCreateLeads}>
                    <LeadCreate />
                  </ModuleGuard>
                } />
                <Route path="/leads/edit/:id" element={
                  <ModuleGuard allowed={!!access.canEditLeads}>
                    <LeadEdit />
                  </ModuleGuard>
                } />

                {/* ── Partners ───────────────────────────────────────────
                    canAccessPartners = same as canAccessLeads
                    (partners are referenced inside lead forms)
                    ─────────────────────────────────────────────────── */}
                <Route path="/partners" element={
                  <ModuleGuard allowed={!!access.canAccessPartners}>
                    <PartnersList />
                  </ModuleGuard>
                } />
                <Route path="/partners/create" element={
                  <ModuleGuard allowed={!!access.canAccessPartners}>
                    <PartnerCreate />
                  </ModuleGuard>
                } />
                <Route path="/partners/edit/:id" element={
                  <ModuleGuard allowed={!!access.canAccessPartners}>
                    <PartnerEdit />
                  </ModuleGuard>
                } />

                {/* ── Marketing ──────────────────────────────────────────
                    Docs: "Hide Admin screens if can_manage_config = false"
                    canAccessMarketing = can_manage_config
                    ─────────────────────────────────────────────────── */}
                {/* Lead Sources Management — Spec §4.4 Configuration Pages */}
                <Route path="/lead-sources" element={
                  <ModuleGuard allowed={!!access.canAccessMarketing}>
                    <LeadSources />
                  </ModuleGuard>
                } />

                <Route path="/marketing" element={
                  <ModuleGuard allowed={!!access.canAccessMarketing}>
                    <Marketing />
                  </ModuleGuard>
                } />
                <Route path="/marketing/campaigns/create" element={
                  <ModuleGuard allowed={!!access.canAccessMarketing}>
                    <CampaignCreate />
                  </ModuleGuard>
                } />
                <Route path="/marketing/campaigns/edit/:id" element={
                  <ModuleGuard allowed={!!access.canAccessMarketing}>
                    <CampaignEdit />
                  </ModuleGuard>
                } />
                <Route path="/marketing/events/create" element={
                  <ModuleGuard allowed={!!access.canAccessMarketing}>
                    <EventCreate />
                  </ModuleGuard>
                } />
                <Route path="/marketing/events/edit/:id" element={
                  <ModuleGuard allowed={!!access.canAccessMarketing}>
                    <EventEdit />
                  </ModuleGuard>
                } />

                {/* ── Locations ──────────────────────────────────────────
                    Docs: "Hide Admin screens if can_manage_config = false"
                    canAccessLocations = can_manage_config
                    ─────────────────────────────────────────────────── */}
                <Route path="/locations" element={
                  <ModuleGuard allowed={!!access.canAccessLocations}>
                    <Locations />
                  </ModuleGuard>
                } />
                <Route path="/locations/branches/create" element={
                  <ModuleGuard allowed={!!access.canAccessLocations}>
                    <BranchCreate />
                  </ModuleGuard>
                } />
                <Route path="/locations/branches/edit/:id" element={
                  <ModuleGuard allowed={!!access.canAccessLocations}>
                    <BranchEdit />
                  </ModuleGuard>
                } />
                <Route path="/locations/sites/create" element={
                  <ModuleGuard allowed={!!access.canAccessLocations}>
                    <ProjectSiteCreate />
                  </ModuleGuard>
                } />
                <Route path="/locations/sites/edit/:id" element={
                  <ModuleGuard allowed={!!access.canAccessLocations}>
                    <ProjectSiteEdit />
                  </ModuleGuard>
                } />

                {/* ── HR ────────────────────────────────────────────────
                    Docs: "Hide HR module if dept not HR/Management/Operations"
                    canAccessHR        = inHrDept AND (can_manage_employees OR can_manage_teams)
                    canManageEmployees = can_manage_employees
                    canManageTeams     = can_manage_teams
                    ─────────────────────────────────────────────────── */}
                <Route path="/hr" element={
                  <ModuleGuard allowed={!!access.canAccessHR}>
                    <HR />
                  </ModuleGuard>
                } />
                <Route path="/hr/employees/create" element={
                  <ModuleGuard allowed={!!access.canManageEmployees}>
                    <EmployeeCreate />
                  </ModuleGuard>
                } />
                <Route path="/hr/employees/edit/:id" element={
                  <ModuleGuard allowed={!!access.canManageEmployees}>
                    <EmployeeEdit />
                  </ModuleGuard>
                } />
                <Route path="/hr/teams/create" element={
                  <ModuleGuard allowed={!!access.canManageTeams}>
                    <TeamCreate />
                  </ModuleGuard>
                } />
                <Route path="/hr/teams/edit/:id" element={
                  <ModuleGuard allowed={!!access.canManageTeams}>
                    <TeamEdit />
                  </ModuleGuard>
                } />
                <Route path="/hr/teams/:teamId/members" element={
                  <ModuleGuard allowed={!!access.canAccessHR}>
                    <TeamMembers />
                  </ModuleGuard>
                } />
                <Route path="/hr/teams/:teamId/assign" element={
                  <ModuleGuard allowed={!!access.canManageTeams}>
                    <TeamMemberAssign />
                  </ModuleGuard>
                } />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}