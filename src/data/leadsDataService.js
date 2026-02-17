// ===================================================================
// leadsDataService.js - UPDATED TO MATCH API DOCUMENTATION
// Mock Leads Data Service that mirrors Django Backend API
// ===================================================================

/**
 * Mock Lead Sources (matches GET /api/lead-sources/)
 * Fields: id, name, category, system_code
 */
// export const MOCK_LEAD_SOURCES = [
//   { id: 1, name: 'Facebook Ads', category: 'Digital Marketing', system_code: 'FB_ADS' },
//   { id: 2, name: 'Google Ads', category: 'Digital Marketing', system_code: 'GOOGLE_ADS' },
//   { id: 3, name: 'Instagram', category: 'Social Media', system_code: 'INSTAGRAM' },
//   { id: 4, name: 'Walk-in', category: 'Direct', system_code: 'WALK_IN' },
//   { id: 5, name: 'Phone Call', category: 'Direct', system_code: 'PHONE' },
//   { id: 6, name: 'Email', category: 'Direct', system_code: 'EMAIL' },
//   { id: 7, name: 'Referral', category: 'Word of Mouth', system_code: 'REFERRAL' },
//   { id: 8, name: 'Partner', category: 'Partnership', system_code: 'PARTNER' },
//   { id: 9, name: 'Event', category: 'Event', system_code: 'EVENT' },
//   { id: 10, name: 'Campaign', category: 'Campaign', system_code: 'CAMPAIGN' },
// ];

// /**
//  * Mock Partners (matches GET /api/partners/)
//  * Fields: id, name, partner_type, company_name
//  */
// export const MOCK_PARTNERS = [
//   { id: 1, name: 'Ahmed Real Estate', partner_type: 'Broker', company_name: 'Ahmed Real Estate Co.' },
//   { id: 2, name: 'Elite Properties', partner_type: 'Agency', company_name: 'Elite Properties Ltd.' },
//   { id: 3, name: 'Mortgage Plus', partner_type: 'Bank', company_name: 'Mortgage Plus Bank' },
//   { id: 4, name: 'Golden Broker', partner_type: 'Broker', company_name: 'Golden Broker Services' },
// ];

// /**
//  * Mock Branches (matches GET /api/branches/)
//  * Fields: id, name, address, is_active
//  */
// export const MOCK_BRANCHES = [
//   { id: 1, name: 'Cairo Downtown', address: '123 Tahrir Square, Cairo', is_active: true },
//   { id: 2, name: 'New Cairo', address: '456 Fifth Settlement, New Cairo', is_active: true },
//   { id: 3, name: 'Alexandria', address: '789 Corniche Road, Alexandria', is_active: true },
//   { id: 4, name: '6th October', address: '321 Mall of Arabia, 6th October', is_active: true },
// ];

// /**
//  * Mock Campaigns (matches GET /api/campaigns/)
//  */
// export const MOCK_CAMPAIGNS = [
//   { id: 1, name: 'Summer Sale 2024', start_date: '2024-06-01', end_date: '2024-08-31' },
//   { id: 2, name: 'New Year Offer', start_date: '2024-01-01', end_date: '2024-01-31' },
//   { id: 3, name: 'Ramadan Special', start_date: '2024-03-10', end_date: '2024-04-09' },
// ];

// /**
//  * Mock Events (matches GET /api/events/)
//  */
// export const MOCK_EVENTS = [
//   { id: 1, name: 'Cairo Real Estate Expo 2024', date: '2024-05-15', location: 'Cairo ICC' },
//   { id: 2, name: 'Property Investment Summit', date: '2024-09-20', location: 'Four Seasons' },
//   { id: 3, name: 'Apartment Launch Event', date: '2024-07-10', location: 'New Cairo Showroom' },
// ];

