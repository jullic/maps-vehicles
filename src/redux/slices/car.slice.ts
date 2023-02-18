import { ICar } from '../../interfaces/car.interface';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCars = createAsyncThunk<ICar[], undefined>(
	'carSlice/fetch',
	async (params, thunkApi) => {
		const data = (
			await axios.get<ICar[]>('https://test.tspb.su/test-task/vehicles')
		).data;

		return data;
	}
);

interface ICarSliceState {
	status: 'idle' | 'loading' | 'error';
	cars: ICar[];
}

const initialState: ICarSliceState = {
	status: 'idle',
	cars: [],
};

export const carSlice = createSlice({
	name: 'carSlice',
	initialState,
	reducers: {
		deleteCar: (state, action: PayloadAction<number>) => {
			state.cars = state.cars.filter((car) => car.id !== action.payload);
		},
		changeCar: (
			state,
			action: PayloadAction<{ id: number; data: Partial<ICar> }>
		) => {
			state.cars.forEach((car, i, arr) => {
				if (car.id === action.payload.id) {
					arr[i] = { ...arr[i], ...action.payload.data };
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCars.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCars.fulfilled, (state, action) => {
				state.status = 'idle';
				state.cars = action.payload;
			})
			.addCase(fetchCars.rejected, (state) => {
				state.status = 'error';
			});
	},
});

export const carReducer = carSlice.reducer;
export const { changeCar, deleteCar } = carSlice.actions;
