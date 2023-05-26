import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setThemeWithLocalStorage } from '../store/ui-actions';
import { getThemeFromLocalStorage } from '../store/ui-actions';

import styles from './ThemeButton.module.css';

const ThemeButton = () => {
	const theme = useSelector(state => state.ui.theme);

	const dispatch = useDispatch();

	const changeThemeHandler = () => {
		dispatch(setThemeWithLocalStorage());
	};

	useEffect(() => {
		document.body.classList = theme;
	}, [theme]);


	useEffect(() => {
		dispatch(getThemeFromLocalStorage());
	}, []);

	return (
		<button className={`${styles.button} ${theme === 'dark' ? styles.darkMode : ''}`} onClick={changeThemeHandler}>
			<span className={styles.ball}></span>
		</button>
	);
};

export default ThemeButton;
