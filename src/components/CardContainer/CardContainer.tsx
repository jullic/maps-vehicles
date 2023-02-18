import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { ICardContainerProps } from './CardContainer.props';
import styles from './CardContainer.module.css';
import { Card } from '../Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { fetchCars } from '../../redux/slices/car.slice';

export const CardContainer: FC<ICardContainerProps> = ({
	className,
	...props
}) => {
	const cars = useAppSelector((state) => {
		const cars = [...state.carReducer.cars];
		const sort = state.sortReducer.currentSort;

		const newCars = cars.sort((a, b) => {
			if (sort.type === '+') {
				return a[sort.field] - b[sort.field];
			}
			return b[sort.field] - a[sort.field];
		});

		return newCars;
		// return cars;
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCars());
	}, []);

	return (
		<div className={classNames(styles.root, className)} {...props}>
			{cars.map((car) => (
				<Card key={car.id} data={car} />
			))}
		</div>
	);
};
