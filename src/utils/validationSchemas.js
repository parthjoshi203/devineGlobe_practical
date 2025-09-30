import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
});

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name must not exceed 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must not exceed 200 characters"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive")
    .max(10000, "Price must not exceed $10,000")
    .typeError("Price must be a valid number"),
  image: Yup.mixed().nullable(),
});

export const videoValidationSchema = Yup.object({
  title: Yup.string()
    .required("Video title is required")
    .min(2, "Video title must be at least 2 characters")
    .max(100, "Video title must not exceed 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  youtubeUrl: Yup.string()
    .required("YouTube URL is required")
    .url("Please enter a valid URL")
    .test("youtube-url", "Please enter a valid YouTube URL", (value) => {
      if (!value) return false;
      return isValidYouTubeUrl(value);
    }),
});

const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
};

export const extractYouTubeId = (url) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};
