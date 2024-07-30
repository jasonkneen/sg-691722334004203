import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';

const PhotoSelector = ({ onPhotoSelect }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        onPhotoSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="photo-upload" className="cursor-pointer">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
          {previewUrl ? (
            <img src={previewUrl} alt="Selected" className="mx-auto max-h-48 object-contain" />
          ) : (
            <div className="flex flex-col items-center">
              <Camera className="h-12 w-12 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Click to select a photo</span>
            </div>
          )}
        </div>
      </Label>
      <Input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {previewUrl && (
        <Button onClick={() => { setPreviewUrl(null); onPhotoSelect(null); }} variant="outline">
          Remove Photo
        </Button>
      )}
    </div>
  );
};

export default PhotoSelector;