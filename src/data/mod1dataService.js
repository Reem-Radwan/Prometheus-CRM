import { MOCK_DB } from './mockDB';

/**
 * Data Service Layer - Centralized data access
 * All UI components should use this layer instead of directly accessing MOCK_DB
 */

export const DataService = {
  // --- Lead Sources ---
  getLeadSources() {
    return MOCK_DB.lead_sources;
  },

  getLeadSourceById(id) {
    return MOCK_DB.lead_sources.find(source => source.id === id);
  },

  createLeadSource(data) {
    const newId = Math.max(...MOCK_DB.lead_sources.map(s => s.id), 0) + 1;
    const newSource = { id: newId, ...data };
    MOCK_DB.lead_sources.push(newSource);
    return newSource;
  },

  updateLeadSource(id, data) {
    const index = MOCK_DB.lead_sources.findIndex(s => s.id === id);
    if (index > -1) {
      MOCK_DB.lead_sources[index] = { ...MOCK_DB.lead_sources[index], ...data, id };
      return MOCK_DB.lead_sources[index];
    }
    return null;
  },

  deleteLeadSource(id) {
    const index = MOCK_DB.lead_sources.findIndex(s => s.id === id);
    if (index > -1) {
      MOCK_DB.lead_sources.splice(index, 1);
      return true;
    }
    return false;
  },

  // --- Campaigns ---
  getCampaigns() {
    return MOCK_DB.campaigns;
  },

  getCampaignById(id) {
    return MOCK_DB.campaigns.find(c => c.id === id);
  },

  // --- Events ---
  getEvents() {
    return MOCK_DB.events;
  },

  getEventById(id) {
    return MOCK_DB.events.find(e => e.id === id);
  },

  // --- Branches ---
  getBranches() {
    return MOCK_DB.branches;
  },

  getBranchById(id) {
    return MOCK_DB.branches.find(b => b.id === id);
  },

  // --- Project Sites ---
  getProjectSites() {
    return MOCK_DB.project_sites;
  },

  getProjectSiteById(id) {
    return MOCK_DB.project_sites.find(s => s.id === id);
  },

  // --- Partners ---
  getPartners() {
    return MOCK_DB.partners;
  },

  getPartnersByType(type) {
    return MOCK_DB.partners.filter(partner => partner.type === type);
  },

  getPartnerById(id) {
    return MOCK_DB.partners.find(partner => partner.id === id);
  },

  // --- Leads ---
  getLeads() {
    return MOCK_DB.leads;
  },

  getLeadById(id) {
    return MOCK_DB.leads.find(lead => lead.id === id);
  },

  // Helper: Normalize phone to international format for comparison
  _normalizePhone(phone) {
    if (!phone) return null;
    if (phone.startsWith('01')) {
      return '+20' + phone.substring(1);
    }
    return phone;
  },

  // Validation helpers with phone normalization
  isPhoneUnique(phone, excludeId = null) {
    if (!phone) return true;
    const normalizedPhone = this._normalizePhone(phone);
    return !MOCK_DB.leads.some(lead => {
      const leadPhone = this._normalizePhone(lead.phone);
      return leadPhone === normalizedPhone && lead.id !== excludeId;
    });
  },

  isNationalIdUnique(nationalId, excludeId = null) {
    if (!nationalId) return true;
    return !MOCK_DB.leads.some(lead =>
      String(lead.national_id) === String(nationalId) && lead.id !== excludeId
    );
  },

  // Create lead
  createLead(leadData) {
    const newId = Math.max(...MOCK_DB.leads.map(l => l.id), 0) + 1;
    const newLead = {
      id: newId,
      ...leadData,
      created_by_name: leadData.created_by_name || 'Current User',
      created_at: new Date().toISOString().split('T')[0]
    };
    MOCK_DB.leads.push(newLead);
    return newLead;
  },

  // Delete lead
  deleteLead(id) {
    const index = MOCK_DB.leads.findIndex(lead => lead.id === id);
    if (index > -1) {
      MOCK_DB.leads.splice(index, 1);
      return true;
    }
    return false;
  },

  // Update lead
  updateLead(id, leadData) {
    const index = MOCK_DB.leads.findIndex(lead => lead.id === id);
    if (index > -1) {
      MOCK_DB.leads[index] = {
        ...MOCK_DB.leads[index],
        ...leadData,
        id,
        created_by_name: MOCK_DB.leads[index].created_by_name,
        created_at: MOCK_DB.leads[index].created_at,
        updated_at: new Date().toISOString().split('T')[0]
      };
      return MOCK_DB.leads[index];
    }
    return null;
  }
};