// /**
//  * Mock Leads (matches GET /api/leads/)
//  * 
//  * API Fields:
//  * id, first_name, last_name, phone, national_id, email, job_title,
//  * source, partner, campaign, event, walk_in_branch, visit_details,
//  * created_by_name, notes, created_at
//  */
// const MOCK_LEADS = [
//   {
//     id: 1,
//     first_name: 'Ahmed',
//     last_name: 'Hassan',
//     phone: '+201001234567',
//     national_id: '29001011234567',
//     email: 'ahmed.hassan@email.com',
//     job_title: 'Engineer',
//     source: 1, // Facebook Ads
//     partner: null,
//     campaign: 1, // Summer Sale 2024
//     event: null,
//     walk_in_branch: null,
//     visit_details: null,
//     created_by_name: 'Ahmed Hassan',
//     notes: 'Interested in 2-bedroom apartment in New Cairo',
//     created_at: '2024-02-15T10:30:00Z'
//   },
//   {
//     id: 2,
//     first_name: 'Fatma',
//     last_name: 'Mohamed',
//     phone: '+201112345678',
//     national_id: '29101011234567',
//     email: 'fatma.mohamed@email.com',
//     job_title: 'Doctor',
//     source: 4, // Walk-in
//     partner: null,
//     campaign: null,
//     event: null,
//     walk_in_branch: 1, // Cairo Downtown
//     visit_details: 'Walked in on Saturday afternoon, asked about payment plans',
//     created_by_name: 'Mohamed Salem',
//     notes: 'Looking for villa in 6th October. Budget: 5-7M EGP',
//     created_at: '2024-02-16T14:20:00Z'
//   },
//   {
//     id: 3,
//     first_name: 'Omar',
//     last_name: 'Ali',
//     phone: '+201223456789',
//     national_id: '28501011234567',
//     email: 'omar.ali@email.com',
//     job_title: 'Business Owner',
//     source: 8, // Partner
//     partner: 1, // Ahmed Real Estate
//     campaign: null,
//     event: null,
//     walk_in_branch: null,
//     visit_details: null,
//     created_by_name: 'Ahmed Hassan',
//     notes: 'Referred by Ahmed Real Estate. High priority client.',
//     created_at: '2024-02-14T09:15:00Z'
//   },
//   {
//     id: 4,
//     first_name: 'Nour',
//     last_name: 'Ibrahim',
//     phone: '+201334567890',
//     national_id: '29201011234567',
//     email: 'nour.ibrahim@email.com',
//     job_title: 'Teacher',
//     source: 9, // Event
//     partner: null,
//     campaign: null,
//     event: 1, // Cairo Real Estate Expo 2024
//     walk_in_branch: null,
//     visit_details: 'Met at Expo booth, showed interest in affordable housing',
//     created_by_name: 'Sara Ahmed',
//     notes: 'First-time buyer. Needs financing advice.',
//     created_at: '2024-02-17T11:45:00Z'
//   },
//   {
//     id: 5,
//     first_name: 'Khaled',
//     last_name: 'Mahmoud',
//     phone: '+201445678901',
//     national_id: '27501011234567',
//     email: 'khaled.mahmoud@email.com',
//     job_title: 'Lawyer',
//     source: 2, // Google Ads
//     partner: null,
//     campaign: 2, // New Year Offer
//     event: null,
//     walk_in_branch: null,
//     visit_details: null,
//     created_by_name: 'Ahmed Hassan',
//     notes: 'Clicked on Google Ad. Interested in commercial property.',
//     created_at: '2024-02-13T16:30:00Z'
//   },
//   {
//     id: 6,
//     first_name: 'Mona',
//     last_name: 'Samir',
//     phone: '+201556789012',
//     national_id: '29301011234567',
//     email: 'mona.samir@email.com',
//     job_title: 'Pharmacist',
//     source: 5, // Phone Call
//     partner: null,
//     campaign: null,
//     event: null,
//     walk_in_branch: null,
//     visit_details: null,
//     created_by_name: 'Fatma Ibrahim',
//     notes: 'Called inquiring about studio apartments. Budget: 1.5-2M EGP',
//     created_at: '2024-02-17T13:00:00Z'
//   },
//   {
//     id: 7,
//     first_name: 'Youssef',
//     last_name: 'Adel',
//     phone: '+201667890123',
//     national_id: '28801011234567',
//     email: 'youssef.adel@email.com',
//     job_title: 'Architect',
//     source: 7, // Referral
//     partner: null,
//     campaign: null,
//     event: null,
//     walk_in_branch: null,
//     visit_details: null,
//     created_by_name: 'Mohamed Salem',
//     notes: 'Referred by existing client. Very interested in duplex units.',
//     created_at: '2024-02-12T10:00:00Z'
//   },
//   {
//     id: 8,
//     first_name: 'Laila',
//     last_name: 'Sherif',
//     phone: '+201778901234',
//     national_id: '29401011234567',
//     email: 'laila.sherif@email.com',
//     job_title: 'HR Manager',
//     source: 3, // Instagram
//     partner: null,
//     campaign: 3, // Ramadan Special
//     event: null,
//     walk_in_branch: null,
//     visit_details: null,
//     created_by_name: 'Ahmed Hassan',
//     notes: 'Contacted via Instagram DM. Looking for family apartment.',
//     created_at: '2024-02-16T09:30:00Z'
//   },
//   {
//     id: 9,
//     first_name: 'Tarek',
//     last_name: 'Fouad',
//     phone: '+201889012345',
//     national_id: '27801011234567',
//     email: 'tarek.fouad@email.com',
//     job_title: 'Software Engineer',
//     source: 4, // Walk-in
//     partner: null,
//     campaign: null,
//     event: null,
//     walk_in_branch: 2, // New Cairo
//     visit_details: 'Visited New Cairo branch. Asked about smart home features.',
//     created_by_name: 'Mohamed Salem',
//     notes: 'Tech-savvy. Wants modern apartment with automation.',
//     created_at: '2024-02-15T15:45:00Z'
//   },
//   {
//     id: 10,
//     first_name: 'Hana',
//     last_name: 'Kamal',
//     phone: '+201990123456',
//     national_id: '29501011234567',
//     email: 'hana.kamal@email.com',
//     job_title: 'Accountant',
//     source: 8, // Partner
//     partner: 2, // Elite Properties
//     campaign: null,
//     event: null,
//     walk_in_branch: null,
//     visit_details: null,
//     created_by_name: 'Sara Ahmed',
//     notes: 'Partner lead. Looking for investment property.',
//     created_at: '2024-02-17T12:15:00Z'
//   }
// ];

