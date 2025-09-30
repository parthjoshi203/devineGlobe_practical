import React, { useState, useCallback, useMemo } from "react";
import Header from "../components/layout/Header";
import ProductCard from "../components/common/ProductCard";
import VideoCard from "../components/common/VideoCard";
import ProductForm from "../components/common/ProductForm";
import VideoForm from "../components/common/VideoForm";
import Modal from "../components/common/Modal";
import { useProducts } from "../hooks/useProducts";
import { ITEM_TYPES } from "../constants";

const ListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { items, loading, addItem, editItem, removeItem } = useProducts();

  const handleAddProduct = useCallback(() => {
    setEditingItem(null);
    setIsModalOpen(true);
  }, []);

  const handleAddVideo = useCallback(() => {
    setEditingItem(null);
    setIsVideoModalOpen(true);
  }, []);

  const handleEditItem = useCallback((item) => {
    setEditingItem(item);
    if (item.type === ITEM_TYPES.VIDEO) {
      setIsVideoModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleDeleteItem = useCallback((itemId) => {
    setDeleteConfirm(itemId);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (deleteConfirm) {
      await removeItem(deleteConfirm);
      setDeleteConfirm(null);
    }
  }, [deleteConfirm, removeItem]);

  const handleProductSubmit = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      try {
        const itemData = {
          ...values,
          type: ITEM_TYPES.PRODUCT,
          name: values.name,
          price: parseFloat(values.price),
        };

        if (editingItem) {
          await editItem({
            ...editingItem,
            ...itemData,
          });
        } else {
          await addItem(itemData);
        }
        setIsModalOpen(false);
        setEditingItem(null);
        resetForm();
      } catch (error) {
        console.error("Error saving product:", error);
      } finally {
        setSubmitting(false);
      }
    },
    [editingItem, addItem, editItem]
  );

  const handleVideoSubmit = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      try {
        const itemData = {
          ...values,
          type: ITEM_TYPES.VIDEO,
          title: values.title,
        };

        if (editingItem) {
          await editItem({
            ...editingItem,
            ...itemData,
          });
        } else {
          await addItem(itemData);
        }
        setIsVideoModalOpen(false);
        setEditingItem(null);
        resetForm();
      } catch (error) {
        console.error("Error saving video:", error);
      } finally {
        setSubmitting(false);
      }
    },
    [editingItem, addItem, editItem]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingItem(null);
  }, []);

  const handleCloseVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
    setEditingItem(null);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setDeleteConfirm(null);
  }, []);

  const modalTitle = useMemo(
    () => (editingItem ? "Edit Product" : "Add New Product"),
    [editingItem]
  );

  const videoModalTitle = useMemo(
    () => (editingItem ? "Edit Video" : "Add New Video"),
    [editingItem]
  );

  const submitButtonText = useMemo(
    () => (editingItem ? "Update Product" : "Add Product"),
    [editingItem]
  );

  const videoSubmitButtonText = useMemo(
    () => (editingItem ? "Update Video" : "Add Video"),
    [editingItem]
  );

  const products = useMemo(
    () => items.filter((item) => item.type === ITEM_TYPES.PRODUCT),
    [items]
  );

  const videos = useMemo(
    () => items.filter((item) => item.type === ITEM_TYPES.VIDEO),
    [items]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Content Management
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Manage your products and YouTube videos
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={handleAddVideo}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Add Video
                </button>
                <button
                  onClick={handleAddProduct}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Product
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4m4 6v2m-4-2v2"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Items
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {items.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Products
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {products.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Videos
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {videos.length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No items yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Get started by creating your first product or video.
              </p>
              <div className="mt-6 flex justify-center space-x-3">
                <button
                  onClick={handleAddVideo}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                >
                  Add Video
                </button>
                <button
                  onClick={handleAddProduct}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) =>
                item.type === ITEM_TYPES.PRODUCT ? (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                  />
                ) : (
                  <VideoCard
                    key={item.id}
                    video={item}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                  />
                )
              )}
            </div>
          )}

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={modalTitle}
          >
            <ProductForm
              initialValues={editingItem || {}}
              onSubmit={handleProductSubmit}
              onCancel={handleCloseModal}
              submitButtonText={submitButtonText}
            />
          </Modal>

          <Modal
            isOpen={isVideoModalOpen}
            onClose={handleCloseVideoModal}
            title={videoModalTitle}
          >
            <VideoForm
              initialValues={editingItem || {}}
              onSubmit={handleVideoSubmit}
              onCancel={handleCloseVideoModal}
              submitButtonText={videoSubmitButtonText}
            />
          </Modal>

          <Modal
            isOpen={!!deleteConfirm}
            onClose={handleCancelDelete}
            title="Confirm Delete"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
