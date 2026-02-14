import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import Layout from './components/shared/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import LeadsList from './pages/leads/LeadsList';
import LeadCreate from './pages/leads/LeadCreate';
import LeadEdit from './pages/leads/LeadEdit';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadsList />} />
            <Route path="/leads/create" element={<LeadCreate />} />
            <Route path="/leads/edit/:id" element={<LeadEdit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;