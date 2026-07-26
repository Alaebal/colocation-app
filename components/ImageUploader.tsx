"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import imageCompression from "browser-image-compression";

type ImageUploaderProps = {
  onImagesUploaded: (urls: string[]) => void;
};

export default function ImageUploader({ onImagesUploaded }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
        });

        return upload(file.name, compressedFile, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
      });

      const blobs = await Promise.all(uploadPromises);
      const urls = blobs.map((blob) => blob.url);

      setPreviews((prev) => [...prev, ...urls]);
      onImagesUploaded(urls);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <label className="cursor-pointer rounded-full border border-neutral-900/10 bg-white px-5 py-3 text-center text-sm text-neutral-600 hover:bg-neutral-50">
        {uploading ? "Envoi en cours..." : "Choisir des photos"}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((url) => (
            <div
              key={url}
              className="h-24 w-full rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${url})` }}
              aria-label="Aperçu de l'image importée"
              role="img"
            />
          ))}
        </div>
      )}
    </div>
  );
}