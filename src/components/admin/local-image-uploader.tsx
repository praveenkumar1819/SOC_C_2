'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/toast-provider';

interface LocalImageUploaderProps {
  currentUrl?: string;
  onUploadSuccess: (url: string) => void;
  label?: string;
}

export function LocalImageUploader({
  currentUrl,
  onUploadSuccess,
  label = 'Upload Local Image',
}: LocalImageUploaderProps) {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast({
        type: 'error',
        title: 'File Too Large',
        description: 'Please select an image smaller than 10MB.',
      });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onUploadSuccess(data.url);
      showToast({
        type: 'success',
        title: 'Image Uploaded Locally! 📁',
        description: `Saved to public/uploads (${data.filename})`,
      });
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Upload Failed',
        description: err.message || 'Could not upload image',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-1.5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="text-xs h-7 gap-1.5 border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary cursor-pointer rounded-lg"
        >
          {isUploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          <span>{isUploading ? 'Uploading...' : label}</span>
        </Button>

        {currentUrl && (
          <span className="text-[11px] text-muted-foreground truncate max-w-[200px] font-mono">
            {currentUrl}
          </span>
        )}
      </div>
    </div>
  );
}
