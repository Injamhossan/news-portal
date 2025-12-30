
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image?: string;
  [key: string]: any;
}

interface NewsState {
  items: NewsItem[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  items: [],
  page: 3, // Start from page 3 as per original component logic (assuming initial load covers 1-2?)
  hasMore: true,
  loading: false,
  error: null,
};

// Async thunk to fetch more news
export const fetchMoreNews = createAsyncThunk(
  'news/fetchMore',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/news?page=${page}&limit=4`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setInitialNews: (state, action: PayloadAction<NewsItem[]>) => {
      state.items = action.payload;
      // Reset pagination if needed, or keep as is
    },
    resetNewsState: (state) => {
        state.items = [];
        state.page = 3;
        state.hasMore = true;
        state.loading = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoreNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreNews.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          // Filter out duplicates if any (safety check)
          const newItems = action.payload.filter(
             (newItem: NewsItem) => !state.items.some(existing => existing._id === newItem._id)
          );
          state.items = [...state.items, ...newItems];
          state.page += 1;
        }
      })
      .addCase(fetchMoreNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInitialNews, resetNewsState } = newsSlice.actions;

export default newsSlice.reducer;
