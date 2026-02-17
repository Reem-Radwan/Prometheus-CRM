
// import { z } from 'zod';

// // Egypt phone regex: starts with 01 followed by 9 digits
// export const EGYPT_PHONE_REGEX = /^01[0-9]{9}$/;

// // National ID: exactly 14 digits
// export const NATIONAL_ID_REGEX = /^[0-9]{14}$/;

// /**
//  * Base lead schema with static fields
//  */
// const baseLeadSchema = z.object({
//   first_name: z.string().min(1, 'First name is required'),
//   last_name: z.string().min(1, 'Last name is required'),
//   phone: z.string()
//     .min(1, 'Phone is required')
//     .regex(EGYPT_PHONE_REGEX, 'Phone must be a valid Egyptian number (01XXXXXXXXX)'),
//   national_id: z.string().optional().refine(
//     (val) => !val || NATIONAL_ID_REGEX.test(val),
//     'National ID must be exactly 14 digits'
//   ),
//   email: z.string().email('Invalid email').optional().or(z.literal('')),
//   job_title: z.string().optional(),
//   notes: z.string().optional(),
//   source_id: z.number().min(1, 'Source is required'),
// });

// /**
//  * Dynamic validation based on source system_code
//  */
// export const createLeadValidationSchema = (systemCode) => {
//   let dynamicSchema = {};

//   switch (systemCode) {
//     case 'social_media':
//       dynamicSchema = {
//         campaign_id: z.number().min(1, 'Campaign is required'),
//       };
//       break;

//     case 'events':
//       dynamicSchema = {
//         event_id: z.number().min(1, 'Event is required'),
//       };
//       break;

//     case 'walk_in':
//       dynamicSchema = {
//         walk_in_branch_id: z.number().min(1, 'Branch is required'),
//       };
//       break;

//     case 'broker':
//     case 'ambassador':
//       dynamicSchema = {
//         partner_id: z.number().min(1, 'Partner is required'),
//       };
//       break;

//     case 'visit':
//       dynamicSchema = {
//         partner_id: z.number().min(1, 'Partner is required'),
//         visit_details: z.object({
//           visit_date: z.string().min(1, 'Visit date is required'),
//           location_type: z.enum(['branch', 'site'], {
//             errorMap: () => ({ message: 'Location type is required' })
//           }),
//           branch_id: z.number().optional(),
//           site_id: z.number().optional(),
//           attendees_count: z.number().optional(),
//         }).refine(
//           (data) => {
//             if (data.location_type === 'branch') {
//               return data.branch_id !== undefined && data.branch_id > 0;
//             }
//             if (data.location_type === 'site') {
//               return data.site_id !== undefined && data.site_id > 0;
//             }
//             return true;
//           },
//           {
//             message: 'Please select a branch or site based on location type',
//             path: ['location_type'],
//           }
//         ),
//       };
//       break;

//     default:
//       break;
//   }

//   return baseLeadSchema.extend(dynamicSchema);
// };

// /**
//  * Build submission payload according to backend contract (snake_case)
//  * This follows the exact structure from the technical specs
//  */
// export const buildLeadPayload = (formData, sourceSystemCode) => {
//   // Base payload structure - all in snake_case
//   const payload = {
//     first_name: formData.first_name,
//     last_name: formData.last_name,
//     phone: formData.phone,
//     national_id: formData.national_id || null, // Must be null, not empty string
//     email: formData.email || null, // Must be null, not empty string
//     job_title: formData.job_title || null, // Must be null, not empty string
//     source_id: formData.source_id,
//     source_system_code: sourceSystemCode,
//   };

//   // Only include notes if provided
//   if (formData.notes && formData.notes.trim() !== '') {
//     payload.notes = formData.notes;
//   }

//   // Add source-specific fields based on system_code
//   switch (sourceSystemCode) {
//     case 'social_media':
//       payload.campaign_id = formData.campaign_id;
//       break;

//     case 'events':
//       payload.event_id = formData.event_id;
//       break;

//     case 'walk_in':
//       payload.walk_in_branch_id = formData.walk_in_branch_id;
//       break;

//     case 'broker':
//     case 'ambassador':
//       payload.partner_id = formData.partner_id;
//       break;