// /**
//  * LeadsDataService
//  * Simulates Django Backend API for Leads Module
//  */
// export const LeadsDataService = {
//   /**
//    * Get All Leads (Simulates GET /api/leads/)
//    * @returns {Array}
//    */
//   getLeads() {
//     return [...MOCK_LEADS];
//   },

//   /**
//    * Get Lead by ID (Simulates GET /api/leads/{id}/)
//    * @param {number} id 
//    * @returns {Object|null}
//    */
//   getLeadById(id) {
//     return MOCK_LEADS.find(lead => lead.id === parseInt(id)) || null;
//   },

//   /**
//    * Create Lead (Simulates POST /api/leads/)
//    * @param {Object} leadData 
//    * @returns {Object}
//    */
//   createLead(leadData) {
//     const newLead = {
//       id: MOCK_LEADS.length + 1,
//       created_at: new Date().toISOString(),
//       created_by_name: 'Current User', // Should come from auth
//       ...leadData
//     };
//     MOCK_LEADS.push(newLead);
//     return newLead;
//   },

//   /**
//    * Update Lead (Simulates PATCH /api/leads/{id}/)
//    * @param {number} id 
//    * @param {Object} updates 
//    * @returns {Object|null}
//    */
//   updateLead(id, updates) {
//     const index = MOCK_LEADS.findIndex(lead => lead.id === parseInt(id));
//     if (index === -1) return null;
    
//     MOCK_LEADS[index] = { ...MOCK_LEADS[index], ...updates };
//     return MOCK_LEADS[index];
//   },

//   /**
//    * Delete Lead (Simulates DELETE /api/leads/{id}/)
//    * @param {number} id 
//    * @returns {boolean}
//    */
//   deleteLead(id) {
//     const index = MOCK_LEADS.findIndex(lead => lead.id === parseInt(id));
//     if (index === -1) return false;
    
//     MOCK_LEADS.splice(index, 1);
//     return true;
//   },

//   /**
//    * Get Lead Sources (Simulates GET /api/lead-sources/)
//    * @returns {Array}
//    */
//   getLeadSources() {
//     return [...MOCK_LEAD_SOURCES];
//   },

//   /**
//    * Get Partners (Simulates GET /api/partners/)
//    * @returns {Array}
//    */
//   getPartners() {
//     return [...MOCK_PARTNERS];
//   },

//   /**
//    * Get Branches (Simulates GET /api/branches/)
//    * @returns {Array}
//    */
//   getBranches() {
//     return [...MOCK_BRANCHES];
//   },

//   /**
//    * Get Campaigns (Simulates GET /api/campaigns/)
//    * @returns {Array}
//    */
//   getCampaigns() {
//     return [...MOCK_CAMPAIGNS];
//   },

