import { createSlice } from "@reduxjs/toolkit";
import { ITEM_TYPES } from "../../constants";

const loadInitialState = () => {
  try {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      return JSON.parse(savedItems);
    }
  } catch (error) {
    console.error("Error loading items from localStorage:", error);
  }

  return [
    {
      id: "1",
      type: ITEM_TYPES.PRODUCT,
      name: "Wireless Bluetooth Headphones",
      description:
        "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      price: 129.99,
      category: "Electronics",
      image: null,
    },
    {
      id: "2",
      type: ITEM_TYPES.PRODUCT,
      name: "Organic Cotton T-Shirt",
      description:
        "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
      price: 24.99,
      category: "Clothing",
      image: null,
    },
    {
      id: "3",
      type: ITEM_TYPES.VIDEO,
      title: "React Crash Course 2024",
      description:
        "Learn React with this comprehensive crash course covering hooks, state management, and modern best practices.",
      category: "Technology",
      youtubeUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
    },
    {
      id: "4",
      type: ITEM_TYPES.VIDEO,
      title: "Amazing Cooking Tutorial",
      description:
        "Learn how to cook delicious meals with this step-by-step cooking tutorial for beginners.",
      category: "Cooking",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];
};

const initialState = {
  items: loadInitialState(),
  loading: false,
};

const saveToLocalStorage = (items) => {
  try {
    localStorage.setItem("items", JSON.stringify(items));
  } catch (error) {
    console.error("Error saving items to localStorage:", error);
  }
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      saveToLocalStorage(state.items);
    },
    addItem: (state, action) => {
      const newItem = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.items.push(newItem);
      saveToLocalStorage(state.items);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToLocalStorage(state.items);
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem, setLoading } =
  listSlice.actions;

export const selectItems = (state) => state.list.items;
export const selectItemsCount = (state) => state.list.items.length;
export const selectLoading = (state) => state.list.loading;

export default listSlice.reducer;
