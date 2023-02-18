import React, { FC } from 'react';
import classNames from 'classnames';
import { IMapContainerProps } from './MapContainer.props';
import styles from './MapContainer.module.css';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';

export const MapContainer: FC<IMapContainerProps> = ({ ...props }) => {
	return (
		<>
			<YMaps>
				<Map
					className={classNames(styles.map)}
					style={{ width: '', height: 450 }}
					defaultState={{ center: [55.75, 37.57], zoom: 9 }}
				>
					<Placemark
						geometry={[55.684758, 37.738521]}
						options={{
							iconColor: '#22253f',
							openBalloonOnClick: true,
						}}
						onClick={(e: any) =>
							console.log(
								e.get('target').geometry.getCoordinates()
							)
						}
						modules={['geoObject.addon.balloon']}
						properties={{
							balloonContentBody: 'Tayota Camry',
						}}
					/>
				</Map>
			</YMaps>
		</>
	);
};
