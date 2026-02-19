export const MOCK_DB = {
  // --- A. System Configuration ---
  departments: [
    { id: 1, name: "Sales", code: "sales" },
    { id: 2, name: "Call Center", code: "call_center" },
    { id: 3, name: "Marketing", code: "marketing" }
  ],
  
  // --- B. Locations (Context) ---
  // API fields for branches: id, name, address, is_active
  branches: [
    { id: 1, name: "Headquarters - October", address: "Giza, Egypt", is_active: true, google_maps_url: null },
    { id: 2, name: "New Cairo Sales Center", address: "5th Settlement", is_active: true, google_maps_url: null }
  ],
  project_sites: [
    { id: 10, name: "Prometheus Compound", code: "PRM-01", is_active: true },
    { id: 11, name: "Atlas View", code: "ATL-02", is_active: true }
  ],
  
  // --- C. Indirect Partners ---
  // API fields: id, name, partner_type, company_name (+ local: type, commission, contract_active)
  partners: [
    { id: 101, name: "Coldwell Banker", type: "broker", partner_type: "broker", company_name: "Coldwell Banker Real Estate LLC", commission: 2.5, contract_active: true },
    { id: 102, name: "Remax", type: "broker", partner_type: "broker", company_name: "Remax Premier Properties", commission: 2.5, contract_active: true },
    { id: 103, name: "Ahmed Influencer", type: "ambassador", partner_type: "ambassador", company_name: null, commission: 1.0, contract_active: true }
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
  // NOTE: Phone format is E.164 international (+20XXXXXXXXX)
  // NOTE: National ID is string of exactly 14 digits
  leads: [
    { 
      id: 1, 
      first_name: "Ahmed", 
      last_name: "Hassan", 
      phone: "+201000000000", // E.164 international format (12 chars: +20 + 10 digits)
      national_id: "29001010000000", // 14-digit string
      email: "ahmed.hassan@example.com",
      job_title: "Engineer",
      source_id: 2,
      source_system_code: "walk_in",
      walk_in_branch_id: 1,
      notes: null,
      created_by_name: "Ahmed Sales Rep",
      created_at: "2026-02-10"
    },
    { 
      id: 2, 
      first_name: "Fatma", 
      last_name: "Ali", 
      phone: "+201111111111",
      national_id: "29505050000000",
      email: "fatma.ali@example.com",
      job_title: null,
      source_id: 1,
      source_system_code: "social_media",
      campaign_id: 500,
      notes: null,
      created_by_name: "Fatma Call Center",
      created_at: "2026-02-12"
    },
    { 
      id: 3, 
      first_name: "Mohamed", 
      last_name: "Ibrahim", 
      phone: "+201222222222",
      national_id: null,
      email: null,
      job_title: "Manager",
      source_id: 5,
      source_system_code: "broker",
      partner_id: 101,
      notes: "High-value client interested in luxury units",
      created_by_name: "Ahmed Sales Rep",
      created_at: "2026-02-14"
    },
    { 
      id: 4, 
      first_name: "Reem", 
      last_name: "Radwan", 
      phone: "+201288888888",
      national_id: "30302272101826",
      email: "reem.slama272@gmail.com",
      job_title: "Front-End Developer",
      source_id: 5,
      source_system_code: "broker",
      partner_id: 101,
      notes: null,
      created_by_name: "Sara Sales Rep",
      created_at: "2026-02-14"
    },
    { 
      id: 5, 
      first_name: "Ali", 
      last_name: "Mostafa", 
      phone: "+201244444444",
      national_id: null,
      email: null,
      job_title: "Manager",
      source_id: 5,
      source_system_code: "broker",
      partner_id: 101,
      notes: null,
      created_by_name: "Mohamed Sales Rep",
      created_at: "2026-02-14"
    },
    { 
      id: 6, 
      first_name: "Sarah", 
      last_name: "Ibrahim", 
      phone: "+201555555555",
      national_id: null,
      email: null,
      job_title: "Manager",
      source_id: 5,
      source_system_code: "broker",
      partner_id: 101,
      notes: null,
      created_by_name: "Ahmed Sales Rep",
      created_at: "2026-02-14"
    },
    { 
      id: 7, 
      first_name: "Mohamed", 
      last_name: "Omar", 
      phone: "+201233333333",
      national_id: "30302272101823",
      email: null,
      job_title: "Manager",
      source_id: 5,
      source_system_code: "broker",
      partner_id: 101,
      notes: null,
      created_by_name: "Fatma Sales Rep",
      created_at: "2026-02-14"
    },
    // ✅ ADDED: Social Media lead (was missing)
    { 
      id: 8, 
      first_name: "Nour", 
      last_name: "Khaled", 
      phone: "+201666666666",
      national_id: null,
      email: "nour.k@example.com",
      job_title: null,
      source_id: 1,
      source_system_code: "social_media",
      campaign_id: 500,
      notes: null,
      created_by_name: "Marketing Team",
      created_at: "2026-02-15"
    },
    // ✅ ADDED: Events lead (was missing)
    { 
      id: 9, 
      first_name: "Youssef", 
      last_name: "Samir", 
      phone: "+201777777777",
      national_id: null,
      email: null,
      job_title: "Architect",
      source_id: 4,
      source_system_code: "events",
      event_id: 600,
      notes: "Met at Cityscape Egypt booth",
      created_by_name: "Events Coordinator",
      created_at: "2026-02-16"
    },
    // ✅ ADDED: Ambassador lead (was missing)
    { 
      id: 10, 
      first_name: "Layla", 
      last_name: "Ahmed", 
      phone: "+201888888888",
      national_id: "30101015550123",
      email: "layla.a@example.com",
      job_title: null,
      source_id: 6,
      source_system_code: "ambassador",
      partner_id: 103,
      notes: null,
      created_by_name: "Sales Team",
      created_at: "2026-02-16"
    },
    // ✅ ADDED: Complete Visit lead (was missing)
    { 
      id: 11, 
      first_name: "Karim", 
      last_name: "Fathy", 
      phone: "+201999999999",
      national_id: null,
      email: null,
      job_title: "Engineer",
      source_id: 7,
      source_system_code: "visit",
      partner_id: 102,
      visit_details: {
        visit_date: "2026-02-18T10:00:00Z",
        location_type: "site",
        branch_id: null,
        project_site_id: 10, // ✅ CORRECT field name
        attendees_count: 2
      },
      notes: "Interested in 3-bedroom units",
      created_by_name: "Sales Manager",
      created_at: "2026-02-17"
    }
  ]
};