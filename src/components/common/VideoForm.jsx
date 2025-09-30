import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  videoValidationSchema,
  extractYouTubeId,
} from "../../utils/validationSchemas";

const VideoForm = React.memo(
  ({
    initialValues,
    onSubmit,
    onCancel,
    isSubmitting,
    submitButtonText = "Add Video",
  }) => {
    const defaultValues = {
      title: "",
      description: "",
      youtubeUrl: "",
      ...initialValues,
    };

    const getYouTubePreview = (url) => {
      const videoId = extractYouTubeId(url);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return null;
    };

    return (
      <Formik
        initialValues={defaultValues}
        validationSchema={videoValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched, values }) => {
          const embedUrl = getYouTubePreview(values.youtubeUrl);

          return (
            <Form className="space-y-6">
              {embedUrl && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Preview
                  </label>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src={embedUrl}
                      title="YouTube video preview"
                      className="w-full h-48"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Video Title *
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`block w-full px-3 py-2 rounded-md border ${
                    errors.title && touched.title
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="Enter video title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="youtubeUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  YouTube URL *
                </label>
                <Field
                  type="text"
                  id="youtubeUrl"
                  name="youtubeUrl"
                  className={`block w-full px-3 py-2 rounded-md border ${
                    errors.youtubeUrl && touched.youtubeUrl
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 transition-colors`}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <ErrorMessage
                  name="youtubeUrl"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Supported formats: youtube.com/watch?v=..., youtu.be/...
                </p>
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
                  placeholder="Enter video description"
                />
                <ErrorMessage
                  name="description"
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
          );
        }}
      </Formik>
    );
  }
);

VideoForm.displayName = "VideoForm";

export default VideoForm;
