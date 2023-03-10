import { ChangeEvent, FC, memo, MouseEvent } from 'react';
import classNames from 'classnames';
import { ICardProps } from './Card.props';
import styles from './Card.module.css';
import { ReactComponent as ExitIcon } from '../../assets/img/ic_round-close.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import {
	changeActiveCar,
	changeCar,
	deleteCar,
} from '../../redux/slices/car.slice';
import { ICar } from '../../interfaces/car.interface';
import { changeActiveMark } from '../../redux/slices/mark.slice';

export const Card: FC<ICardProps> = memo(({ className, data, ...props }) => {
	const dispatch = useAppDispatch();

	// Without destructuring, so that there are no updates
	const activeCar = useAppSelector((state) => state.carReducer.activeCar);

	// Deletes the car card
	const deleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch(deleteCar(data.id));
	};

	// Sets the active car card to highlight it on the map
	const setActiveCarHandler = () => {
		if (activeCar?.id !== data.id) {
			dispatch(changeActiveCar({ car: data }));
			dispatch(
				changeActiveMark({
					data: {
						carId: data.id,
						carName: data.name + ' ' + data.model,
						latitude: data.latitude,
						longitude: data.longitude,
					},
				})
			);
		}
	};

	// Changing card data
	const changeDataHandler =
		(key: keyof ICar) => (e: ChangeEvent<HTMLInputElement>) => {
			const value =
				key === 'price'
					? Number(e.target.value.replace(/[^0-9]/g, ''))
					: e.target.value;
			if (data[key] !== value) {
				dispatch(changeCar({ id: data.id, data: { [key]: value } }));
			}
		};

	return (
		<div
			className={classNames(styles.root, className, {
				active: data.id === activeCar?.id,
			})}
			onClick={setActiveCarHandler}
			// Attribute for scrolling to the active card when selecting a car on the map
			data-card
			{...props}
		>
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
});
