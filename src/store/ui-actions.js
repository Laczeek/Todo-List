import { changeTheme } from './uiSlice';
import { showAlert } from './uiSlice';

export const setThemeWithLocalStorage = () => {
	return (dispatch, getState) => {
		dispatch(changeTheme());
		const newColor = getState().ui.theme;
		localStorage.setItem('theme', JSON.stringify(newColor));

		dispatch(showAlert({showAlert: true, message: 'Background color changed.'}))
	};
};

export const getThemeFromLocalStorage = () => {
    return dispatch => {
        const theme = JSON.parse(localStorage.getItem('theme'));
		
        dispatch(changeTheme(theme));
    }
}