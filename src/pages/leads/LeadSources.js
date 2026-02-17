import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Fade,
} from '@mui/material';
import { DataService } from '../../data/mod1dataService';
import PageHeader from '../../components/shared/PageHeader';

/**
 * Lead Sources Management — Configuration Page (Admin Only)
 * Spec §4.4: "Lead Sources Management" — read-only display of lead sources
 * API §3.5: GET /api/lead-sources/ → fields: id, name, category, system_code
 * Guard: canManageConfig (can_manage_config = true)
 */

const CATEGORY_COLORS = {
  direct:   { bg: '#EFF6FF', color: '#1D4ED8', label: 'Direct' },
  indirect: { bg: '#F0FDF4', color: '#15803D', label: 'Indirect' },
};

const SYSTEM_CODE_LABELS = {
  social_media:   'Social Media',
  events:         'Events',
  walk_in:        'Walk-In',
  broker:         'Broker',
  ambassador:     'Ambassador',
  visit:          'Visit',
  self_generated: 'Self Generated',
};

export default function LeadSources() {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    setSources(DataService.getLeadSources());
  }, []);

  const getCategoryStyle = useCallback((category) => {
    return CATEGORY_COLORS[category] || { bg: '#F3F4F6', color: '#374151', label: category };
  }, []);

  return (
    <Box>
      <PageHeader
        title="Lead Sources"
        subtitle="View all lead source types and their system codes"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Lead Sources', active: true },
        ]}
      />

      <Card sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700, color: '#374151', fontSize: '0.8125rem' }}>
                  ID
                </TableCell>
                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700, color: '#374151', fontSize: '0.8125rem' }}>
                  Name
                </TableCell>
                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700, color: '#374151', fontSize: '0.8125rem' }}>
                  Category
                </TableCell>
                <TableCell sx={{ py: 1.5, px: 2, fontWeight: 700, color: '#374151', fontSize: '0.8125rem' }}>
                  System Code
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No lead sources found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sources.map((source) => {
                  const catStyle = getCategoryStyle(source.category);
                  return (
                    <Fade in key={source.id} timeout={300}>
                      <TableRow
                        hover
                        sx={{ '&:hover': { backgroundColor: '#F9FAFB' }, transition: 'background-color 0.15s' }}
                      >
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Chip
                            label={`#${source.id}`}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Typography variant="body2" fontWeight={600}>
                            {source.name}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Chip
                            label={catStyle.label}
                            size="small"
                            sx={{
                              backgroundColor: catStyle.bg,
                              color: catStyle.color,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 2 }}>
                          <Typography
                            variant="body2"
                            fontFamily="monospace"
                            sx={{
                              backgroundColor: '#F3F4F6',
                              px: 1,
                              py: 0.25,
                              borderRadius: '4px',
                              display: 'inline-block',
                              fontSize: '0.8125rem',
                              color: '#4B5563',
                            }}
                          >
                            {source.system_code}
                          </Typography>
                          {SYSTEM_CODE_LABELS[source.system_code] && (
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                              ({SYSTEM_CODE_LABELS[source.system_code]})
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    </Fade>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}