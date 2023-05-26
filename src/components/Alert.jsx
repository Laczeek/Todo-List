import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showAlert } from '../store/uiSlice';

import styles from './Alert.module.css';

const Alert = () => {
	const alert = useSelector(state => state.ui.alert);
	const dispatch = useDispatch();

	console.log('renderuje sie');

	useEffect(() => {
		if (!alert.showAlert) {
			return;
		}
		const timeout = setTimeout(() => {
			dispatch(showAlert({ showAlert: false, message: '' }));
		}, 3000);

		return () => clearTimeout(timeout);
	}, [alert.showAlert, alert.message]);

	return (
		<div className={`${styles.alert} ${alert.showAlert && styles.active}`}>
			<p>{alert.message}</p>
		</div>
	);
};

export default Alert;
