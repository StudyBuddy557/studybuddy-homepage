import { z } from 'zod';

// Base Message Interface
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachment?: ImageAttachment;
}

// Image Attachment Interface
export interface ImageAttachment {
  type: 'image';
  url: string; // Preview URL (object URL or storage URL)
  name: string;
  size: number;
  mimeType: string;
}

// Tutor Request Schema (Source of Truth)
export const TutorRequestSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  message: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
  examType: z.enum(['TEAS', 'HESI', 'NCLEX', 'HSRT']),
  subject: z.string().optional(),
  image: z.object({
    data: z.string().regex(/^data:image\/(jpeg|jpg|png|webp);base64,/, 'Invalid image format'),
    mimeType: z.enum(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
    size: z.number().max(5 * 1024 * 1024, 'Image must be under 5MB'),
  }).optional(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
});

export type TutorRequest = z.infer<typeof TutorRequestSchema>;

// Tutor Response Schema
export const TutorResponseSchema = z.object({
  success: z.boolean(),
  response: z.string().optional(),
  error: z.string().optional(),
  tokensUsed: z.number().optional(),
  imageAnalyzed: z.boolean().optional(),
});

export type TutorResponse = z.infer<typeof TutorResponseSchema>;

// Client-side validation for file upload
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPG, PNG, or WebP image' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be under 5MB' };
  }

  return { valid: true };
};

// Convert File to base64 data URL
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};