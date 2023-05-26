import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTasksFromLocalStorage } from '../store/tasks-actions';
import { showPaletteWithId } from '../store/uiSlice';

import Form from './Form';
import TaskList from './TaskList';
import ColorsContainer from './ColorsContainer';

import styles from './TodoPanel.module.css';

const TodoPanel = () => {
	const [filterMethod, setFilterMethod] = useState('all');
	const tasks = useSelector(state => state.tasks.tasksList);
	const palette = useSelector(state => state.ui.showPalette);
	const dispatch = useDispatch();

	const hidePalettePanel = e => {
		if (!palette.isShowing) {
			return;
		}
		const isPaletteButton = e.target.id === 'paletteBtn';
		if (!isPaletteButton) {
			dispatch(showPaletteWithId({ isShowing: false, id: '', distanceFromTop: '' }));
		}
	};

	useEffect(() => {
		dispatch(getTasksFromLocalStorage());
	}, []);

	return (
		<div className={styles.container} onClick={hidePalettePanel}>
			{palette.isShowing && <ColorsContainer taskId={palette.id} distance={palette.distanceFromTop} />}
			<Form />
			<div className={styles.filter}>
				<button
					className={`btn ${filterMethod === 'all' ? 'btnSecondary' : 'btnPrimary'}`}
					onClick={() => setFilterMethod('all')}>
					All
				</button>
				<button
					className={`btn ${filterMethod === 'completed' ? 'btnSecondary' : 'btnPrimary'}`}
					onClick={() => setFilterMethod('completed')}>
					Completed
				</button>
				<button
					className={`btn ${filterMethod === 'uncompleted' ? 'btnSecondary' : 'btnPrimary'}`}
					onClick={() => setFilterMethod('uncompleted')}>
					Uncompleted
				</button>
			</div>
			{tasks.length === 0 && <p>Your list is clear!</p>}
			{tasks.length > 0 && <TaskList tasks={tasks} filterMethod={filterMethod} />}
		</div>
	);
};

export default TodoPanel;