//   /**
//    * Get Events (Simulates GET /api/events/)
//    * @returns {Array}
//    */
//   getEvents() {
//     return [...MOCK_EVENTS];
//   }
// };



// ===================================================================
// leadsDataService.js - DEPRECATED / ORPHANED
// ⚠️  WARNING: This file is NOT imported by any active component.
//     The app uses mod1dataService.js + mockDB.js instead.
//
//     Known field-name mismatches with API spec:
//       - "source"          → should be "source_id" (integer FK)
//       - "partner"         → should be "partner_id" (integer FK)
//       - "walk_in_branch"  → should be "walk_in_branch_id" (integer FK)
//       - "visit_details"   → should be an object, not a string
//       - partner_type caps → should be lowercase "broker"/"ambassador"
//
//     Do NOT wire this file into new components without fixing the above.
// ===================================================================

/**
 * Mock Lead Sources (matches GET /api/lead-sources/)
 * Fields: id, name, category, system_code
 */
export const MOCK_LEAD_SOURCES = [
  { id: 1, name: 'Facebook Ads', category: 'Digital Marketing', system_code: 'FB_ADS' },
  { id: 2, name: 'Google Ads', category: 'Digital Marketing', system_code: 'GOOGLE_ADS' },
  { id: 3, name: 'Instagram', category: 'Social Media', system_code: 'INSTAGRAM' },
  { id: 4, name: 'Walk-in', category: 'Direct', system_code: 'WALK_IN' },
  { id: 5, name: 'Phone Call', category: 'Direct', system_code: 'PHONE' },
  { id: 6, name: 'Email', category: 'Direct', system_code: 'EMAIL' },
  { id: 7, name: 'Referral', category: 'Word of Mouth', system_code: 'REFERRAL' },
  { id: 8, name: 'Partner', category: 'Partnership', system_code: 'PARTNER' },
  { id: 9, name: 'Event', category: 'Event', system_code: 'EVENT' },
  { id: 10, name: 'Campaign', category: 'Campaign', system_code: 'CAMPAIGN' },
];

/**
 * Mock Partners (matches GET /api/partners/)
 * Fields: id, name, partner_type, company_name
 */
export const MOCK_PARTNERS = [
  { id: 1, name: 'Ahmed Real Estate', partner_type: 'Broker', company_name: 'Ahmed Real Estate Co.' },
  { id: 2, name: 'Elite Properties', partner_type: 'Agency', company_name: 'Elite Properties Ltd.' },
  { id: 3, name: 'Mortgage Plus', partner_type: 'Bank', company_name: 'Mortgage Plus Bank' },
  { id: 4, name: 'Golden Broker', partner_type: 'Broker', company_name: 'Golden Broker Services' },
];

/**
 * Mock Branches (matches GET /api/branches/)
 * Fields: id, name, address, is_active
 */
export const MOCK_BRANCHES = [
  { id: 1, name: 'Cairo Downtown', address: '123 Tahrir Square, Cairo', is_active: true },
  { id: 2, name: 'New Cairo', address: '456 Fifth Settlement, New Cairo', is_active: true },
  { id: 3, name: 'Alexandria', address: '789 Corniche Road, Alexandria', is_active: true },
  { id: 4, name: '6th October', address: '321 Mall of Arabia, 6th October', is_active: true },
];

/**
 * Mock Campaigns (matches GET /api/campaigns/)
 */
export const MOCK_CAMPAIGNS = [
  { id: 1, name: 'Summer Sale 2024', start_date: '2024-06-01', end_date: '2024-08-31' },
  { id: 2, name: 'New Year Offer', start_date: '2024-01-01', end_date: '2024-01-31' },
  { id: 3, name: 'Ramadan Special', start_date: '2024-03-10', end_date: '2024-04-09' },
];

/**
 * Mock Events (matches GET /api/events/)
 */
export const MOCK_EVENTS = [
  { id: 1, name: 'Cairo Real Estate Expo 2024', date: '2024-05-15', location: 'Cairo ICC' },
  { id: 2, name: 'Property Investment Summit', date: '2024-09-20', location: 'Four Seasons' },
  { id: 3, name: 'Apartment Launch Event', date: '2024-07-10', location: 'New Cairo Showroom' },
];

