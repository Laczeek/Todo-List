import { useDispatch } from 'react-redux';

import { removeTaskWithLocalStorage } from '../store/tasks-actions';
import { startEditMode } from '../store/uiSlice';
import { editTaskWithLocalStorage } from '../store/tasks-actions';
import { showPaletteWithId } from '../store/uiSlice';

import squareIcon from '/squareIcon.svg';
import trashIcon from '/trashIcon.svg';
import editIcon from '/editIcon.svg';
import paletteIcon from '/paletteIcon.svg';
import taskDoneIcon from '/taskDoneIcon.svg';

import styles from './ListItem.module.css';

const ListItem = ({ name, id, isCompleted, color }) => {
	const dispatch = useDispatch();

	const finishIcon = isCompleted ? taskDoneIcon : squareIcon;

	const showPaletteHandler = e => {
		const liElement = e.target.closest('li');
		const distanceFromTop = liElement.getBoundingClientRect().top + window.scrollY - 95;
		dispatch(showPaletteWithId({ isShowing: true, id, distanceFromTop }));
	};

	return (
		<li
			className={`${styles.task} ${isCompleted ? styles.taskDone : ''}`}
			style={color === 'default' ? { backgroundColor: '#029789' } : { backgroundColor: color }}
			id={id}>
			<div className={styles.container}>
				<p>{name}</p>
				<div>
					<button
						className={styles.btn}
						onClick={() => dispatch(editTaskWithLocalStorage({ id, case: 'toggleComplete' }))}>
						<img src={finishIcon} alt='Finish task icon' />
					</button>
					<button className={styles.btn} onClick={() => dispatch(removeTaskWithLocalStorage(id))}>
						<img src={trashIcon} alt='Delete task icon' />
					</button>
					<button className={styles.btn} onClick={() => dispatch(startEditMode({ isEditing: true, name, id }))}>
						<img src={editIcon} alt='Edit task icon' />
					</button>
					<button className={styles.btn} onClick={showPaletteHandler} id='paletteBtn'>
						<img src={paletteIcon} alt='Change color icon' />
					</button>
				</div>
			</div>
		</li>
	);
};

export default ListItem;
