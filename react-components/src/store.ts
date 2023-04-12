import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './redux/search/searchSlice';
import formReducer from './redux/form/formSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
