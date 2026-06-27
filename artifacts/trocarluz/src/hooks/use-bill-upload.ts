import { useState } from "react";

export interface UploadResult {
  objectPath: string;
}

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function useBillUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File): Promise<UploadResult | null> {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Formato inválido. Envie PDF, JPEG ou PNG.");
      return null;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("Arquivo muito grande. Máximo 10 MB.");
      return null;
    }

    setIsUploading(true);
    setProgress(10);

    try {
      const urlRes = await fetch("/api/storage/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: file.name,
          size: file.size,
          contentType: file.type,
        }),
      });

      if (!urlRes.ok) {
        throw new Error("Erro ao preparar envio. Tente novamente.");
      }

      const { uploadURL, objectPath } = (await urlRes.json()) as {
        uploadURL: string;
        objectPath: string;
      };

      setProgress(40);

      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Erro ao enviar arquivo. Tente novamente.");
      }

      setProgress(100);
      return { objectPath };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro inesperado.";
      setError(msg);
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  return { uploadFile, isUploading, progress, error, setError };
}
