import { DriverDocumentType } from "@prisma/client";
export default async function AddDriverDoc(
  type: DriverDocumentType,
  file: File
) {
  // upload the file to cloudinary
  // move the variables to the env file
  // save the url in the database
}
