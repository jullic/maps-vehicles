import { FC, useEffect } from 'react';
import classNames from 'classnames';
import { ICardContainerProps } from './CardContainer.props';
import styles from './CardContainer.module.css';
import { Card } from '../Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { fetchCars } from '../../redux/slices/car.slice';
import { CardSkeleton } from '../CardSkeleton/CardSkeleton';

export const CardContainer: FC<ICardContainerProps> = ({
	className,
	...props
}) => {
	// Sorting cards
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
	});
	const dispatch = useAppDispatch();

	// Receiving cards
	useEffect(() => {
		dispatch(fetchCars());
	}, []);

	// Displaying skeletons when loading
	if (status === 'loading') {
		return (
			<div className={classNames(styles.root, className)} {...props}>
				{[...new Array(20)].map((el, i) => (
					<CardSkeleton key={i} />
				))}
			</div>
		);
	}

	// Displaying error message when error
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
