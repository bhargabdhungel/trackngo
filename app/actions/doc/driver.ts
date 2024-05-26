import { v2 as cloudinary } from "cloudinary";
export default async function AddDriverDoc() {
  // Configuration
  cloudinary.config({
    cloud_name: "dvxjvsmsk",
    api_key: "888945493652914",
    api_secret: "GmsMH3q4wJpD1mocB3mrGQp5ywA", // Click 'View Credentials' below to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes",
      }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  console.log(autoCropUrl);

  return { uploadResult, optimizeUrl, autoCropUrl };
}
