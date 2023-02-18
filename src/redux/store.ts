import { sortReducer } from './slices/sort.slice';
import { carReducer } from './slices/car.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: { carReducer, sortReducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