/**
 * Mock Leads (matches GET /api/leads/)
 * 
 * API Fields:
 * id, first_name, last_name, phone, national_id, email, job_title,
 * source, partner, campaign, event, walk_in_branch, visit_details,
 * created_by_name, notes, created_at
 */
const MOCK_LEADS = [
  {
    id: 1,
    first_name: 'Ahmed',
    last_name: 'Hassan',
    phone: '+201001234567',
    national_id: '29001011234567',
    email: 'ahmed.hassan@email.com',
    job_title: 'Engineer',
    source: 1, // Facebook Ads
    partner: null,
    campaign: 1, // Summer Sale 2024
    event: null,
    walk_in_branch: null,
    visit_details: null,
    created_by_name: 'Ahmed Hassan',
    notes: 'Interested in 2-bedroom apartment in New Cairo',
    created_at: '2024-02-15T10:30:00Z'
  },
  {
    id: 2,
    first_name: 'Fatma',
    last_name: 'Mohamed',
    phone: '+201112345678',
    national_id: '29101011234567',
    email: 'fatma.mohamed@email.com',
    job_title: 'Doctor',
    source: 4, // Walk-in
    partner: null,
    campaign: null,
    event: null,
    walk_in_branch: 1, // Cairo Downtown
    visit_details: 'Walked in on Saturday afternoon, asked about payment plans',
    created_by_name: 'Mohamed Salem',
    notes: 'Looking for villa in 6th October. Budget: 5-7M EGP',
    created_at: '2024-02-16T14:20:00Z'
  },
  {
    id: 3,
    first_name: 'Omar',
    last_name: 'Ali',
    phone: '+201223456789',
    national_id: '28501011234567',
    email: 'omar.ali@email.com',
    job_title: 'Business Owner',
    source: 8, // Partner
    partner: 1, // Ahmed Real Estate
    campaign: null,
    event: null,
    walk_in_branch: null,
    visit_details: null,
    created_by_name: 'Ahmed Hassan',
    notes: 'Referred by Ahmed Real Estate. High priority client.',
    created_at: '2024-02-14T09:15:00Z'
  },
  {
    id: 4,
    first_name: 'Nour',
    last_name: 'Ibrahim',
    phone: '+201334567890',
    national_id: '29201011234567',
    email: 'nour.ibrahim@email.com',
    job_title: 'Teacher',
    source: 9, // Event
    partner: null,
    campaign: null,
    event: 1, // Cairo Real Estate Expo 2024
    walk_in_branch: null,
    visit_details: 'Met at Expo booth, showed interest in affordable housing',
    created_by_name: 'Sara Ahmed',
    notes: 'First-time buyer. Needs financing advice.',
    created_at: '2024-02-17T11:45:00Z'
  },
  {
    id: 5,
    first_name: 'Khaled',
    last_name: 'Mahmoud',
    phone: '+201445678901',
    national_id: '27501011234567',
    email: 'khaled.mahmoud@email.com',
    job_title: 'Lawyer',
    source: 2, // Google Ads
    partner: null,
    campaign: 2, // New Year Offer
    event: null,
    walk_in_branch: null,
    visit_details: null,
    created_by_name: 'Ahmed Hassan',
    notes: 'Clicked on Google Ad. Interested in commercial property.',
    created_at: '2024-02-13T16:30:00Z'
  },
  {
    id: 6,
    first_name: 'Mona',
    last_name: 'Samir',
    phone: '+201556789012',
    national_id: '29301011234567',
    email: 'mona.samir@email.com',
    job_title: 'Pharmacist',
    source: 5, // Phone Call
    partner: null,
    campaign: null,
    event: null,
    walk_in_branch: null,
    visit_details: null,
    created_by_name: 'Fatma Ibrahim',
    notes: 'Called inquiring about studio apartments. Budget: 1.5-2M EGP',
    created_at: '2024-02-17T13:00:00Z'
  },
  {
    id: 7,
    first_name: 'Youssef',
    last_name: 'Adel',
    phone: '+201667890123',
    national_id: '28801011234567',
    email: 'youssef.adel@email.com',
    job_title: 'Architect',
    source: 7, // Referral
    partner: null,
    campaign: null,
    event: null,
    walk_in_branch: null,
    visit_details: null,
    created_by_name: 'Mohamed Salem',
    notes: 'Referred by existing client. Very interested in duplex units.',
    created_at: '2024-02-12T10:00:00Z'
  },
  {
    id: 8,
    first_name: 'Laila',
    last_name: 'Sherif',
    phone: '+201778901234',
    national_id: '29401011234567',
    email: 'laila.sherif@email.com',
    job_title: 'HR Manager',
    source: 3, // Instagram
    partner: null,
    campaign: 3, // Ramadan Special
    event: null,
    walk_in_branch: null,
    visit_details: null,
    created_by_name: 'Ahmed Hassan',
    notes: 'Contacted via Instagram DM. Looking for family apartment.',
    created_at: '2024-02-16T09:30:00Z'
  },
  {
    id: 9,
    first_name: 'Tarek',
    last_name: 'Fouad',
    phone: '+201889012345',
    national_id: '27801011234567',
    email: 'tarek.fouad@email.com',
    job_title: 'Software Engineer',
    source: 4, // Walk-in
    partner: null,
    campaign: null,
    event: null,
    walk_in_branch: 2, // New Cairo
    visit_details: 'Visited New Cairo branch. Asked about smart home features.',
    created_by_name: 'Mohamed Salem',
    notes: 'Tech-savvy. Wants modern apartment with automation.',
    created_at: '2024-02-15T15:45:00Z'
  },
  {
    id: 10,
    first_name: 'Hana',
    last_name: 'Kamal',
    phone: '+201990123456',
    national_id: '29501011234567',
    email: 'hana.kamal@email.com',
    job_title: 'Accountant',
    source: 8, // Partner
    partner: 2, // Elite Properties
    campaign: null,
    event: null,
    walk_in_branch: null,
    visit_details: null,
    created_by_name: 'Sara Ahmed',
    notes: 'Partner lead. Looking for investment property.',
    created_at: '2024-02-17T12:15:00Z'
  }
];

