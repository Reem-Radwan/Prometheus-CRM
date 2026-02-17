
// import { MOCK_DB } from './mockDB';

// /**
//  * Data Service Layer - Centralized data access
//  * All UI components should use this layer instead of directly accessing MOCK_DB
//  */

// export const DataService = {
//   // --- Lead Sources ---
//   getLeadSources() {
//     return MOCK_DB.lead_sources;
//   },

//   getLeadSourceById(id) {
//     return MOCK_DB.lead_sources.find(source => source.id === id);
//   },

//   // --- Campaigns ---
//   getCampaigns() {
//     return MOCK_DB.campaigns;
//   },

//   // --- Events ---
//   getEvents() {
//     return MOCK_DB.events;
//   },

//   // --- Branches ---
//   getBranches() {
//     return MOCK_DB.branches;
//   },

//   // --- Project Sites ---
//   getProjectSites() {
//     return MOCK_DB.project_sites;
//   },

//   // --- Partners ---
//   getPartners() {
//     return MOCK_DB.partners;
//   },

//   getPartnersByType(type) {
//     return MOCK_DB.partners.filter(partner => partner.type === type);
//   },

//   getPartnerById(id) {
//     return MOCK_DB.partners.find(partner => partner.id === id);
//   },

//   // --- Leads ---
//   getLeads() {
//     return MOCK_DB.leads;
//   },

//   getLeadById(id) {
//     return MOCK_DB.leads.find(lead => lead.id === id);
//   },

//   // Validation helpers
//   isPhoneUnique(phone, excludeId = null) {
//     return !MOCK_DB.leads.some(lead => 
//       lead.phone === phone && lead.id !== excludeId
//     );
//   },

//   isNationalIdUnique(nationalId, excludeId = null) {
//     if (!nationalId) return true;
//     return !MOCK_DB.leads.some(lead => 
//       lead.national_id === nationalId && lead.id !== excludeId
//     );
//   },

//   // Create lead
//   createLead(leadData) {
//     const newId = Math.max(...MOCK_DB.leads.map(l => l.id), 0) + 1;
//     const newLead = { 
//       id: newId, 
//       ...leadData,
//       created_at: new Date().toISOString().split('T')[0]
//     };
    
//     MOCK_DB.leads.push(newLead);
//     return newLead;
//   },

//   // Delete lead
//   deleteLead(id) {
//     const index = MOCK_DB.leads.findIndex(lead => lead.id === id);
//     if (index > -1) {
//       MOCK_DB.leads.splice(index, 1);
//       return true;
//     }
//     return false;
//   },

//   // Update lead
//   updateLead(id, leadData) {
//     const index = MOCK_DB.leads.findIndex(lead => lead.id === id);
//     if (index > -1) {
//       MOCK_DB.leads[index] = {
//         ...MOCK_DB.leads[index],
//         ...leadData,
//         id: id, // Keep the original ID
//         updated_at: new Date().toISOString().split('T')[0]
//       };
//       return MOCK_DB.leads[index];
//     }
//     return null;
//   }
// };








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
    // NOTE FOR API INTEGRATION:
    // Real API will return paginated response:
    // {
    //   count: 100,
    //   next: "http://localhost:8000/api/leads/?page=2",
    //   previous: null,
    //   results: [...leads]
    // }
    // You'll need to extract the "results" array when integrating.
    return MOCK_DB.leads;
  },

  getLeadById(id) {
    return MOCK_DB.leads.find(lead => lead.id === id);
  },

  // Helper: Normalize phone to international format for comparison
  _normalizePhone(phone) {
    if (!phone) return null;
    // Convert 01XXXXXXXXX to +20XXXXXXXXX
    if (phone.startsWith('01')) {
      return '+20' + phone.substring(1);
    }
    // Already in international format
    return phone;
  },

  // Validation helpers with phone normalization
  isPhoneUnique(phone, excludeId = null) {
    if (!phone) return true;
    
    // Normalize input phone to international format
    const normalizedPhone = this._normalizePhone(phone);
    
    return !MOCK_DB.leads.some(lead => {
      // Normalize stored phone for comparison
      const leadPhone = this._normalizePhone(lead.phone);
      return leadPhone === normalizedPhone && lead.id !== excludeId;
    });
  },

  isNationalIdUnique(nationalId, excludeId = null) {
    if (!nationalId) return true;
    // Ensure string comparison to handle both string and number inputs
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
      // Simulate backend behavior - add created_by_name if not provided
      created_by_name: leadData.created_by_name || "Current User",
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
        created_by_name: MOCK_DB.leads[index].created_by_name, // Keep original creator
        created_at: MOCK_DB.leads[index].created_at, // Keep original creation date
        updated_at: new Date().toISOString().split('T')[0]
      };
      return MOCK_DB.leads[index];
    }
    return null;
  }
};
