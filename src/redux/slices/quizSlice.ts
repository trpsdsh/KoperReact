import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type Option = {
  id: number;
  text: string;
};

export type Question = {
  question: string;
  options: Option[];
  correctOptionId: number;
};

export type Quiz = {
  id: string;
  title: string;
  image: string;
  price: number;
  colSpan: number;
  bought: boolean;
  questions: Question[];
  recommendedBookId?: number;
};

interface QuizState {
  items: Quiz[];
  status: 'loading' | 'success' | 'error';
}

const initialState: QuizState = {
  items: [],
  status: 'loading',
};

export const fetchQuizzes = createAsyncThunk<Quiz[]>('quiz/fetchAll', async () => {
  const { data } = await axios.get<Quiz[]>('https://67c4cd16c4649b9551b490e4.mockapi.io/test');
  return data;
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    markQuizAsBought(state, action: PayloadAction<string>) {
      const quiz = state.items.find((q) => q.id === action.payload);
      if (quiz) {
        quiz.bought = true;
      }
    },
    setQuizzes(state, action: PayloadAction<Quiz[]>) {
      state.items = action.payload;
      state.status = 'success';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuizzes.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchQuizzes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchQuizzes.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { markQuizAsBought, setQuizzes } = quizSlice.actions;
export const selectQuizzes = (state: RootState) => state.quiz.items;
export const selectQuizById = (id: string) => (state: RootState) =>
  state.quiz.items.find((quiz) => quiz.id === id);
export default quizSlice.reducer;
