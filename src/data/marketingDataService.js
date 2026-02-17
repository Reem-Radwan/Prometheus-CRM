/**
 * Marketing Data Service
 * Simulates Django Backend API for Marketing Module
 *
 * Endpoints simulated:
 *   GET/POST /api/platforms/
 *   GET/POST/PATCH/DELETE /api/campaigns/
 *   GET/POST/PATCH/DELETE /api/events/
 */

// ─── Social Platforms ─────────────────────────────────────────────────────────
const MOCK_PLATFORMS = [
  { id: 1, name: 'Facebook' },
  { id: 2, name: 'Instagram' },
  { id: 3, name: 'Google Ads' },
  { id: 4, name: 'TikTok' },
  { id: 5, name: 'LinkedIn' },
  { id: 6, name: 'YouTube' },
];

// ─── Campaigns ────────────────────────────────────────────────────────────────
const MOCK_CAMPAIGNS = [
  {
    id: 500,
    name: 'Summer Launch 2026',
    platform_id: 1,
    budget: 50000,
    start_date: '2026-06-01',
    end_date: '2026-08-31',
    is_active: true,
    created_at: '2026-01-15',
  },
  {
    id: 501,
    name: 'Ramadan Special Offer',
    platform_id: 2,
    budget: 30000,
    start_date: '2026-03-01',
    end_date: '2026-03-30',
    is_active: false,
    created_at: '2026-01-20',
  },
  {
    id: 502,
    name: 'New Year Awareness',
    platform_id: 3,
    budget: 20000,
    start_date: '2026-01-01',
    end_date: '2026-01-31',
    is_active: false,
    created_at: '2025-12-20',
  },
  {
    id: 503,
    name: 'Q3 Lead Generation',
    platform_id: 1,
    budget: 75000,
    start_date: '2026-07-01',
    end_date: '2026-09-30',
    is_active: true,
    created_at: '2026-02-01',
  },
  {
    id: 504,
    name: 'TikTok Awareness Drive',
    platform_id: 4,
    budget: 15000,
    start_date: '2026-04-01',
    end_date: '2026-04-30',
    is_active: true,
    created_at: '2026-02-10',
  },
  {
    id: 505,
    name: 'LinkedIn B2B Campaign',
    platform_id: 5,
    budget: 25000,
    start_date: '2026-05-01',
    end_date: '2026-05-31',
    is_active: false,
    created_at: '2026-02-12',
  },
];

// ─── Events ───────────────────────────────────────────────────────────────────
const MOCK_EVENTS = [
  {
    id: 600,
    name: 'Cityscape Egypt 2026',
    start_date: '2026-03-20',
    end_date: '2026-03-23',
    is_active: true,
    created_at: '2026-01-10',
  },
  {
    id: 601,
    name: 'Cairo Real Estate Summit',
    start_date: '2026-05-15',
    end_date: '2026-05-17',
    is_active: true,
    created_at: '2026-01-18',
  },
  {
    id: 602,
    name: 'New Cairo Property Expo',
    start_date: '2026-02-10',
    end_date: '2026-02-12',
    is_active: false,
    created_at: '2025-12-01',
  },
  {
    id: 603,
    name: 'Investor Day – Prometheus Compound',
    start_date: '2026-04-05',
    end_date: '2026-04-05',
    is_active: true,
    created_at: '2026-02-05',
  },
  {
    id: 604,
    name: 'October Open House',
    start_date: '2026-06-20',
    end_date: '2026-06-20',
    is_active: true,
    created_at: '2026-02-14',
  },
];

let nextCampaignId = 506;
let nextEventId = 605;

// ─── Platform helpers ─────────────────────────────────────────────────────────
const PLATFORM_COLORS = {
  1: { bg: '#EFF6FF', color: '#1D4ED8', label: 'Facebook' },
  2: { bg: '#FDF2F8', color: '#9D174D', label: 'Instagram' },
  3: { bg: '#FEF9C3', color: '#92400E', label: 'Google Ads' },
  4: { bg: '#F0FDF4', color: '#166534', label: 'TikTok' },
  5: { bg: '#EFF6FF', color: '#1E3A8A', label: 'LinkedIn' },
  6: { bg: '#FEF2F2', color: '#991B1B', label: 'YouTube' },
};

export const getPlatformStyle = (platformId) =>
  PLATFORM_COLORS[platformId] || { bg: '#F3F4F6', color: '#374151', label: 'Unknown' };

