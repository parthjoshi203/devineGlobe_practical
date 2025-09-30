import React, { useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { productValidationSchema } from "../../utils/validationSchemas";
import { fileToBase64, validateImageFile } from "../../utils/imageUtils";

const ProductForm = React.memo(
  ({
    initialValues,
    onSubmit,
    onCancel,
    isSubmitting,
    submitButtonText = "Add Product",
  }) => {
    const [imagePreview, setImagePreview] = useState(initialValues.image || "");
    const [imageError, setImageError] = useState("");

    const categories = [
      "Electronics",
      "Clothing",
      "Books",
      "Home & Garden",
      "Sports",
      "Beauty",
      "Toys",
      "Other",
    ];

    const defaultValues = {
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
      ...initialValues,
    };

    const handleImageChange = useCallback(async (event, setFieldValue) => {
      const file = event.currentTarget.files[0];
      setImageError("");

      if (!file) {
        setImagePreview("");
        setFieldValue("image", null);
        return;
      }

      const validationError = validateImageFile(file);
      if (validationError) {
        setImageError(validationError);
        setFieldValue("image", null);
        return;
      }

      try {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        const base64Image = await fileToBase64(file);
        setFieldValue("image", base64Image);
      } catch (error) {
        setImageError("Error processing image");
        console.error("Image processing error:", error);
      }
    }, []);

    const handleSubmit = useCallback(
      async (values, actions) => {
        try {
          await onSubmit(values, actions);
        } catch (error) {
          console.error("Form submission error:", error);
        }
      },
      [onSubmit]
    );

    const removeImage = useCallback((setFieldValue) => {
      setImagePreview("");
      setFieldValue("image", null);
      setImageError("");
    }, []);

    return (
      <Formik
        initialValues={defaultValues}
        validationSchema={productValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>

              {imagePreview && (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(setFieldValue)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WebP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                </label>
              </div>

              {imageError && (
                <div className="mt-1 text-sm text-red-600">{imageError}</div>
              )}
              <ErrorMessage
                name="image"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name *
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`block w-full px-3 py-2 rounded-md border ${
                  errors.name && touched.name
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Enter product name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description *
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={3}
                className={`block w-full px-3 py-2 rounded-md border ${
                  errors.description && touched.description
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 transition-colors`}
                placeholder="Enter product description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price ($) *
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                className={`block w-full px-3 py-2 rounded-md border ${
                  errors.price && touched.price
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 transition-colors`}
                placeholder="0.00"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  submitButtonText
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
);

ProductForm.displayName = "ProductForm";

export default ProductForm;
