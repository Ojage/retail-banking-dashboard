import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { SearchResult } from "@/types";

type SearchState = {
  query: string;
  results: SearchResult[];
  isOpen: boolean;
};

const initialState: SearchState = {
  query: "",
  results: [],
  isOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSearchResults(state, action: PayloadAction<SearchResult[]>) {
      state.results = action.payload;
    },
    setSearchOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    clearSearch(state) {
      state.query = "";
      state.results = [];
      state.isOpen = false;
    },
  },
});

export const { setSearchQuery, setSearchResults, setSearchOpen, clearSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
