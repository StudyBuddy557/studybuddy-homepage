/**
 * Image Optimization Utilities
 * Helpers for optimal image loading and performance
 * Last updated: 2026-01-04
 */

import type { ImageProps } from 'next/image';

/**
 * Get optimized image sizes for responsive loading
 */
export function getImageSizes(usage: 'hero' | 'card' | 'thumbnail' | 'full' | 'logo'): string {
  const sizes = {
    hero: '100vw',
    card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    thumbnail: '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px',
    full: '100vw',
    logo: '(max-width: 768px) 150px, 200px',
  };

  return sizes[usage];
}

/**
 * Get blur data URL for placeholder
 */
export function getBlurDataURL(width: number = 10, height: number = 10): string {
  // Generate simple blur placeholder
  const canvas = typeof document !== 'undefined' 
    ? document.createElement('canvas') 
    : null;

  if (!canvas) {
    // Fallback for SSR
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%2300A9B7' fill-opacity='0.1'/%3E%3C/svg%3E`;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return '';
  }

  // Create gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#00A9B7');
  gradient.addColorStop(1, '#008C99');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

/**
 * Image loading priorities
 */
export const IMAGE_PRIORITY = {
  // Critical: Hero images, above-fold content
  CRITICAL: { priority: true, loading: 'eager' as const },
  
  // High: First viewport, immediately visible
  HIGH: { priority: false, loading: 'eager' as const },
  
  // Normal: Below fold, lazy load
  NORMAL: { priority: false, loading: 'lazy' as const },
  
  // Low: Far below fold, very lazy
  LOW: { priority: false, loading: 'lazy' as const },
};

/**
 * Get optimized Next.js Image props
 */
export function getOptimizedImageProps(
  usage: 'hero' | 'card' | 'thumbnail' | 'full' | 'logo',
  priority: keyof typeof IMAGE_PRIORITY = 'NORMAL'
): Partial<ImageProps> {
  return {
    sizes: getImageSizes(usage),
    quality: priority === 'CRITICAL' ? 90 : 75,
    ...IMAGE_PRIORITY[priority],
    placeholder: 'blur',
  };
}

/**
 * Image format recommendations
 */
export const IMAGE_FORMATS = {
  // Modern formats (use for web)
  WEBP: '.webp',
  AVIF: '.avif',
  
  // Fallbacks
  JPEG: '.jpg',
  PNG: '.png',
};

/**
 * Recommended max sizes to prevent over-optimization
 */
export const MAX_IMAGE_DIMENSIONS = {
  hero: { width: 1920, height: 1080 },
  card: { width: 800, height: 600 },
  thumbnail: { width: 400, height: 300 },
  logo: { width: 400, height: 400 },
};

/**
 * Check if image URL should be optimized
 */
export function shouldOptimizeImage(src: string): boolean {
  // Don't optimize external images from untrusted domains
  const externalDomains = ['studybuddy.live', 'vercel.app'];
  
  try {
    const url = new URL(src, window.location.origin);
    const hostname = url.hostname;
    
    // Optimize if same domain or trusted domain
    return hostname === window.location.hostname || 
           externalDomains.some(domain => hostname.includes(domain));
  } catch {
    // Relative URL, safe to optimize
    return true;
  }
}

/**
 * Lazy load images below fold using Intersection Observer
 */
export function lazyLoadImage(element: HTMLImageElement): void {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    element.loading = 'lazy';
    return;
  }

  // Fallback: Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        
        observer.unobserve(img);
      }
    });
  });

  observer.observe(element);
}

export default {
  getImageSizes,
  getBlurDataURL,
  getOptimizedImageProps,
  shouldOptimizeImage,
  lazyLoadImage,
  IMAGE_PRIORITY,
  IMAGE_FORMATS,
  MAX_IMAGE_DIMENSIONS,
};
