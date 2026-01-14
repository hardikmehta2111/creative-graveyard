export const uploadToCloudinary = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "creative_graveyard"); // ⚠️ must exist & unsigned
  formData.append("folder", "profile_photos");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dyurt1jtk/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cloudinary error:", errorText);
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};
