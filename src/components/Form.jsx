import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addTaskWithLocalStorage } from '../store/tasks-actions';
import { editTaskWithLocalStorage } from '../store/tasks-actions';
import { endEditMode, showAlert } from '../store/uiSlice';


import styles from './Form.module.css';

const Form = () => {
	console.log('FORM RENDERED');
	const [taskName, setTaskName] = useState('');
	const edit = useSelector(state => state.ui.edit);
	const inputRef = useRef();
	const dispatch = useDispatch();


	useEffect(() => {
		if (edit.isEditing) {
			setTaskName(edit.name);
			inputRef.current.focus();
		}
	}, [edit]);

	const submitFormHandler = e => {
		e.preventDefault();

		if (taskName.trim() === '') {
			dispatch(showAlert({showAlert: true, message: "Can't add an empty task."}))
			return;
		}

		if (edit.isEditing) {
			dispatch(editTaskWithLocalStorage({ case: 'changeName', id: edit.id, name: taskName }));
			dispatch(endEditMode());
		} else {
			const newTask = {
				id: uuidv4(),
				name: taskName,
				completed: false,
				color: 'default'
			};

			dispatch(addTaskWithLocalStorage(newTask));
		}

		setTaskName('');
	};

	return (
		<form className={styles.form} onSubmit={submitFormHandler}>
			<input
				type='text'
				placeholder='New Task'
				className={styles.input}
				value={taskName}
				ref={inputRef}
				onChange={e => setTaskName(e.target.value)}
			/>
			<button type='submit' className={`btn ${styles.button}`}>
				{edit.isEditing ? 'Edit' : 'Add'}
			</button>
		</form>
	);
};

export default Form;
