import * as yup from "yup";

type FileValidation = (maxSizeMB?: number) => yup.MixedSchema;

const fileValidation: FileValidation = (maxSizeMB) =>
  yup
    .mixed()
    .test("fileType", "Harus berupa file", (value) => value instanceof File)
    .test("fileSize", "Ukuran file terlalu besar", (value) => {
      if (maxSizeMB && value) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024; // Konversi MB ke byte
        return (value as File).size <= maxSizeBytes;
      }
      return true;
    });

export { fileValidation };
