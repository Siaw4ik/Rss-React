import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { combineReducers, configureStore } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;
import searchReducer from './features/searchSlice';
import formReducer from './features/formSlice';
import personsReducer from './features/personsSlice';
import likeCardReducer from './features/likeCardSlice';
import { rick_mortiApi } from './services/rick_morti';

const rootReducer = combineReducers({
  search: searchReducer,
  form: formReducer,
  persons: personsReducer,
  likes: likeCardReducer,
  [rick_mortiApi.reducerPath]: rick_mortiApi.reducer,
});

export const setupStore = (
  preloadedState?: toolkitRaw.PreloadedState<ReturnType<typeof rootReducer>>
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rick_mortiApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