//     case 'visit':
//       payload.partner_id = formData.partner_id;
      
//       // Convert datetime-local to ISO format for backend
//       const visitDate = formData.visit_details.visit_date 
//         ? new Date(formData.visit_details.visit_date).toISOString()
//         : null;

//       payload.visit_details = {
//         visit_date: visitDate,
//         location_type: formData.visit_details.location_type,
//         branch_id: formData.visit_details.location_type === 'branch' 
//           ? formData.visit_details.branch_id 
//           : null,
//         project_site_id: formData.visit_details.location_type === 'site' 
//           ? formData.visit_details.site_id 
//           : null, // IMPORTANT: Backend expects project_site_id, not site_id
//         attendees_count: formData.visit_details.attendees_count || null,
//       };
//       break;

//     default:
//       break;
//   }

//   return payload;
// };









// import { z } from 'zod';

// // Egypt phone regex: starts with 01 followed by 9 digits (USER INPUT FORMAT)
// // Users type: 01000000000 (11 digits)
// // Backend receives: +20100000000 (E.164 international format)
// export const EGYPT_PHONE_REGEX = /^01[0-9]{9}$/;

// // National ID: exactly 14 digits
// export const NATIONAL_ID_REGEX = /^[0-9]{14}$/;

// /**
//  * Base lead schema with static fields
//  */
// const baseLeadSchema = z.object({
//   first_name: z.string().min(1, 'First name is required'),
//   last_name: z.string().min(1, 'Last name is required'),
//   phone: z.string()
//     .min(1, 'Phone is required')
//     .regex(EGYPT_PHONE_REGEX, 'Phone must be a valid Egyptian number (01XXXXXXXXX)'),
//   national_id: z.string().optional().refine(
//     (val) => !val || NATIONAL_ID_REGEX.test(val),
//     'National ID must be exactly 14 digits'
//   ),
//   email: z.string().email('Invalid email').optional().or(z.literal('')),
//   job_title: z.string().optional(),
//   notes: z.string().optional(),
//   source_id: z.number().min(1, 'Source is required'),
// });

// /**
//  * Dynamic validation based on source system_code
//  */
// export const createLeadValidationSchema = (systemCode) => {
//   let dynamicSchema = {};

//   switch (systemCode) {
//     case 'social_media':
//       dynamicSchema = {
//         campaign_id: z.number().min(1, 'Campaign is required'),
//       };
//       break;

//     case 'events':
//       dynamicSchema = {
//         event_id: z.number().min(1, 'Event is required'),
//       };
//       break;

//     case 'walk_in':
//       dynamicSchema = {
//         walk_in_branch_id: z.number().min(1, 'Branch is required'),
//       };
//       break;

//     case 'broker':
//     case 'ambassador':
//       dynamicSchema = {
//         partner_id: z.number().min(1, 'Partner is required'),
//       };
//       break;

//     case 'visit':
//       dynamicSchema = {
//         partner_id: z.number().min(1, 'Partner is required'),
//         visit_details: z.object({
//           visit_date: z.string().min(1, 'Visit date is required'),
//           location_type: z.enum(['branch', 'site'], {
//             errorMap: () => ({ message: 'Location type is required' })
//           }),
//           branch_id: z.number().optional(),
//           project_site_id: z.number().optional(), // ✅ FIXED: Correct field name
//           attendees_count: z.number().optional(),
//         }).refine(
//           (data) => {
//             if (data.location_type === 'branch') {
//               return data.branch_id !== undefined && data.branch_id > 0;
//             }
//             if (data.location_type === 'site') {
//               return data.project_site_id !== undefined && data.project_site_id > 0; // ✅ FIXED
//             }
//             return true;
//           },
//           {
//             message: 'Please select a branch or project site based on location type',
//             path: ['location_type'],
//           }
//         ),
//       };
//       break;

//     default:
//       break;
//   }

//   return baseLeadSchema.extend(dynamicSchema);
// };

// /**
//  * Build submission payload according to backend contract (snake_case)
//  * MINIMAL PAYLOAD: Only includes fields with values (no null fields for optional data)
//  * This follows Module Doc Section 5 example payloads
//  */
// export const buildLeadPayload = (formData, sourceSystemCode) => {
//   // Required base fields only
//   const payload = {
//     first_name: formData.first_name,
//     last_name: formData.last_name,
    
