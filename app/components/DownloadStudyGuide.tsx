// components/DownloadStudyGuide.tsx
'use client';

import { useState } from 'react';

export default function DownloadStudyGuide() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      const response = await fetch('/api/generate-study-guide');
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'TEAS-7-Study-Guide-StudyBuddy.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download study guide. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="px-6 py-3 bg-[#20B2AA] text-white font-semibold rounded-lg hover:bg-[#1a9890] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDownloading ? 'Generating PDF...' : 'Download Study Guide'}
    </button>
  );
}