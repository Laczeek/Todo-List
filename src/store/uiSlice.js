import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		theme: 'light',
		edit: {
			isEditing: false,
			name: '',
			id: '',
		},
		showPalette: {
			isShowing: false,
			id: '',
			distanceFromTop : ''
		},
		alert: {
			showAlert: false,
			message: ''
		}
	},
	reducers: {
		changeTheme: (state, action) => {
			if (action.payload) {
				state.theme = action.payload;
				return;
			}

			if (state.theme === 'light') {
				state.theme = 'dark';
			} else {
				state.theme = 'light';
			}
		},
		startEditMode: (state, action) => {
			state.edit = action.payload;
		},
		endEditMode: state => {
			state.edit = {
				isEditing: false,
				name: '',
				id: ''
			};
		},
		showPaletteWithId: (state, action) => {
			state.showPalette = action.payload;
		},
		showAlert: (state, action) => {
			state.alert = action.payload;
		}
	},
});

export const { changeTheme, startEditMode, endEditMode, showPaletteWithId, showAlert } = uiSlice.actions;
export default uiSlice.reducer;
