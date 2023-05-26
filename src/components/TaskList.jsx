import { useDispatch } from 'react-redux';

import { removeAllTasksWithLocalStorage } from '../store/tasks-actions';

import ListItem from './ListItem';

import styles from './TaskList.module.css';

const TaskList = ({ tasks, filterMethod }) => {
	console.log('TASKS LIST RENDER');
	const dispatch = useDispatch();

	const removeAllTasks = () => {
		dispatch(removeAllTasksWithLocalStorage());
	};

	let filteredTasks;

	if (filterMethod === 'all') {
		filteredTasks = tasks;
	} else {
		filteredTasks = tasks.filter(task => {
			if (filterMethod === 'completed') {
				return task.completed;
			} else if (filterMethod === 'uncompleted') {
				return !task.completed;
			}
		});
	}

	return (
		<>
			<ul className={styles.list}>
				{filteredTasks.map(task => (
					<ListItem key={task.id} name={task.name} id={task.id} isCompleted={task.completed} color = {task.color}/>
				))}
			</ul>

			{tasks.length > 9 && (
				<button className={`btn ${styles.clearBtn}`} onClick={removeAllTasks}>
					Clear list
				</button>
			)}
		</>
	);
};

export default TaskList;
