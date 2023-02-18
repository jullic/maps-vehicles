import React, { ChangeEvent, FC } from 'react';
import classNames from 'classnames';
import { ICardProps } from './Card.props';
import styles from './Card.module.css';
import { ReactComponent as ExitIcon } from '../../assets/img/ic_round-close.svg';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { changeCar, deleteCar } from '../../redux/slices/car.slice';
import { ICar } from '../../interfaces/car.interface';

export const Card: FC<ICardProps> = ({ className, data, ...props }) => {
	const dispatch = useAppDispatch();

	const deleteHandler = () => {
		dispatch(deleteCar(data.id));
	};

	const changeDataHandler =
		(key: keyof ICar) => (e: ChangeEvent<HTMLInputElement>) => {
			const value =
				key === 'price'
					? e.target.value.replace(/[^0-9]/g, '')
					: e.target.value;
			dispatch(changeCar({ id: data.id, data: { [key]: value } }));
		};

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<button
				className={classNames(styles.delete)}
				onClick={deleteHandler}
			>
				<ExitIcon />
			</button>
			<p className={classNames(styles.year)}>{data.year}</p>
			<div className={classNames(styles.name)}>
				<input
					className={classNames(styles.mark)}
					placeholder={'Brand'}
					value={data.name}
					onChange={changeDataHandler('name')}
				/>
				<input
					className={classNames(styles.model)}
					placeholder={'Model'}
					value={data.model}
					onChange={changeDataHandler('model')}
				/>
			</div>
			<div className={classNames(styles.params)}>
				<p className={classNames(styles.param)}>Color: {data.color}</p>
				<p className={classNames(styles.param)}>
					Latitude: {data.latitude}
				</p>
				<p className={classNames(styles.param)}>
					Longitude: {data.longitude}
				</p>
			</div>
			<div className={classNames(styles.full)}>
				<input
					className={classNames(styles.price)}
					placeholder={'Price'}
					value={data.price}
					onChange={changeDataHandler('price')}
				/>
				$
			</div>
		</div>
	);
};