//     // CRITICAL: Convert Egypt local format to international format
//     // User enters: 01000000000 (11 digits)
//     // Backend expects: +201000000000 (E.164 format - 12 chars total)
//     phone: formData.phone.startsWith('01') 
//       ? '+20' + formData.phone.substring(1) 
//       : formData.phone,
    
//     source_id: formData.source_id,
//     source_system_code: sourceSystemCode,
//   };

//   // Add optional fields ONLY if they have values (Module Doc Section 5 requirement)
//   if (formData.national_id && formData.national_id.trim()) {
//     payload.national_id = formData.national_id;
//   }
  
//   if (formData.email && formData.email.trim()) {
//     payload.email = formData.email.trim();
//   }
  
//   if (formData.job_title && formData.job_title.trim()) {
//     payload.job_title = formData.job_title.trim();
//   }
  
//   if (formData.notes && formData.notes.trim()) {
//     payload.notes = formData.notes.trim();
//   }

//   // Add source-specific fields based on system_code
//   switch (sourceSystemCode) {
//     case 'social_media':
//       payload.campaign_id = formData.campaign_id;
//       break;

//     case 'events':
//       payload.event_id = formData.event_id;
//       break;

//     case 'walk_in':
//       payload.walk_in_branch_id = formData.walk_in_branch_id;
//       break;

//     case 'broker':
//     case 'ambassador':
//       payload.partner_id = formData.partner_id;
//       break;

//     case 'visit':
//       payload.partner_id = formData.partner_id;
      
//       // Convert datetime-local to ISO 8601 format for backend
//       const visitDate = formData.visit_details.visit_date 
//         ? new Date(formData.visit_details.visit_date).toISOString()
//         : null;

//       payload.visit_details = {
//         visit_date: visitDate,
//         location_type: formData.visit_details.location_type,
//       };

//       // Only add branch_id or project_site_id based on location_type
//       if (formData.visit_details.location_type === 'branch') {
//         payload.visit_details.branch_id = formData.visit_details.branch_id;
//       } else if (formData.visit_details.location_type === 'site') {
//         payload.visit_details.project_site_id = formData.visit_details.project_site_id; // ✅ FIXED
//       }

//       // Add attendees_count only if provided
//       if (formData.visit_details.attendees_count) {
//         payload.visit_details.attendees_count = formData.visit_details.attendees_count;
//       }
//       break;

//     default:
//       break;
//   }

//   return payload;
// };



// import { z } from 'zod';

// // Egypt phone regex: starts with 01 followed by 9 digits
// export const EGYPT_PHONE_REGEX = /^01[0-9]{9}$/;

// // National ID: exactly 14 digits
// export const NATIONAL_ID_REGEX = /^[0-9]{14}$/;

// /**
//  * Base lead schema with static fields
//  */
// const baseLeadSchema = z.object({
//   first_name: z.string().min(1, 'First name is required'),
//   last_name: z.string().min(1, 'Last name is required'),
//   phone: z.string()
//     .min(1, 'Phone is required')
//     .regex(EGYPT_PHONE_REGEX, 'Phone must be a valid Egyptian number (01XXXXXXXXX)'),
//   national_id: z.string().optional().refine(
//     (val) => !val || NATIONAL_ID_REGEX.test(val),
//     'National ID must be exactly 14 digits'
//   ),
//   email: z.string().email('Invalid email').optional().or(z.literal('')),
//   job_title: z.string().optional(),
//   notes: z.string().optional(),
//   source_id: z.number().min(1, 'Source is required'),
// });

// /**
//  * Dynamic validation based on source system_code
//  */
// export const createLeadValidationSchema = (systemCode) => {
//   let dynamicSchema = {};

//   switch (systemCode) {
//     case 'social_media':
//       dynamicSchema = {
//         campaign_id: z.number().min(1, 'Campaign is required'),
//       };
//       break;

//     case 'events':
//       dynamicSchema = {
//         event_id: z.number().min(1, 'Event is required'),
//       };
//       break;

//     case 'walk_in':
//       dynamicSchema = {
//         walk_in_branch_id: z.number().min(1, 'Branch is required'),
//       };
//       break;

