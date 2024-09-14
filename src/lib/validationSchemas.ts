import * as yup from "yup";

const fileValidation = yup
  .mixed()
  .test("fileType", "Harus berupa file", (value) => value instanceof File);

export { fileValidation };
