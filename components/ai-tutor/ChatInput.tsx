'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { Camera, Send, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { validateImageFile } from '@/lib/types/tutor';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Ask a question or upload an image...',
}) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle file selection
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(file);
    setImagePreview(previewUrl);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
  };

  // Handle send message
  const handleSend = async () => {
    if ((!message.trim() && !selectedImage) || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      await onSendMessage(message.trim(), selectedImage || undefined);
      
      // Clear input after successful send
      setMessage('');
      handleRemoveImage();
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Enter key (send on Enter, new line on Shift+Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const canSend = (message.trim().length > 0 || selectedImage !== null) && !isProcessing && !disabled;

  return (
    <div className="w-full border-t border-gray-200 bg-white">
      {/* Error Message */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-100">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && selectedImage && (
        <div className="px-4 pt-3 pb-2 border-b border-gray-100">
          <div className="relative inline-block">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-teal-500 shadow-sm">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-md"
              onClick={handleRemoveImage}
              disabled={isProcessing}
            >
              <X className="h-3 w-3" />
            </Button>
            <div className="mt-1">
              <p className="text-xs text-gray-500 truncate max-w-[80px]">
                {selectedImage.name}
              </p>
              <p className="text-xs text-gray-400">
                {(selectedImage.size / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-end gap-2">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing || disabled}
          />

          {/* Camera/Upload Button */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "flex-shrink-0 h-10 w-10 rounded-lg border-2 transition-colors",
              selectedImage 
                ? "border-teal-500 bg-teal-50 text-teal-600 hover:bg-teal-100" 
                : "border-gray-300 hover:border-teal-500 hover:bg-teal-50"
            )}
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing || disabled}
            title="Upload image"
          >
            {selectedImage ? (
              <ImageIcon className="h-5 w-5" />
            ) : (
              <Camera className="h-5 w-5" />
            )}
          </Button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isProcessing || disabled}
              className={cn(
                "min-h-[40px] max-h-[120px] resize-none rounded-lg",
                "border-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500",
                "text-base leading-relaxed",
                "pr-12", // Space for send button
                isProcessing && "opacity-60 cursor-not-allowed"
              )}
              rows={1}
            />
            
            {/* Character Count (Mobile) */}
            {message.length > 1800 && (
              <div className="absolute bottom-1 right-12 text-xs text-gray-400">
                {message.length}/2000
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            type="button"
            size="icon"
            className={cn(
              "flex-shrink-0 h-10 w-10 rounded-lg transition-all",
              canSend 
                ? "bg-teal-600 hover:bg-teal-700 text-white" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
            onClick={handleSend}
            disabled={!canSend}
            title="Send message"
          >
            {isProcessing ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Helper Text (Desktop) */}
        <div className="hidden sm:block mt-2 px-1">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">Enter</kbd> to send,{' '}
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded">Shift + Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
};