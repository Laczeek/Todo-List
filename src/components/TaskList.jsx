import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { DndContext, DragOverlay, closestCenter, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { removeAllTasksWithLocalStorage } from '../store/tasks-actions';
import { updateTasksWithLocalStorage } from '../store/tasks-actions';

import ListItem from './ListItem';

import styles from './TaskList.module.css';

const TaskList = ({ tasks, filterMethod }) => {
	const dispatch = useDispatch();
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

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

	const handleDragEnd = e => {
		const { active, over } = e;

		if (active.id !== over.id) {
			const activeIndex = tasks.findIndex(task => task.id === active.id);
			const overIndex = tasks.findIndex(task => task.id === over.id);
			const updatedTasks = arrayMove(tasks, activeIndex, overIndex);

			dispatch(updateTasksWithLocalStorage(updatedTasks));
		}
	};

	return (
		<>
			<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
				<SortableContext items={tasks} strategy={verticalListSortingStrategy}>
					<ul className={styles.list}>
						{filteredTasks.map(task => (
							<ListItem key={task.id} name={task.name} id={task.id} isCompleted={task.completed} color={task.color} />
						))}
					</ul>
				</SortableContext>
				<DragOverlay
					dropAnimation={null}
					style={{
						cursor: 'grab',
					}}></DragOverlay>
			</DndContext>

			{tasks.length > 9 && (
				<button className={`btn ${styles.clearBtn}`} onClick={removeAllTasks}>
					Clear list
				</button>
			)}
		</>
	);
};

export default memo(TaskList);
