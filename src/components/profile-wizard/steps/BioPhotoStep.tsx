
import { useEffect, useState } from "react";
import { useWizard } from "../WizardProvider";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

const BioPhotoStep = () => {
  const { profile, updateProfile } = useWizard();
  const [bio, setBio] = useState(profile.bio);
  const [photoURL, setPhotoURL] = useState<string>(profile.photoURL);

  useEffect(() => {
    updateProfile({ bio });
  }, [bio, updateProfile]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPhotoURL(url);
      updateProfile({ photo: file, photoURL: url });
    }
  };

  const removePhoto = () => {
    setPhotoURL("");
    updateProfile({ photo: null, photoURL: "" });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself and your travel experiences..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="min-h-[120px] border-gray-300 focus:border-tropical-turquoise focus:ring-tropical-turquoise/30"
        />
        <p className="text-xs text-gray-500">
          Share a bit about yourself, your travel style, and what you're looking
          for in your next adventure.
        </p>
      </div>

      <div className="space-y-3">
        <Label>Profile Photo</Label>
        {photoURL ? (
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={photoURL}
              alt="Profile preview"
              className="w-full h-full object-cover rounded-full border-4 border-tropical-turquoise"
            />
            <button
              onClick={removePhoto}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              aria-label="Remove photo"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className={cn(
                "w-32 h-32 rounded-full flex flex-col items-center justify-center",
                "bg-gray-100 border-2 border-dashed border-gray-300"
              )}
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-xs text-gray-500">Upload Photo</span>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoChange}
                className="sr-only"
              />
              <Label
                htmlFor="photo-upload"
                className="absolute inset-0 cursor-pointer sr-only"
              >
                Upload photo
              </Label>
            </div>
          </div>
        )}
        <div className="pt-2 text-center">
          <Label
            htmlFor="photo-upload"
            className="px-4 py-2 text-sm inline-block cursor-pointer text-tropical-turquoise border border-tropical-turquoise rounded-md hover:bg-tropical-turquoise/10 transition-colors"
          >
            {photoURL ? "Change Photo" : "Upload Photo"}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default BioPhotoStep;
