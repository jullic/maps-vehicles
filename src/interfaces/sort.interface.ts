import { ICar } from './car.interface';

export interface ISort {
	field: keyof Pick<ICar, 'price' | 'year'>;
	type: '+' | '-';
	value: string;
}