/**
 * LeadsDataService
 * Simulates Django Backend API for Leads Module
 */
export const LeadsDataService = {
  /**
   * Get All Leads (Simulates GET /api/leads/)
   * @returns {Array}
   */
  getLeads() {
    return [...MOCK_LEADS];
  },

  /**
   * Get Lead by ID (Simulates GET /api/leads/{id}/)
   * @param {number} id 
   * @returns {Object|null}
   */
  getLeadById(id) {
    return MOCK_LEADS.find(lead => lead.id === parseInt(id)) || null;
  },

  /**
   * Create Lead (Simulates POST /api/leads/)
   * @param {Object} leadData 
   * @returns {Object}
   */
  createLead(leadData) {
    const newLead = {
      id: MOCK_LEADS.length + 1,
      created_at: new Date().toISOString(),
      created_by_name: 'Current User', // Should come from auth
      ...leadData
    };
    MOCK_LEADS.push(newLead);
    return newLead;
  },

  /**
   * Update Lead (Simulates PATCH /api/leads/{id}/)
   * @param {number} id 
   * @param {Object} updates 
   * @returns {Object|null}
   */
  updateLead(id, updates) {
    const index = MOCK_LEADS.findIndex(lead => lead.id === parseInt(id));
    if (index === -1) return null;
    
    MOCK_LEADS[index] = { ...MOCK_LEADS[index], ...updates };
    return MOCK_LEADS[index];
  },

  /**
   * Delete Lead (Simulates DELETE /api/leads/{id}/)
   * @param {number} id 
   * @returns {boolean}
   */
  deleteLead(id) {
    const index = MOCK_LEADS.findIndex(lead => lead.id === parseInt(id));
    if (index === -1) return false;
    
    MOCK_LEADS.splice(index, 1);
    return true;
  },

  /**
   * Get Lead Sources (Simulates GET /api/lead-sources/)
   * @returns {Array}
   */
  getLeadSources() {
    return [...MOCK_LEAD_SOURCES];
  },

  /**
   * Get Partners (Simulates GET /api/partners/)
   * @returns {Array}
   */
  getPartners() {
    return [...MOCK_PARTNERS];
  },

  /**
   * Get Branches (Simulates GET /api/branches/)
   * @returns {Array}
   */
  getBranches() {
    return [...MOCK_BRANCHES];
  },

  /**
   * Get Campaigns (Simulates GET /api/campaigns/)
   * @returns {Array}
   */
  getCampaigns() {
    return [...MOCK_CAMPAIGNS];
  },

  /**
   * Get Events (Simulates GET /api/events/)
   * @returns {Array}
   */
  getEvents() {
    return [...MOCK_EVENTS];
  }
};