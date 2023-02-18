import { ICar } from './../../interfaces/car.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: ICar;
}
