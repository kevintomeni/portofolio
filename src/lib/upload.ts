export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio_unsigned");
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "");

  const resourceType = file.type.startsWith("video/") ? "video" : "image";
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erreur lors de l'upload Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
}
