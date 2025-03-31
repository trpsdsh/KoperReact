import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk<PizzaState[], FetchPizzasParams>(
  'pizza/fetchPizzasById',
  async (params) => {
    const { category, search, currentPage, sortType } = params;
    const { data } = await axios.get<PizzaState[]>(
      `https://67c4cd16c4649b9551b490e4.mockapi.io/items?page=${currentPage}&limit=16&${category}&${search}&sortBy=${sortType.sortProperty}&order=${sortType.order}`,
    );

    return data;
  },
);

export enum StatusPizza{
  LOADING='loading',
  FULFILLED='success',
  REJECTED='rejected',
}

type SortType = {
  sortProperty: string;
  order: string;
};

interface FetchPizzasParams {
  category: string;
  search: string;
  currentPage: number;
  sortType: SortType;
}
type PizzaState = {
  id: string;
  title: string;
  price: number;
  image: string;
  count: number;
  types: number[];
  sizes: number[];
};

interface PizzaStateType {
  items: PizzaState[];
  status: StatusPizza;
}

const initialState: PizzaStateType = {
  items: [],
  status: StatusPizza.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = StatusPizza.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = StatusPizza.FULFILLED;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = StatusPizza.REJECTED;
      state.items = [];
      console.log(state, action, 'rejected');
    });
  },
});

export const selectPizza = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;