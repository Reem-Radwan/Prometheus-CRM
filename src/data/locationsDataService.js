
// // ─── Branches ─────────────────────────────────────────────────────────────────
// const MOCK_BRANCHES = [
//   {
//     id: 1,
//     name: 'Headquarters – October',
//     address: 'Giza, Egypt',
//     city: 'Giza',
//     phone: '0238001234',
//     google_maps_url: null,
//     is_active: true,
//     created_at: '2024-01-01',
//   },
//   {
//     id: 2,
//     name: 'New Cairo Sales Center',
//     address: '5th Settlement, New Cairo',
//     city: 'Cairo',
//     phone: '0224001234',
//     google_maps_url: null,
//     is_active: true,
//     created_at: '2024-03-15',
//   },
//   {
//     id: 3,
//     name: 'Maadi Branch',
//     address: 'Road 9, Maadi, Cairo',
//     city: 'Cairo',
//     phone: '0225001234',
//     google_maps_url: null,
//     is_active: false,
//     created_at: '2024-06-01',
//   },
//   {
//     id: 4,
//     name: 'Alexandria Office',
//     address: 'Smouha, Alexandria',
//     city: 'Alexandria',
//     phone: '0345001234',
//     is_active: true,
//     created_at: '2025-01-10',
//   },
// ];

// // ─── Project Sites ────────────────────────────────────────────────────────────
// const MOCK_PROJECT_SITES = [
//   {
//     id: 10,
//     name: 'Prometheus Compound',
//     code: 'PRM-01',
//     location: '6th of October City, Giza',
//     total_units: 450,
//     developer: 'Prometheus Development',
//     is_active: true,
//     created_at: '2024-01-05',
//   },
//   {
//     id: 11,
//     name: 'Atlas View',
//     code: 'ATL-02',
//     location: 'New Administrative Capital',
//     total_units: 320,
//     developer: 'Atlas Properties',
//     is_active: true,
//     created_at: '2024-04-20',
//   },
//   {
//     id: 12,
//     name: 'Orion Residences',
//     code: 'ORN-03',
//     location: 'North Coast, Matrouh',
//     total_units: 180,
//     developer: 'Prometheus Development',
//     is_active: true,
//     created_at: '2024-09-01',
//   },
//   {
//     id: 13,
//     name: 'Helios Park',
//     code: 'HLS-04',
//     location: 'Ain Sokhna, Red Sea',
//     total_units: 260,
//     developer: 'Helios Group',
//     is_active: false,
//     created_at: '2025-02-14',
//   },
// ];

// let nextBranchId = 5;
// let nextSiteId = 14;

// // ─── City options ─────────────────────────────────────────────────────────────
// export const CITY_OPTIONS = ['Cairo', 'Giza', 'Alexandria', 'Hurghada', 'Aswan', 'Other'];

// // ─── LocationsDataService ─────────────────────────────────────────────────────
// export const LocationsDataService = {
//   // ── Branches ────────────────────────────────────────────────────────────────
//   getBranches() {
//     return [...MOCK_BRANCHES];
//   },
//   getBranchById(id) {
//     return MOCK_BRANCHES.find((b) => b.id === parseInt(id)) || null;
//   },
//   createBranch(data) {
//     const newBranch = {
//       id: nextBranchId++,
//       created_at: new Date().toISOString().split('T')[0],
//       is_active: true,
//       ...data,
//     };
//     MOCK_BRANCHES.push(newBranch);
//     return newBranch;
//   },
//   updateBranch(id, updates) {
//     const index = MOCK_BRANCHES.findIndex((b) => b.id === parseInt(id));
//     if (index === -1) return null;
//     MOCK_BRANCHES[index] = {
//       ...MOCK_BRANCHES[index],
//       ...updates,
//       id: MOCK_BRANCHES[index].id,
//       created_at: MOCK_BRANCHES[index].created_at,
//     };
//     return MOCK_BRANCHES[index];
//   },
//   deleteBranch(id) {
//     const index = MOCK_BRANCHES.findIndex((b) => b.id === parseInt(id));
//     if (index === -1) return false;
//     MOCK_BRANCHES.splice(index, 1);
//     return true;
//   },

