// /**
//  * Partners Mock Data
//  * Matches GET /api/partners/ API structure
//  * Fields: id, name, type, phone, company_name, commission, contract_active
//  */
// const MOCK_PARTNERS = [
//   {
//     id: 101,
//     name: "Coldwell Banker Egypt",
//     type: "broker",
//     phone: "+201001111111",
//     company_name: "Coldwell Banker Real Estate LLC",
//     commission: 2.5,
//     contract_active: true,
//     created_at: "2026-01-10",
//   },
//   {
//     id: 102,
//     name: "Remax Egypt",
//     type: "broker",
//     phone: "+201002222222",
//     company_name: "Remax Premier Properties",
//     commission: 2.5,
//     contract_active: true,
//     created_at: "2026-01-15",
//   },
//   {
//     id: 103,
//     name: "Ahmed Al-Masry",
//     type: "ambassador",
//     phone: "+201003333333",
//     company_name: null,
//     commission: 1.0,
//     contract_active: true,
//     created_at: "2026-01-20",
//   },
//   {
//     id: 104,
//     name: "Sara Influencer",
//     type: "ambassador",
//     phone: "+201004444444",
//     company_name: null,
//     commission: 1.5,
//     contract_active: false,
//     created_at: "2026-01-25",
//   },
//   {
//     id: 105,
//     name: "ERA Egypt",
//     type: "broker",
//     phone: "+201005555555",
//     company_name: "ERA Real Estate Egypt",
//     commission: 3.0,
//     contract_active: true,
//     created_at: "2026-02-01",
//   },
//   {
//     id: 106,
//     name: "Khaled Omar",
//     type: "ambassador",
//     phone: "+201006666666",
//     company_name: null,
//     commission: 1.0,
//     contract_active: true,
//     created_at: "2026-02-05",
//   },
// ];

// let nextId = 107;

// /**
//  * PartnersDataService
//  * Simulates Django Backend API for Partners Module
//  */
// export const PartnersDataService = {
//   /**
//    * Get All Partners - Simulates GET /api/partners/
//    */
//   getPartners() {
//     return [...MOCK_PARTNERS];
//   },

//   /**
//    * Get Partner by ID - Simulates GET /api/partners/{id}/
//    */
//   getPartnerById(id) {
//     return MOCK_PARTNERS.find((p) => p.id === parseInt(id)) || null;
//   },

//   /**
//    * Create Partner - Simulates POST /api/partners/
//    */
//   createPartner(data) {
//     const newPartner = {
//       id: nextId++,
//       created_at: new Date().toISOString().split("T")[0],
//       ...data,
//     };
//     MOCK_PARTNERS.push(newPartner);
//     return newPartner;
//   },

//   /**
//    * Update Partner - Simulates PATCH /api/partners/{id}/
//    */
//   updatePartner(id, updates) {
//     const index = MOCK_PARTNERS.findIndex((p) => p.id === parseInt(id));
//     if (index === -1) return null;
//     MOCK_PARTNERS[index] = {
//       ...MOCK_PARTNERS[index],
//       ...updates,
//       id: MOCK_PARTNERS[index].id,
//       created_at: MOCK_PARTNERS[index].created_at,
//     };
//     return MOCK_PARTNERS[index];
//   },

//   /**
//    * Delete Partner - Simulates DELETE /api/partners/{id}/
//    */
//   deletePartner(id) {
//     const index = MOCK_PARTNERS.findIndex((p) => p.id === parseInt(id));
//     if (index === -1) return false;
//     MOCK_PARTNERS.splice(index, 1);
//     return true;
//   },

//   /**
//    * Check phone uniqueness
//    */
//   isPhoneUnique(phone, excludeId = null) {
//     if (!phone) return true;
//     const normalized = phone.startsWith("01") ? "+20" + phone.substring(1) : phone;
//     return !MOCK_PARTNERS.some((p) => {
//       const pPhone = p.phone.startsWith("01") ? "+20" + p.phone.substring(1) : p.phone;
//       return pPhone === normalized && p.id !== excludeId;
//     });
//   },
// };


