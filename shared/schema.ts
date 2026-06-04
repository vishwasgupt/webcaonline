import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  category: z.string(),
  price: z.string(),
  processingTime: z.string(),
  features: z.array(z.string()),
  requiredDocuments: z.array(z.string()),
  steps: z.array(z.string()),
  isActive: z.string().default("true"),
  createdAt: z.date().optional(),
});

export const applicationSchema = z.object({
  id: z.string(),
  serviceId: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  formData: z.record(z.any()),
  status: z.string().default("pending"),
  applicationNumber: z.string(),
  submittedAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const inquirySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  subject: z.string(),
  message: z.string(),
  type: z.string().default("general"),
  createdAt: z.date().optional(),
});

export const insertServiceSchema = serviceSchema.omit({
  id: true,
  createdAt: true,
});

export const insertApplicationSchema = applicationSchema.omit({
  id: true,
  submittedAt: true,
  updatedAt: true,
  applicationNumber: true,
});

export const insertInquirySchema = inquirySchema.omit({
  id: true,
  createdAt: true,
});

export type Service = z.infer<typeof serviceSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Application = z.infer<typeof applicationSchema>;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Inquiry = z.infer<typeof inquirySchema>;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
