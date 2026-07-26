import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';

interface ProductImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from('product-images')
        .upload(path, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;

      const { data, error: signErr } = await supabase.storage
        .from('product-images')
        .createSignedUrl(path, TEN_YEARS);
      if (signErr || !data) throw signErr;

      onChange(data.signedUrl);
      toast.success('Image uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Upload failed. Admin access is required.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="https://example.com/image.jpg"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          aria-label="Upload product image"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
      </div>
      {value && (
        <img
          src={value}
          alt="Product preview"
          className="h-24 w-24 rounded-md object-cover border"
        />
      )}
    </div>
  );
};

export default ProductImageUpload;
