
import { z } from 'zod';

// Egypt phone regex: starts with 01 followed by 9 digits
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
          site_id: z.number().optional(),
          attendees_count: z.number().optional(),
        }).refine(
          (data) => {
            if (data.location_type === 'branch') {
              return data.branch_id !== undefined && data.branch_id > 0;
            }
            if (data.location_type === 'site') {
              return data.site_id !== undefined && data.site_id > 0;
            }
            return true;
          },
          {
            message: 'Please select a branch or site based on location type',
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
 * This follows the exact structure from the technical specs
 */
export const buildLeadPayload = (formData, sourceSystemCode) => {
  // Base payload structure - all in snake_case
  const payload = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    phone: formData.phone,
    national_id: formData.national_id || null, // Must be null, not empty string
    email: formData.email || null, // Must be null, not empty string
    job_title: formData.job_title || null, // Must be null, not empty string
    source_id: formData.source_id,
    source_system_code: sourceSystemCode,
  };

  // Only include notes if provided
  if (formData.notes && formData.notes.trim() !== '') {
    payload.notes = formData.notes;
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
      
      // Convert datetime-local to ISO format for backend
      const visitDate = formData.visit_details.visit_date 
        ? new Date(formData.visit_details.visit_date).toISOString()
        : null;

      payload.visit_details = {
        visit_date: visitDate,
        location_type: formData.visit_details.location_type,
        branch_id: formData.visit_details.location_type === 'branch' 
          ? formData.visit_details.branch_id 
          : null,
        project_site_id: formData.visit_details.location_type === 'site' 
          ? formData.visit_details.site_id 
          : null, // IMPORTANT: Backend expects project_site_id, not site_id
        attendees_count: formData.visit_details.attendees_count || null,
      };
      break;

    default:
      break;
  }

  return payload;
};