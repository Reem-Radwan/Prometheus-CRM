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
    { id: 1, name: "Facebook" }, { id: 2, name: "Instagram" }, { id: 3, name: "Google Ads" }
  ],
  campaigns: [
    { id: 500, name: "Summer Launch 2026", platform_id: 1, budget: 50000, start_date: "2026-06-01" }
  ],
  events: [
    { id: 600, name: "Cityscape Egypt 2026", start_date: "2026-03-20" }
  ],

  // --- E. Lead Sources (The Logic Drivers) ---
  // system_code is CRITICAL for your switch/case logic
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
      first_name: "Test", 
      last_name: "Client", 
      phone: "01000000000", 
      national_id: "29001010000000",
      source_id: 2, 
      walk_in_branch_id: 1 
    }
  ]
};