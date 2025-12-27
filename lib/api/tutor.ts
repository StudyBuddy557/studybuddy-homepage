import { httpsCallable, HttpsCallableResult } from 'firebase/functions';
import { functions } from '@/lib/firebase'; // Your Firebase init
import { 
  TutorRequest, 
  TutorResponse, 
  TutorRequestSchema,
  TutorResponseSchema,
  fileToBase64 
} from '@/lib/types/tutor';

/**
 * Send a message to the AI Tutor
 * Handles image upload, validation, and API communication
 */
export const sendMessageToTutor = async (params: {
  userId: string;
  message: string;
  examType: 'TEAS' | 'HESI' | 'NCLEX' | 'HSRT';
  subject?: string;
  image?: File;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}): Promise<TutorResponse> => {
  try {
    // Prepare the request payload
    const requestData: Partial<TutorRequest> = {
      userId: params.userId,
      message: params.message,
      examType: params.examType,
      subject: params.subject,
      conversationHistory: params.conversationHistory,
    };

    // Handle image upload if present
    if (params.image) {
      const base64Data = await fileToBase64(params.image);
      
      requestData.image = {
        data: base64Data,
        mimeType: params.image.type as 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/webp',
        size: params.image.size,
      };
    }

    // Validate the request before sending
    const validatedRequest = TutorRequestSchema.parse(requestData);

    // Call the Cloud Function
    const callable = httpsCallable<TutorRequest, TutorResponse>(
      functions,
      'onTutorRequest'
    );

    const result: HttpsCallableResult<TutorResponse> = await callable(validatedRequest);

    // Validate the response
    const validatedResponse = TutorResponseSchema.parse(result.data);

    if (!validatedResponse.success) {
      throw new Error(validatedResponse.error || 'AI Tutor request failed');
    }

    return validatedResponse;

  } catch (error) {
    console.error('Error in sendMessageToTutor:', error);

    // Handle different error types
    if (error instanceof Error) {
      // Firebase/Network errors
      if (error.message.includes('auth')) {
        throw new Error('Please sign in to use the AI Tutor');
      }
      
      if (error.message.includes('quota') || error.message.includes('rate limit')) {
        throw new Error('AI Tutor is experiencing high demand. Please try again in a moment.');
      }

      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('Connection issue. Please check your internet and try again.');
      }

      // Validation errors
      if (error.message.includes('validation') || error.message.includes('Invalid')) {
        throw new Error('Please check your message and image, then try again.');
      }

      // Image-specific errors
      if (error.message.includes('image') || error.message.includes('Image')) {
        throw new Error('Unable to process the image. Please ensure it\'s clear and under 5MB.');
      }

      // Re-throw with original message if it's already user-friendly
      throw error;
    }

    // Generic fallback
    throw new Error('Something went wrong. Please try again.');
  }
};

/**
 * Estimate image processing time (for UX optimization)
 */
export const estimateProcessingTime = (hasImage: boolean, messageLength: number): number => {
  let baseTime = 2000; // 2 seconds base
  
  if (hasImage) {
    baseTime += 3000; // Add 3 seconds for image analysis
  }
  
  if (messageLength > 500) {
    baseTime += 1000; // Add 1 second for long messages
  }
  
  return baseTime;
};

/**
 * Format tutor response for display
 * Can add markdown parsing, code highlighting, etc.
 */
export const formatTutorResponse = (response: string): string => {
  // Basic formatting (expand as needed)
  return response
    .trim()
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
};