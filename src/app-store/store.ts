import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import templateReducer from '../features/template-finder/template-finderSlice';

export const store = configureStore({
	reducer: {
		template: templateReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
