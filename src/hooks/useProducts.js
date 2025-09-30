import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useMemoizedSelector } from "./useMemoizedSelector";
import {
  addItem,
  updateItem,
  deleteItem,
  selectItems,
  setLoading,
} from "../store/slices/listSlice";

export const useProducts = () => {
  const dispatch = useDispatch();

  const items = useMemoizedSelector(selectItems);
  const loading = useMemoizedSelector((state) => state.list.loading);

  const addItemAction = useCallback(
    async (itemData) => {
      dispatch(setLoading(true));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            dispatch(addItem(itemData));
            dispatch(setLoading(false));
            const itemType = itemData.type === "video" ? "video" : "product";
            resolve(itemData);
          } catch (error) {
            dispatch(setLoading(false));
            reject(error);
          }
        }, 500);
      });
    },
    [dispatch]
  );

  const editItemAction = useCallback(
    async (itemData) => {
      dispatch(setLoading(true));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            dispatch(updateItem(itemData));
            dispatch(setLoading(false));
            const itemType = itemData.type === "video" ? "video" : "product";
            resolve(itemData);
          } catch (error) {
            dispatch(setLoading(false));
            reject(error);
          }
        }, 500);
      });
    },
    [dispatch]
  );

  const removeItemAction = useCallback(
    async (itemId) => {
      dispatch(setLoading(true));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            dispatch(deleteItem(itemId));
            dispatch(setLoading(false));
            resolve(itemId);
          } catch (error) {
            dispatch(setLoading(false));
            reject(error);
          }
        }, 500);
      });
    },
    [dispatch]
  );

  return {
    items,
    loading,
    addItem: addItemAction,
    editItem: editItemAction,
    removeItem: removeItemAction,
  };
};
