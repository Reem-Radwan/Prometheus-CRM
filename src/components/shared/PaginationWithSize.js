import React from 'react';
import { Box, IconButton, Select, MenuItem, Typography } from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

const PAGE_SIZE_OPTIONS = [100, 200, 500, 1000, 1500, 2000];

const navBtnSx = {
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  p: 0.5,
  color: '#6B7280',
  '&:hover': { backgroundColor: 'rgba(59,130,246,0.08)', borderColor: '#93C5FD', color: '#2563EB' },
  '&.Mui-disabled': {
    opacity: 0.35,
    pointerEvents: 'none',
  },
};

const numBtnSx = (isActive) => ({
  minWidth: '32px',
  height: '32px',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: isActive ? '#2563EB' : '#E5E7EB',
  backgroundColor: isActive ? '#2563EB' : 'transparent',
  color: isActive ? '#fff' : '#374151',
  fontWeight: isActive ? 700 : 400,
  fontSize: '0.82rem',
  '&:hover': {
    backgroundColor: isActive ? '#1D4ED8' : 'rgba(59,130,246,0.08)',
    borderColor: isActive ? '#1D4ED8' : '#93C5FD',
    color: isActive ? '#fff' : '#2563EB',
  },
});

function getPageRange(page, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i);
  const pages = [];
  pages.push(0);
  if (page <= 3) {
    pages.push(1, 2, 3, 4, '...', totalPages - 1);
  } else if (page >= totalPages - 4) {
    pages.push('...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
  } else {
    pages.push('...', page - 1, page, page + 1, '...', totalPages - 1);
  }
  return pages;
}

export function PaginationWithSize({ page, totalPages, totalCount, pageSize, onPageChange, onPageSizeChange }) {
  if (totalCount === 0) return null;

  const from      = page * pageSize + 1;
  const to        = Math.min((page + 1) * pageSize, totalCount);
  const atStart   = page === 0;
  const atEnd     = page >= totalPages - 1;
  const pageRange = getPageRange(page, Math.max(totalPages, 1));

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 1.5, px: 2, py: 1.5,
      borderTop: '1px solid #E5E7EB',
      backgroundColor: '#F9FAFB',
      borderRadius: '0 0 12px 12px',
    }}>
      {/* Page size selector + count */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="caption" sx={{ color: '#6B7280', whiteSpace: 'nowrap' }}>
          Page Size:
        </Typography>
        <Select
          size="small"
          value={pageSize}
          onChange={e => { onPageSizeChange(Number(e.target.value)); onPageChange(0); }}
          sx={{
            fontSize: '0.82rem', height: '32px', color: '#374151',
            '& .MuiSelect-select': { py: 0.5, px: 1.25 },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#93C5FD' },
            '& .MuiSvgIcon-root': { color: '#6B7280' },
            borderRadius: '8px',
          }}
        >
          {PAGE_SIZE_OPTIONS.map(opt => (
            <MenuItem key={opt} value={opt} sx={{ fontSize: '0.82rem' }}>{opt}</MenuItem>
          ))}
        </Select>
        <Typography variant="caption" sx={{ color: '#6B7280', whiteSpace: 'nowrap' }}>
          {from}–{to} of {totalCount}
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton size="small" onClick={() => onPageChange(0)} disabled={atStart} sx={navBtnSx}>
          <FirstPageIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => onPageChange(page - 1)} disabled={atStart} sx={navBtnSx}>
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        {pageRange.map((p, i) =>
          p === '...'
            ? (
              <Typography key={`ellipsis-${i}`} sx={{ color: '#9CA3AF', px: 0.5, fontSize: '0.82rem', lineHeight: '32px' }}>
                …
              </Typography>
            ) : (
              <IconButton key={p} size="small" onClick={() => onPageChange(p)} sx={numBtnSx(p === page)}>
                {p + 1}
              </IconButton>
            )
        )}

        <IconButton size="small" onClick={() => onPageChange(page + 1)} disabled={atEnd} sx={navBtnSx}>
          <ChevronRightIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => onPageChange(totalPages - 1)} disabled={atEnd} sx={navBtnSx}>
          <LastPageIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}