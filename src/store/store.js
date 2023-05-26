import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './uiSlice';
import tasksSlice from './tasksSlice';

const store = configureStore({
	reducer: {
		ui: uiSlice,
        tasks: tasksSlice
	},
});

export default store;
