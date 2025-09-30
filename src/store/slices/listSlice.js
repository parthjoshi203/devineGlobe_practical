import { createSlice } from "@reduxjs/toolkit";

const getInitialItems = () => {
  try {
    return localStorage.getItem("items") || null;
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  items: getInitialItems(),
  loading: false,
};

const setLocalStorageData = (items) => {
  try {
    localStorage.setItem("items", items);
  } catch (error) {
    console.error(error);
  }
};

const listSlice = createSlice({
  name: "lst",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
      setLocalStorageData(action.payload);
    },
    addItem: (state, action) => {
      const newItem = { ...action.payload, id: Date.now().toString() };
      state.items.push(newItem);
      setLocalStorageData(state.items);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      setLocalStorageData(state.items);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      setLocalStorageData(state.items);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addItem, deleteItem, setItems, setLoading, updateItem } =
  listSlice.actions;

export const selectItems = (state) => state.list.items;
export const selectItemsCount = (state) => state.list.items.length;
export const selectLoading = (state) => state.list.loading;

export default listSlice.reducer;
