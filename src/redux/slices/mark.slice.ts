import { IMark } from './../../interfaces/mark.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMarkSliceState {
	marks: IMark[];
	activeMark: IMark | null;
}

const initialState: IMarkSliceState = {
	marks: [],
	activeMark: null,
};

export const markSlice = createSlice({
	name: 'markSlice',
	initialState,
	reducers: {
		addMarks(state, action: PayloadAction<{ data: IMark[] }>) {
			state.marks = action.payload.data;
		},
		updateMarks(state, action: PayloadAction<{ data: IMark[] }>) {
			state.marks = [...state.marks, ...action.payload.data];
		},
		changeActiveMark(state, action: PayloadAction<{ data: IMark | null }>) {
			state.activeMark = action.payload.data;
		},
	},
	extraReducers: (builder) => {
		builder.addCase('carSlice/deleteCar', (state, action) => {
			// state.marks = [];
		});
	},
});

export const markReducer = markSlice.reducer;
export const { changeActiveMark, updateMarks, addMarks } = markSlice.actions;
