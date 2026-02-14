
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

  // --- Campaigns ---
  getCampaigns() {
    return MOCK_DB.campaigns;
  },

  // --- Events ---
  getEvents() {
    return MOCK_DB.events;
  },

  // --- Branches ---
  getBranches() {
    return MOCK_DB.branches;
  },

  // --- Project Sites ---
  getProjectSites() {
    return MOCK_DB.project_sites;
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

  // Validation helpers
  isPhoneUnique(phone, excludeId = null) {
    return !MOCK_DB.leads.some(lead => 
      lead.phone === phone && lead.id !== excludeId
    );
  },

  isNationalIdUnique(nationalId, excludeId = null) {
    if (!nationalId) return true;
    return !MOCK_DB.leads.some(lead => 
      lead.national_id === nationalId && lead.id !== excludeId
    );
  },

  // Create lead
  createLead(leadData) {
    const newId = Math.max(...MOCK_DB.leads.map(l => l.id), 0) + 1;
    const newLead = { 
      id: newId, 
      ...leadData,
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
        id: id, // Keep the original ID
        updated_at: new Date().toISOString().split('T')[0]
      };
      return MOCK_DB.leads[index];
    }
    return null;
  }
};