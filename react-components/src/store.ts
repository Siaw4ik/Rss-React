import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './redux/features/searchSlice';
import formReducer from './redux/features/formSlice';
import personsReducer from './redux/features/personsSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rick_mortiApi } from './redux/services/rick_morti';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    form: formReducer,
    persons: personsReducer,
    [rick_mortiApi.reducerPath]: rick_mortiApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rick_mortiApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
