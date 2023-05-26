import { useDispatch } from 'react-redux';
import { editTaskWithLocalStorage } from '../store/tasks-actions';
import { showPaletteWithId } from '../store/uiSlice';
import styles from './ColorsContainer.module.css';

const ColorsContainer = ({ taskId, distance }) => {
	const dispatch = useDispatch();

	const changeColorTaskHandler = e => {
		const newColor = e.target.dataset.color;

		dispatch(editTaskWithLocalStorage({ case: 'changeTaskColor', id: taskId, color: newColor }));
		dispatch(showPaletteWithId({ isShowing: false, id: '', distanceFromTop: '' }));
	};
	return (
		<div className={styles.colors} style={{ top: distance + 'px', }}>
			<span
				data-color='rgb(235, 19, 19)'
				style={{ backgroundColor: 'rgb(235, 19, 19)' }}
				onClick={changeColorTaskHandler}></span>
			<span
				data-color='rgb(233, 30, 99)'
				style={{ backgroundColor: 'rgb(233, 30, 99)' }}
				onClick={changeColorTaskHandler}></span>
			<span
				data-color='rgb(103, 58, 183)'
				style={{ backgroundColor: 'rgb(103, 58, 183)' }}
				onClick={changeColorTaskHandler}></span>
			<span
				data-color='rgb(0, 150, 136)'
				style={{ backgroundColor: 'rgb(0, 150, 136)' }}
				onClick={changeColorTaskHandler}></span>
			<span
				data-color='rgb(76, 175, 80)'
				style={{ backgroundColor: 'rgb(76, 175, 80)' }}
				onClick={changeColorTaskHandler}></span>
			<span
				data-color='rgb(0, 188, 212)'
				style={{ backgroundColor: 'rgb(0, 188, 212)' }}
				onClick={changeColorTaskHandler}></span>
			<span
				data-color='rgb(255, 87, 34)'
				style={{ backgroundColor: 'rgb(255, 87, 34)' }}
				onClick={changeColorTaskHandler}></span>
			<span
				data-color='rgb(96, 125, 139)'
				style={{ backgroundColor: 'rgb(96, 125, 139)' }}
				onClick={changeColorTaskHandler}></span>
			<span
				data-color='rgb(121, 85, 72)'
				style={{ backgroundColor: 'rgb(121, 85, 72)' }}
				onClick={changeColorTaskHandler}></span>
		</div>
	);
};

export default ColorsContainer;
