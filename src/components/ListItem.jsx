import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

const ListItem = ({ name, id, isCompleted, color}) => {
	const dispatch = useDispatch();

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

	let style = {
		transform: CSS.Transform.toString(transform),
		transition,
		backgroundColor: '#029789',
	};
	
	if (color !== 'default') {
		style = {
			transform: CSS.Transform.toString(transform),
			transition,
			backgroundColor: color,
		};
	}

	const finishIcon = isCompleted ? taskDoneIcon : squareIcon;

	const showPaletteHandler = e => {
		const liElement = e.target.closest('li');
		const distanceFromTop = liElement.getBoundingClientRect().top + window.scrollY - 95;
		dispatch(showPaletteWithId({ isShowing: true, id, distanceFromTop }));
	};

	return (
		<li
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className={`${styles.task} ${isCompleted ? styles.taskDone : ''} ${isDragging && styles.dragging}`}
			style={style}
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
