import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { ICardContainerProps } from './CardContainer.props';
import styles from './CardContainer.module.css';
import { Card } from '../Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { fetchCars } from '../../redux/slices/car.slice';
import { updateMarks } from '../../redux/slices/mark.slice';
import { IMark } from '../../interfaces/mark.interface';
import { CardSkeleton } from '../CardSkeleton/CardSkeleton';

export const CardContainer: FC<ICardContainerProps> = ({
	className,
	...props
}) => {
	const { sortedCars, status } = useAppSelector((state) => {
		const cars = [...state.carReducer.cars];
		const sort = state.sortReducer.currentSort;
		const status = state.carReducer.status;

		const sortedCars = cars.sort((a, b) => {
			if (sort.type === '+') {
				return a[sort.field] - b[sort.field];
			}
			return b[sort.field] - a[sort.field];
		});

		return { sortedCars, status };
		// return cars;
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCars());
	}, []);

	if (status === 'loading') {
		return (
			<div className={classNames(styles.root, className)} {...props}>
				{[...new Array(20)].map((el, i) => (
					<CardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (status === 'error') {
		return (
			<div className={classNames(styles.error)}>
				500 | Error on the server
			</div>
		);
	}

	return (
		<div className={classNames(styles.root, className)} {...props}>
			{sortedCars.map((car) => (
				<Card key={car.id} data={car} />
			))}
		</div>
	);
};
