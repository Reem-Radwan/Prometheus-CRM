# Prometheus CRM - Module 1: Leads

Enterprise-grade CRM system for Prometheus Real Estate Company built with **Create React App**.

## 🎯 What's New in This Version

### ✨ Enhanced Features
- **Create React App** - Runs with `npm start` (port 3000)
- **Beautiful Design** - Modern, gradient-based UI with smooth animations
- **Centered Layout** - Content perfectly centered, no scrolling issues
- **Styled Headers** - Gradient titles with breadcrumbs
- **Working Actions** - All icon buttons are functional with tooltips
- **Delete Functionality** - Delete leads with confirmation dialog
- **Notifications** - Toast messages for all actions
- **Better Icons** - Professional Material UI icons with hover effects
- **Improved Cards** - Enhanced stats cards with better styling

### 🎨 Design Improvements
- Gradient sidebar with beautiful logo
- Centered content (max-width: 1400px)
- No horizontal/vertical scrolling issues
- Professional color scheme with gradients
- Better spacing and typography
- Smooth hover animations
- Enhanced form sections with colored backgrounds

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will open at **http://localhost:3000**

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
prometheus-crm/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── shared/
│   │       ├── Layout.jsx          # Main layout with sidebar
│   │       ├── Sidebar.jsx         # Navigation sidebar
│   │       └── PageHeader.jsx      # Beautiful page headers
│   ├── data/
│   │   ├── mockDB.js              # Mock database
│   │   └── dataService.js         # Data access layer
│   ├── pages/
│   │   ├── Dashboard.jsx          # Dashboard
│   │   └── leads/
│   │       ├── LeadsList.jsx      # Leads table (with delete)
│   │       └── LeadCreate.jsx     # Create form
│   ├── theme/
│   │   └── theme.js               # Material UI theme
│   ├── utils/
│   │   └── validation.js          # Zod validation
│   ├── App.jsx                    # Main app
│   └── index.js                   # Entry point
├── package.json
└── README.md
```

## 🎯 Key Features

### 1. Dynamic Lead Creation
- **Smart Form** - Fields change based on selected lead source
- **7 Source Types**:
  - Social Media → Campaign selector
  - Events → Event selector
  - Walk-in → Branch selector
  - Broker → Partner selector (brokers only)
  - Ambassador → Partner selector (ambassadors only)
  - Visit → Partner + Visit Details

### 2. Advanced Validation
- Phone number uniqueness check (Egypt format: 01XXXXXXXXX)
- National ID uniqueness check (14 digits)
- Conditional validation based on source type
- Real-time error messages

### 3. Leads Management
- **View all leads** in a professional table
- **Delete leads** with confirmation dialog
- **Working action icons**:
  - 👁️ View (shows notification)
  - ✏️ Edit (shows notification)
  - 🗑️ Delete (working with confirmation)
- **Stats cards** showing total leads, monthly leads, and active sources

### 4. Beautiful UI/UX
- **Gradient sidebar** with logo and version info
- **Centered content** - no scrolling issues
- **Page headers** with gradient titles and breadcrumbs
- **Smooth animations** on hover and interactions
- **Color-coded sections** in forms
- **Toast notifications** for all actions

## 🎨 Design System

### Colors
- **Primary**: #1E3A8A → #3B82F6 (gradient)
- **Background**: #F5F7FA
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444

### Typography
- **Font**: Inter (700 weight for headings)
- **Gradient titles** for page headers
- **Clear hierarchy** with proper font sizes

## 📋 Routes

- `/` - Dashboard
- `/leads` - Leads list view
- `/leads/create` - Create new lead

## 🔧 Technology Stack

### Core
- **React** 18.2.0
- **React Router DOM** 6.20.0
- **Material UI** 5.15.0
- **React Hook Form** 7.49.0
- **Zod** 3.22.4

### Build Tool
- **Create React App** 5.0.1

## 💡 How to Use

### Creating a Lead

1. Click "Create Lead" button
2. Fill in basic information (required fields marked with *)
3. Select a lead source
4. Dynamic fields will appear based on your selection
5. Fill in all required fields
6. Click "Create Lead"

### Managing Leads

- **View**: Click the eye icon (shows notification)
- **Edit**: Click the pencil icon (shows notification)
- **Delete**: Click the trash icon → Confirm in dialog → Lead deleted

### Lead Source Logic

```javascript
Social Media → Shows Campaign dropdown
Events → Shows Event dropdown
Walk-in → Shows Branch dropdown
Broker → Shows Partner dropdown (brokers only)
Ambassador → Shows Partner dropdown (ambassadors only)
Visit → Shows Partner + Visit Details (date, location, attendees)
```

## 🎯 What's Working

✅ Create leads with dynamic validation  
✅ View all leads in a table  
✅ Delete leads with confirmation  
✅ Beautiful gradient UI  
✅ Centered layout (no scrolling issues)  
✅ Working action icons with tooltips  
✅ Toast notifications  
✅ Stats cards  
✅ Breadcrumb navigation  
✅ Responsive design  

## 🚧 Coming Soon

- [ ] Edit lead functionality
- [ ] Lead detail view
- [ ] Search and filtering
- [ ] Export to Excel/PDF
- [ ] Module 2: Opportunities
- [ ] Module 3: Customers

## 📝 Notes

- All data is stored in mock database (`src/data/mockDB.js`)
- Easy to migrate to real API by updating `dataService.js`
- Form validation is dynamic based on selected source
- Phone and National ID must be unique
- Empty optional fields are stored as `null`

## 🎉 Enjoy Your CRM!

Built with ❤️ for **Prometheus Real Estate Company**

---

**Version**: 1.0.0  
**Last Updated**: February 2026