//     case 'broker':
//     case 'ambassador':
//       dynamicSchema = {
//         partner_id: z.number().min(1, 'Partner is required'),
//       };
//       break;

//     case 'visit':
//       dynamicSchema = {
//         partner_id: z.number().min(1, 'Partner is required'),
//         visit_details: z.object({
//           visit_date: z.string().min(1, 'Visit date is required'),
//           location_type: z.enum(['branch', 'site'], {
//             errorMap: () => ({ message: 'Location type is required' })
//           }),
//           branch_id: z.number().optional(),
//           site_id: z.number().optional(),
//           attendees_count: z.number().optional(),
//         }).refine(
//           (data) => {
//             if (data.location_type === 'branch') {
//               return data.branch_id !== undefined && data.branch_id > 0;
//             }
//             if (data.location_type === 'site') {
//               return data.site_id !== undefined && data.site_id > 0;
//             }
//             return true;
//           },
//           {
//             message: 'Please select a branch or site based on location type',
//             path: ['location_type'],
//           }
//         ),
//       };
//       break;

//     default:
//       break;
//   }

//   return baseLeadSchema.extend(dynamicSchema);
// };

// /**
//  * Build submission payload according to backend contract (snake_case)
//  * This follows the exact structure from the technical specs
//  */
// export const buildLeadPayload = (formData, sourceSystemCode) => {
//   // Base payload structure - all in snake_case
//   const payload = {
//     first_name: formData.first_name,
//     last_name: formData.last_name,
//     phone: formData.phone,
//     national_id: formData.national_id || null, // Must be null, not empty string
//     email: formData.email || null, // Must be null, not empty string
//     job_title: formData.job_title || null, // Must be null, not empty string
//     source_id: formData.source_id,
//     source_system_code: sourceSystemCode,
//   };

//   // Only include notes if provided
//   if (formData.notes && formData.notes.trim() !== '') {
//     payload.notes = formData.notes;
//   }

//   // Add source-specific fields based on system_code
//   switch (sourceSystemCode) {
//     case 'social_media':
//       payload.campaign_id = formData.campaign_id;
//       break;

//     case 'events':
//       payload.event_id = formData.event_id;
//       break;

//     case 'walk_in':
//       payload.walk_in_branch_id = formData.walk_in_branch_id;
//       break;

//     case 'broker':
//     case 'ambassador':
//       payload.partner_id = formData.partner_id;
//       break;

//     case 'visit':
//       payload.partner_id = formData.partner_id;
      
//       // Convert datetime-local to ISO format for backend
//       const visitDate = formData.visit_details.visit_date 
//         ? new Date(formData.visit_details.visit_date).toISOString()
//         : null;

//       payload.visit_details = {
//         visit_date: visitDate,
//         location_type: formData.visit_details.location_type,
//         branch_id: formData.visit_details.location_type === 'branch' 
//           ? formData.visit_details.branch_id 
//           : null,
//         project_site_id: formData.visit_details.location_type === 'site' 
//           ? formData.visit_details.site_id 
//           : null, // IMPORTANT: Backend expects project_site_id, not site_id
//         attendees_count: formData.visit_details.attendees_count || null,
//       };
//       break;

//     default:
//       break;
//   }

//   return payload;
// };









import { z } from 'zod';

// Egypt phone regex: starts with 01 followed by 9 digits (USER INPUT FORMAT)
// Users type: 01000000000 (11 digits)
// Backend receives: +20100000000 (E.164 international format)
export const EGYPT_PHONE_REGEX = /^01[0-9]{9}$/;

// National ID: exactly 14 digits
export const NATIONAL_ID_REGEX = /^[0-9]{14}$/;

/**
 * Base lead schema with static fields
 */
const baseLeadSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone: z.string()
    .min(1, 'Phone is required')
    .regex(EGYPT_PHONE_REGEX, 'Phone must be a valid Egyptian number (01XXXXXXXXX)'),
  national_id: z.string().optional().refine(
    (val) => !val || NATIONAL_ID_REGEX.test(val),
    'National ID must be exactly 14 digits'
  ),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  job_title: z.string().optional(),
  notes: z.string().optional(),
  source_id: z.number().min(1, 'Source is required'),
});

/**
 * Dynamic validation based on source system_code
 */
