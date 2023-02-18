import { ISort } from './../../interfaces/sort.interface';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISortSliceState {
	variants: ISort[];
	currentSort: ISort;
}

const initialState: ISortSliceState = {
	variants: [
		{ field: 'year', type: '+', value: 'Year (ASC)' },
		{ field: 'year', type: '-', value: 'Year (DESC)' },
		{ field: 'price', type: '+', value: 'Price (ASC)' },
		{ field: 'price', type: '-', value: 'Price (DESC)' },
	],
	currentSort: { field: 'year', type: '+', value: 'Year (ASC)' },
};

export const sortSlice = createSlice({
	name: 'sortSlice',
	initialState,
	reducers: {
		changeCurrentSort: (state, action: PayloadAction<{ data: ISort }>) => {
			state.currentSort = action.payload.data;
		},
	},
});

export const sortReducer = sortSlice.reducer;
export const { changeCurrentSort } = sortSlice.actions;
