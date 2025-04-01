import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const fetchBooks = createAsyncThunk<BookState[], FetchBooksParams>(
  'books/fetchBooksById',
  async (params) => {
    const { category, search, currentPage, sortType } = params;
    const { data } = await axios.get<BookState[]>(
      `https://67c4cd16c4649b9551b490e4.mockapi.io/koperBooks?page=${currentPage}&limit=8&${category}&${search}&sortBy=${sortType.sortProperty}&order=${sortType.order}`
    );

    return data.map(item => ({
      ...item,
      count: item.count || 0  // Устанавливаем значение по умолчанию
    }));
  }
);

export enum StatusBooks {
  LOADING = 'loading',
  FULFILLED = 'success',
  REJECTED = 'rejected',
}

type SortType = {
  sortProperty: string;
  order: string;
};

interface FetchBooksParams {
  category: string;
  search: string;
  currentPage: number;
  sortType: SortType;
}

type BookState = {
  id: string;
  title: string;
  price: number;
  image: string;
  count?: number;
};

interface BookStateType {
  items: BookState[];
  status: StatusBooks;
}

const initialState: BookStateType = {
  items: [],
  status: StatusBooks.LOADING,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = StatusBooks.LOADING;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = StatusBooks.FULFILLED;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = StatusBooks.REJECTED;
      state.items = [];
      console.error('Error fetching books:', action.error);
    });
  },
});

export const selectBooks = (state: RootState) => state.books;
export const { setItems } = booksSlice.actions;
export default booksSlice.reducer;