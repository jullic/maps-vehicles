import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { IMapContainerProps } from './MapContainer.props';
import styles from './MapContainer.module.css';
import { Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { changeActiveCar } from '../../redux/slices/car.slice';
import { addMarks, changeActiveMark } from '../../redux/slices/mark.slice';
import { IMark } from '../../interfaces/mark.interface';

export const MapContainer: FC<IMapContainerProps> = ({ ...props }) => {
	const { activeMark, marks } = useAppSelector((state) => state.markReducer);

	const [isClick, setIsClick] = useState(false);
	const cars = useAppSelector((state) => state.carReducer.cars);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const data: IMark[] = [...cars].map((car) => ({
			carId: car.id,
			carName: car.name + ' ' + car.model,
			latitude: car.latitude,
			longitude: car.longitude,
		}));
		dispatch(addMarks({ data }));
	}, [cars]);

	useEffect(() => {
		if (!isClick) {
			return;
		}
		const el = document.querySelector('[data-card].active');
		el?.scrollIntoView();
		setIsClick(false);
	}, [activeMark]);

	return (
		<>
			<YMaps>
				<Map
					className={classNames(styles.map)}
					style={{ width: '', height: 450 }}
					state={{
						center: [
							activeMark?.latitude || 55.75,
							activeMark?.longitude || 37.57,
						],
						zoom: 12,
					}}
				>
					<ZoomControl />
					{marks.map((mark) => (
						<Placemark
							key={mark.carId}
							geometry={[mark.latitude, mark.longitude]}
							options={{
								iconColor:
									activeMark?.carId === mark.carId
										? 'red'
										: '#22253f',
								zIndex:
									activeMark?.carId === mark.carId ? 100 : 1,
							}}
							onClick={(e: any) => {
								// const coordinates = e
								// 	.get('target')
								// 	.geometry.getCoordinates();
								setIsClick(true);
								const car = cars.find(
									(car) => car.id === mark.carId
								);
								if (car) {
									dispatch(changeActiveCar({ car }));
									dispatch(changeActiveMark({ data: mark }));
								}
							}}
							modules={['geoObject.addon.balloon']}
							properties={{
								balloonContentBody: mark.carName,
							}}
						/>
					))}
				</Map>
			</YMaps>
		</>
	);
};
