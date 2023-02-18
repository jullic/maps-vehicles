import { IMark } from './../../interfaces/mark.interface';
import { ICar } from '../../interfaces/car.interface';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateMarks } from './mark.slice';

export const fetchCars = createAsyncThunk<ICar[], undefined>(
	'carSlice/fetch',
	async (params, thunkApi) => {
		// I consider querying the entire database to be a bad practice
		// and adhere to pagination,
		// but the provided api does not support pagination.
		const data = (
			await axios.get<ICar[]>('https://test.tspb.su/test-task/vehicles')
		).data;

		const marks: IMark[] = data.map((car) => {
			return {
				carId: car.id,
				carName: car.name + ' ' + car.model,
				latitude: car.latitude,
				longitude: car.longitude,
			};
		});
		// Adding marks for the map
		thunkApi.dispatch(updateMarks({ data: marks }));
		return data;
	}
);

interface ICarSliceState {
	status: 'idle' | 'loading' | 'error';
	cars: ICar[];
	activeCar: ICar | null;
}

const initialState: ICarSliceState = {
	status: 'idle',
	cars: [],
	activeCar: null,
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
			// Search for the index of the car that needs to be changed
			const index = state.cars.findIndex(
				(car) => car.id === action.payload.id
			);
			if (index === -1) {
				return state;
			}
			// Updating the card
			state.cars[index] = {
				...state.cars[index],
				...action.payload.data,
			};
		},
		changeActiveCar(state, action: PayloadAction<{ car: ICar }>) {
			state.activeCar = action.payload.car;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCars.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCars.fulfilled, (state, action) => {
				state.status = 'idle';
				state.cars = [...state.cars, ...action.payload];
			})
			.addCase(fetchCars.rejected, (state) => {
				state.status = 'error';
			});
	},
});

export const carReducer = carSlice.reducer;
export const { changeCar, deleteCar, changeActiveCar } = carSlice.actions;