/**
 * Partners Mock Data
 * Matches GET /api/partners/ API structure
 * API Fields: id, name, partner_type, company_name
 * Local extra fields: type (alias for partner_type), phone, commission, contract_active
 */
const MOCK_PARTNERS = [
  {
    id: 101,
    name: "Coldwell Banker Egypt",
    type: "broker",
    partner_type: "broker", // ✅ API field alias
    phone: "+201001111111",
    company_name: "Coldwell Banker Real Estate LLC",
    commission: 2.5,
    contract_active: true,
    created_at: "2026-01-10",
  },
  {
    id: 102,
    name: "Remax Egypt",
    type: "broker",
    partner_type: "broker",
    phone: "+201002222222",
    company_name: "Remax Premier Properties",
    commission: 2.5,
    contract_active: true,
    created_at: "2026-01-15",
  },
  {
    id: 103,
    name: "Ahmed Al-Masry",
    type: "ambassador",
    partner_type: "ambassador",
    phone: "+201003333333",
    company_name: null,
    commission: 1.0,
    contract_active: true,
    created_at: "2026-01-20",
  },
  {
    id: 104,
    name: "Sara Influencer",
    type: "ambassador",
    partner_type: "ambassador",
    phone: "+201004444444",
    company_name: null,
    commission: 1.5,
    contract_active: false,
    created_at: "2026-01-25",
  },
  {
    id: 105,
    name: "ERA Egypt",
    type: "broker",
    partner_type: "broker",
    phone: "+201005555555",
    company_name: "ERA Real Estate Egypt",
    commission: 3.0,
    contract_active: true,
    created_at: "2026-02-01",
  },
  {
    id: 106,
    name: "Khaled Omar",
    type: "ambassador",
    partner_type: "ambassador",
    phone: "+201006666666",
    company_name: null,
    commission: 1.0,
    contract_active: true,
    created_at: "2026-02-05",
  },
];

let nextId = 107;

/**
 * PartnersDataService
 * Simulates Django Backend API for Partners Module
 */
export const PartnersDataService = {
  /**
   * Get All Partners - Simulates GET /api/partners/
   */
  getPartners() {
    return [...MOCK_PARTNERS];
  },

  /**
   * Get Partner by ID - Simulates GET /api/partners/{id}/
   */
  getPartnerById(id) {
    return MOCK_PARTNERS.find((p) => p.id === parseInt(id)) || null;
  },

  /**
   * Create Partner - Simulates POST /api/partners/
   */
  createPartner(data) {
    const newPartner = {
      id: nextId++,
      created_at: new Date().toISOString().split("T")[0],
      ...data,
      partner_type: data.type || data.partner_type || null, // ✅ API alias
    };
    MOCK_PARTNERS.push(newPartner);
    return newPartner;
  },

  /**
   * Update Partner - Simulates PATCH /api/partners/{id}/
   */
  updatePartner(id, updates) {
    const index = MOCK_PARTNERS.findIndex((p) => p.id === parseInt(id));
    if (index === -1) return null;
    MOCK_PARTNERS[index] = {
      ...MOCK_PARTNERS[index],
      ...updates,
      id: MOCK_PARTNERS[index].id,
      created_at: MOCK_PARTNERS[index].created_at,
    };
    return MOCK_PARTNERS[index];
  },

  /**
   * Delete Partner - Simulates DELETE /api/partners/{id}/
   */
  deletePartner(id) {
    const index = MOCK_PARTNERS.findIndex((p) => p.id === parseInt(id));
    if (index === -1) return false;
    MOCK_PARTNERS.splice(index, 1);
    return true;
  },

  /**
   * Check phone uniqueness
   */
  isPhoneUnique(phone, excludeId = null) {
    if (!phone) return true;
    const normalized = phone.startsWith("01") ? "+20" + phone.substring(1) : phone;
    return !MOCK_PARTNERS.some((p) => {
      const pPhone = p.phone.startsWith("01") ? "+20" + p.phone.substring(1) : p.phone;
      return pPhone === normalized && p.id !== excludeId;
    });
  },
};