export const createLeadValidationSchema = (systemCode) => {
  let dynamicSchema = {};

  switch (systemCode) {
    case 'social_media':
      dynamicSchema = {
        campaign_id: z.number().min(1, 'Campaign is required'),
      };
      break;

    case 'events':
      dynamicSchema = {
        event_id: z.number().min(1, 'Event is required'),
      };
      break;

    case 'walk_in':
      dynamicSchema = {
        walk_in_branch_id: z.number().min(1, 'Branch is required'),
      };
      break;

    case 'broker':
    case 'ambassador':
      dynamicSchema = {
        partner_id: z.number().min(1, 'Partner is required'),
      };
      break;

    case 'visit':
      dynamicSchema = {
        partner_id: z.number().min(1, 'Partner is required'),
        visit_details: z.object({
          visit_date: z.string().min(1, 'Visit date is required'),
          location_type: z.enum(['branch', 'site'], {
            errorMap: () => ({ message: 'Location type is required' })
          }),
          branch_id: z.number().optional(),
          project_site_id: z.number().optional(), // ✅ FIXED: Correct field name
          attendees_count: z.number().optional(),
        }).refine(
          (data) => {
            if (data.location_type === 'branch') {
              return data.branch_id !== undefined && data.branch_id > 0;
            }
            if (data.location_type === 'site') {
              return data.project_site_id !== undefined && data.project_site_id > 0; // ✅ FIXED
            }
            return true;
          },
          {
            message: 'Please select a branch or project site based on location type',
            path: ['location_type'],
          }
        ),
      };
      break;

    default:
      break;
  }

  return baseLeadSchema.extend(dynamicSchema);
};

/**
 * Build submission payload according to backend contract (snake_case)
 * MINIMAL PAYLOAD: Only includes fields with values (no null fields for optional data)
 * This follows Module Doc Section 5 example payloads
 */
export const buildLeadPayload = (formData, sourceSystemCode) => {
  // Required base fields only
  const payload = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    
    // CRITICAL: Convert Egypt local format to international format
    // User enters: 01000000000 (11 digits)
    // Backend expects: +201000000000 (E.164 format - 12 chars total)
    phone: formData.phone.startsWith('01') 
      ? '+20' + formData.phone.substring(1) 
      : formData.phone,
    
    source_id: formData.source_id,
    source_system_code: sourceSystemCode,
  };

  // national_id: MUST be null if not provided — never send empty string (Module Doc §5)
  payload.national_id = (formData.national_id && formData.national_id.trim())
    ? formData.national_id.trim()
    : null;
  
  if (formData.email && formData.email.trim()) {
    payload.email = formData.email.trim();
  }
  
  if (formData.job_title && formData.job_title.trim()) {
    payload.job_title = formData.job_title.trim();
  }
  
  if (formData.notes && formData.notes.trim()) {
    payload.notes = formData.notes.trim();
  }

  // Add source-specific fields based on system_code
  switch (sourceSystemCode) {
    case 'social_media':
      payload.campaign_id = formData.campaign_id;
      break;

    case 'events':
      payload.event_id = formData.event_id;
      break;

    case 'walk_in':
      payload.walk_in_branch_id = formData.walk_in_branch_id;
      break;

    case 'broker':
    case 'ambassador':
      payload.partner_id = formData.partner_id;
      break;

    case 'visit':
      payload.partner_id = formData.partner_id;
      
      // Convert datetime-local to ISO 8601 format for backend
      const visitDate = formData.visit_details.visit_date 
        ? new Date(formData.visit_details.visit_date).toISOString()
        : null;

      payload.visit_details = {
        visit_date: visitDate,
        location_type: formData.visit_details.location_type,
      };

      // Only add branch_id or project_site_id based on location_type
      if (formData.visit_details.location_type === 'branch') {
        payload.visit_details.branch_id = formData.visit_details.branch_id;
      } else if (formData.visit_details.location_type === 'site') {
        payload.visit_details.project_site_id = formData.visit_details.project_site_id; // ✅ FIXED
      }

      // Add attendees_count only if provided
      if (formData.visit_details.attendees_count) {
        payload.visit_details.attendees_count = formData.visit_details.attendees_count;
      }
      break;

    default:
      break;
  }

  return payload;
};