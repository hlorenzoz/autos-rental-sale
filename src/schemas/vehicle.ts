import { z } from 'zod';

export const VEHICLE_CATEGORIES = [
  'electric-sedan',
  'sports-coupe',
  'luxury-suv',
  'suv',
  'sedan',
  'convertible',
  'truck',
] as const;

export const VEHICLE_TYPES = ['sale', 'rent', 'both'] as const;

export const vehicleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int().min(1900).max(2100),
  category: z.enum(VEHICLE_CATEGORIES),
  type: z.enum(VEHICLE_TYPES),
  price: z.object({
    sale: z.number().positive().optional(),
    rent: z.number().positive().optional(),
  }),
  specs: z.object({
    acceleration: z.string().optional(),
    range: z.string().optional(),
    drivetrain: z.string().optional(),
    seats: z.number().int().positive().optional(),
    fuel: z.string().optional(),
  }),
  image: z.string(),
  featured: z.boolean(),
  available: z.boolean(),
});

export const vehiclesJsonSchema = z.object({
  vehicles: z.array(vehicleSchema),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
export type VehicleType = typeof VEHICLE_TYPES[number];
export type VehicleCategory = typeof VEHICLE_CATEGORIES[number];
