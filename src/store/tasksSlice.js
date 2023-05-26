import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {
		tasksList: [],
	},
	reducers: {
		updateList: (state, action) => {
			state.tasksList = action.payload;
		},
		addTask: (state, action) => {
			state.tasksList.push(action.payload);
		},
		removeTask: (state, action) => {
			const newTasksList = state.tasksList.filter(task => task.id !== action.payload);
			state.tasksList = newTasksList;
		},

		//pass the correct action.case to call the specified cases
		editTask: (state, action) => {
			let updatedTasksList;

			if (action.payload.case === 'toggleComplete') {
				updatedTasksList = state.tasksList.map(task => {
					if (task.id === action.payload.id) {
						return {
							...task,
							completed: !task.completed,
						};
					}
					return task;
				});
			}
			if (action.payload.case === 'changeName') {
				updatedTasksList = state.tasksList.map(task => {
					if (task.id === action.payload.id) {
						return {
							...task,
							name: action.payload.name,
						};
					}
					return task;
				});
			}

			if (action.payload.case === 'changeTaskColor') {
				updatedTasksList = state.tasksList.map(task => {
					if (task.id === action.payload.id) {
						return {
							...task,
							color: action.payload.color,
						};
					}
					return task;
				});
			}
			state.tasksList = updatedTasksList;
		},
	},
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
