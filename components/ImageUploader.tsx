"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";

type ImageUploaderProps = {
  onImagesUploaded: (urls: string[]) => void;
};

export default function ImageUploader({ onImagesUploaded }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState(0);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");
    setProgress(0);

    try {
      // 1. Compresser toutes les images d'abord
      const compressedFiles = await Promise.all(
        Array.from(files).map((file) =>
          imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1600,
            useWebWorker: true,
            fileType: "image/jpeg",
          })
        )
      );

      // 2. Uploader les fichiers compressés un par un, via notre propre route serveur
      const urls: string[] = [];
      const totalFiles = compressedFiles.length;

      for (let i = 0; i < compressedFiles.length; i++) {
        const file = compressedFiles[i];

        try {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Échec de l'upload.");
          }

          const blob = await res.json();
          urls.push(blob.url);
          setProgress(((i + 1) / totalFiles) * 100);
        } catch (uploadError) {
          console.error(`Erreur upload du fichier ${i + 1}:`, uploadError);
          setError(`Erreur lors de l'upload de l'image ${i + 1}`);
          throw uploadError;
        }
      }

      setPreviews((prev) => [...prev, ...urls]);
      onImagesUploaded(urls);

      e.target.value = "";
    } catch (err) {
      console.error("Erreur globale:", err);
      setError("Une erreur est survenue lors de l'upload des images");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  const removeImage = (indexToRemove: number) => {
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="grid gap-3">
      <div className="relative">
        <label
          className={`cursor-pointer rounded-full border border-neutral-900/10 bg-white px-5 py-3 text-center text-sm text-neutral-600 hover:bg-neutral-50 transition-colors ${
            uploading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {uploading ? `Envoi en cours... ${Math.round(progress)}%` : "Choisir des photos"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {uploading && (
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-1.5 mt-2">
            <div
              className="bg-[var(--olive-800)] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((url, index) => (
            <div key={url} className="relative group">
              <div
                className="h-24 w-full rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
                aria-label="Aperçu de l'image importée"
                role="img"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}