//   // ── Project Sites ──────────────────────────────────────────────────────────
//   getProjectSites() {
//     return [...MOCK_PROJECT_SITES];
//   },
//   getProjectSiteById(id) {
//     return MOCK_PROJECT_SITES.find((s) => s.id === parseInt(id)) || null;
//   },
//   createProjectSite(data) {
//     const newSite = {
//       id: nextSiteId++,
//       created_at: new Date().toISOString().split('T')[0],
//       is_active: true,
//       ...data,
//     };
//     MOCK_PROJECT_SITES.push(newSite);
//     return newSite;
//   },
//   updateProjectSite(id, updates) {
//     const index = MOCK_PROJECT_SITES.findIndex((s) => s.id === parseInt(id));
//     if (index === -1) return null;
//     MOCK_PROJECT_SITES[index] = {
//       ...MOCK_PROJECT_SITES[index],
//       ...updates,
//       id: MOCK_PROJECT_SITES[index].id,
//       created_at: MOCK_PROJECT_SITES[index].created_at,
//     };
//     return MOCK_PROJECT_SITES[index];
//   },
//   deleteProjectSite(id) {
//     const index = MOCK_PROJECT_SITES.findIndex((s) => s.id === parseInt(id));
//     if (index === -1) return false;
//     MOCK_PROJECT_SITES.splice(index, 1);
//     return true;
//   },
// };


// ─── Branches ─────────────────────────────────────────────────────────────────
const MOCK_BRANCHES = [
  { id: 1, name: 'Headquarters – October', address: 'Giza, Egypt', google_maps_url: null, is_active: true, created_at: '2024-01-01' },
  { id: 2, name: 'New Cairo Sales Center', address: '5th Settlement, New Cairo', google_maps_url: null, is_active: true, created_at: '2024-03-15' },
  { id: 3, name: 'Maadi Branch', address: 'Road 9, Maadi, Cairo', google_maps_url: null, is_active: false, created_at: '2024-06-01' },
  { id: 4, name: 'Alexandria Office', address: 'Smouha, Alexandria', google_maps_url: null, is_active: true, created_at: '2025-01-10' },
];

// ─── Project Sites ────────────────────────────────────────────────────────────
const MOCK_PROJECT_SITES = [
  { id: 10, name: 'Prometheus Compound', code: 'PRM-01', is_active: true, created_at: '2024-01-05' },
  { id: 11, name: 'Atlas View', code: 'ATL-02', is_active: true, created_at: '2024-04-20' },
  { id: 12, name: 'Orion Residences', code: 'ORN-03', is_active: true, created_at: '2024-09-01' },
  { id: 13, name: 'Helios Park', code: 'HLS-04', is_active: false, created_at: '2025-02-14' },
];

let nextBranchId = 5;
let nextSiteId = 14;

// ─── LocationsDataService ─────────────────────────────────────────────────────
export const LocationsDataService = {
  // ── Branches ────────────────────────────────────────────────────────────────
  getBranches() {
    return [...MOCK_BRANCHES];
  },
  getBranchById(id) {
    return MOCK_BRANCHES.find((b) => b.id === parseInt(id)) || null;
  },
  createBranch(data) {
    const newBranch = {
      id: nextBranchId++,
      created_at: new Date().toISOString().split('T')[0],
      is_active: true,
      ...data,
    };
    MOCK_BRANCHES.push(newBranch);
    return newBranch;
  },
  updateBranch(id, updates) {
    const index = MOCK_BRANCHES.findIndex((b) => b.id === parseInt(id));
    if (index === -1) return null;
    MOCK_BRANCHES[index] = { ...MOCK_BRANCHES[index], ...updates, id: MOCK_BRANCHES[index].id, created_at: MOCK_BRANCHES[index].created_at };
    return MOCK_BRANCHES[index];
  },
  deleteBranch(id) {
    const index = MOCK_BRANCHES.findIndex((b) => b.id === parseInt(id));
    if (index === -1) return false;
    MOCK_BRANCHES.splice(index, 1);
    return true;
  },

  // ── Project Sites ──────────────────────────────────────────────────────────
  getProjectSites() {
    return [...MOCK_PROJECT_SITES];
  },
  getProjectSiteById(id) {
    return MOCK_PROJECT_SITES.find((s) => s.id === parseInt(id)) || null;
  },
  createProjectSite(data) {
    const newSite = {
      id: nextSiteId++,
      created_at: new Date().toISOString().split('T')[0],
      is_active: true,
      ...data,
    };
    MOCK_PROJECT_SITES.push(newSite);
    return newSite;
  },
  updateProjectSite(id, updates) {
    const index = MOCK_PROJECT_SITES.findIndex((s) => s.id === parseInt(id));
    if (index === -1) return null;
    MOCK_PROJECT_SITES[index] = { ...MOCK_PROJECT_SITES[index], ...updates, id: MOCK_PROJECT_SITES[index].id, created_at: MOCK_PROJECT_SITES[index].created_at };
    return MOCK_PROJECT_SITES[index];
  },
  deleteProjectSite(id) {
    const index = MOCK_PROJECT_SITES.findIndex((s) => s.id === parseInt(id));
    if (index === -1) return false;
    MOCK_PROJECT_SITES.splice(index, 1);
    return true;
  },
};