// ─── MarketingDataService ─────────────────────────────────────────────────────
export const MarketingDataService = {
  // ── Platforms ──────────────────────────────────────────────────────────────
  getPlatforms() {
    return [...MOCK_PLATFORMS];
  },
  getPlatformById(id) {
    return MOCK_PLATFORMS.find((p) => p.id === parseInt(id)) || null;
  },

  // ── Campaigns ──────────────────────────────────────────────────────────────
  getCampaigns() {
    return [...MOCK_CAMPAIGNS];
  },
  getCampaignById(id) {
    return MOCK_CAMPAIGNS.find((c) => c.id === parseInt(id)) || null;
  },
  createCampaign(data) {
    const newCampaign = {
      id: nextCampaignId++,
      created_at: new Date().toISOString().split('T')[0],
      is_active: true,
      ...data,
    };
    MOCK_CAMPAIGNS.push(newCampaign);
    return newCampaign;
  },
  updateCampaign(id, updates) {
    const index = MOCK_CAMPAIGNS.findIndex((c) => c.id === parseInt(id));
    if (index === -1) return null;
    MOCK_CAMPAIGNS[index] = {
      ...MOCK_CAMPAIGNS[index],
      ...updates,
      id: MOCK_CAMPAIGNS[index].id,
      created_at: MOCK_CAMPAIGNS[index].created_at,
    };
    return MOCK_CAMPAIGNS[index];
  },
  deleteCampaign(id) {
    const index = MOCK_CAMPAIGNS.findIndex((c) => c.id === parseInt(id));
    if (index === -1) return false;
    MOCK_CAMPAIGNS.splice(index, 1);
    return true;
  },

  // ── Events ─────────────────────────────────────────────────────────────────
  getEvents() {
    return [...MOCK_EVENTS];
  },
  getEventById(id) {
    return MOCK_EVENTS.find((e) => e.id === parseInt(id)) || null;
  },
  createEvent(data) {
    const newEvent = {
      id: nextEventId++,
      created_at: new Date().toISOString().split('T')[0],
      is_active: true,
      ...data,
    };
    MOCK_EVENTS.push(newEvent);
    return newEvent;
  },
  updateEvent(id, updates) {
    const index = MOCK_EVENTS.findIndex((e) => e.id === parseInt(id));
    if (index === -1) return null;
    MOCK_EVENTS[index] = {
      ...MOCK_EVENTS[index],
      ...updates,
      id: MOCK_EVENTS[index].id,
      created_at: MOCK_EVENTS[index].created_at,
    };
    return MOCK_EVENTS[index];
  },
  deleteEvent(id) {
    const index = MOCK_EVENTS.findIndex((e) => e.id === parseInt(id));
    if (index === -1) return false;
    MOCK_EVENTS.splice(index, 1);
    return true;
  },

  // ── Cross-module helpers ───────────────────────────────────────────────────
  /** Get campaign status label based on dates */
  getCampaignStatus(campaign) {
    const today = new Date().toISOString().split('T')[0];
    if (!campaign.is_active) return 'Inactive';
    if (campaign.end_date && campaign.end_date < today) return 'Ended';
    if (campaign.start_date > today) return 'Upcoming';
    return 'Running';
  },
  getCampaignStatusStyle(status) {
    const map = {
      Running:  { bg: '#DCFCE7', color: '#166534' },
      Upcoming: { bg: '#DBEAFE', color: '#1D4ED8' },
      Ended:    { bg: '#F3F4F6', color: '#6B7280' },
      Inactive: { bg: '#FEE2E2', color: '#991B1B' },
    };
    return map[status] || map['Inactive'];
  },
  getEventStatus(event) {
    const today = new Date().toISOString().split('T')[0];
    if (!event.is_active) return 'Inactive';
    if (event.end_date && event.end_date < today) return 'Past';
    if (event.start_date > today) return 'Upcoming';
    return 'Ongoing';
  },
  getEventStatusStyle(status) {
    const map = {
      Ongoing:  { bg: '#DCFCE7', color: '#166534' },
      Upcoming: { bg: '#DBEAFE', color: '#1D4ED8' },
      Past:     { bg: '#F3F4F6', color: '#6B7280' },
      Inactive: { bg: '#FEE2E2', color: '#991B1B' },
    };
    return map[status] || map['Inactive'];
  },
};