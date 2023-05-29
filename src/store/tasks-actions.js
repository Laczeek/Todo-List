import { tasksActions } from './tasksSlice';
import { showAlert } from './uiSlice';

export const addTaskWithLocalStorage = task => {
	return (dispatch, getState) => {
		dispatch(tasksActions.addTask(task));
		const updatedList = getState().tasks.tasksList;
		localStorage.setItem('tasks', JSON.stringify(updatedList));
		dispatch(showAlert({showAlert: true, message: 'New task added.'}))
	};
};

export const getTasksFromLocalStorage = () => {
	return dispatch => {
		const tasksLocal = JSON.parse(localStorage.getItem('tasks'));
		if (tasksLocal === null || tasksLocal === undefined) {
			return;
		}
		dispatch(tasksActions.updateList(tasksLocal));
	};
};

export const removeTaskWithLocalStorage = taskId => {
	return (dispatch, getState) => {
		dispatch(tasksActions.removeTask(taskId));
		const updatedList = getState().tasks.tasksList;
		localStorage.setItem('tasks', JSON.stringify(updatedList));
		dispatch(showAlert({showAlert: true, message: 'Task deleted.'}))
	};
};

export const removeAllTasksWithLocalStorage = () => {
	return dispatch => {
		dispatch(tasksActions.updateList([]));
		localStorage.setItem('tasks', JSON.stringify([]));
		dispatch(showAlert({showAlert: true, message: 'All tasks removed.'}))
	};
};

export const editTaskWithLocalStorage = editObj => {
	return (dispatch, getState) => {
		dispatch(tasksActions.editTask(editObj));
		const updatedList = getState().tasks.tasksList;
		localStorage.setItem('tasks', JSON.stringify(updatedList));
		dispatch(showAlert({showAlert: true, message: 'Task edited.'}))
	};
};

export const updateTasksWithLocalStorage = updatedTasks => {
return (dispatch) => {
	dispatch(tasksActions.updateList(updatedTasks));
	localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
}
