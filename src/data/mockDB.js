export const MOCK_DB = {
  // --- A. System Configuration ---
  departments: [
    { id: 1, name: "Sales", code: "sales" },
    { id: 2, name: "Call Center", code: "call_center" },
    { id: 3, name: "Marketing", code: "marketing" }
  ],
  
  // --- B. Locations (Context) ---
  branches: [
    { id: 1, name: "Headquarters - October", address: "Giza, Egypt" },
    { id: 2, name: "New Cairo Sales Center", address: "5th Settlement" }
  ],
  project_sites: [
    { id: 10, name: "Prometheus Compound", code: "PRM-01" },
    { id: 11, name: "Atlas View", code: "ATL-02" }
  ],
  
  // --- C. Indirect Partners ---
  partners: [
    { id: 101, name: "Coldwell Banker", type: "broker", commission: 2.5, contract_active: true },
    { id: 102, name: "Remax", type: "broker", commission: 2.5, contract_active: true },
    { id: 103, name: "Ahmed Influencer", type: "ambassador", commission: 1.0, contract_active: true }
  ],
  
  // --- D. Marketing ---
  social_platforms: [
    { id: 1, name: "Facebook" }, 
    { id: 2, name: "Instagram" }, 
    { id: 3, name: "Google Ads" }
  ],
  campaigns: [
    { id: 500, name: "Summer Launch 2026", platform_id: 1, budget: 50000, start_date: "2026-06-01" }
  ],
  events: [
    { id: 600, name: "Cityscape Egypt 2026", start_date: "2026-03-20" }
  ],
  
  // --- E. Lead Sources (The Logic Drivers) ---
  lead_sources: [
    // Direct Sources
    { id: 1, name: "Facebook Ads", category: "direct", system_code: "social_media" },
    { id: 2, name: "Walk-in", category: "direct", system_code: "walk_in" },
    { id: 3, name: "Self Generated (Sales)", category: "direct", system_code: "self_generated" },
    { id: 4, name: "Events / Expo", category: "direct", system_code: "events" },
    
    // Indirect Sources
    { id: 5, name: "Broker Referral", category: "indirect", system_code: "broker" },
    { id: 6, name: "Ambassador", category: "indirect", system_code: "ambassador" },
    { id: 7, name: "Meeting / Site Visit", category: "indirect", system_code: "visit" }
  ],
  
  // --- F. The Data (Result) ---
  leads: [
    { 
      id: 1, 
      first_name: "Ahmed", 
      last_name: "Hassan", 
      phone: "01000000000", 
      national_id: "29001010000000",
      email: "ahmed.hassan@example.com",
      job_title: "Engineer",
      source_id: 2,
      source_system_code: "walk_in",
      walk_in_branch_id: 1,
      created_at: "2026-02-10"
    },
    { 
      id: 2, 
      first_name: "Fatma", 
      last_name: "Ali", 
      phone: "01111111111", 
      national_id: "29505050000000",
      email: "fatma.ali@example.com",
      job_title: null,
      source_id: 1,
      source_system_code: "social_media",
      campaign_id: 500,
      created_at: "2026-02-12"
    },
    { 
      id: 3, 
      first_name: "Mohamed", 
      last_name: "Ibrahim", 
      phone: "01222222222", 
      national_id: null,
      email: null,
      job_title: "Manager",
      source_id: 5,
      source_system_code: "broker",
      partner_id: 101,
      created_at: "2026-02-14"
    }
  ]
};