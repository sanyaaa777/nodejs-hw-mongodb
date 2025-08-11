import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env('CLOUDINARY_CLOUD_NAME'),
  api_key: env('CLOUDINARY_API_KEY'),
  api_secret: env('CLOUDINARY_API_SECRET'),
});

export async function uploadToCloudinary(localPath, folder = 'contacts') {
  const res = await cloudinary.uploader.upload(localPath, { folder });
  return { url: res.secure_url, id: res.public_id };
}

export async function saveFileToCloudinary(file, folder = 'contacts') {
  const { url } = await uploadToCloudinary(file.path, folder);
  return url;
}

export async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId).catch(() => {});
}
