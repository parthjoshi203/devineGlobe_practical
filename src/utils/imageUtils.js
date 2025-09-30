export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const validateImageFile = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    return "Please select a valid image file (JPEG, PNG, WebP)";
  }

  if (file.size > maxSize) {
    return "Image size must be less than 5MB";
  }

  return null;
};
