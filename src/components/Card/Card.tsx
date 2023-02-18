import React, { FC } from 'react';
import classNames from 'classnames';
import { ICardProps } from './Card.props';
import styles from './Card.module.css';
import { Title } from '../Title/Title';
import { ReactComponent as ExitIcon } from '../../assets/img/ic_round-close.svg';

export const Card: FC<ICardProps> = ({ className, ...props }) => {
	return (
		<div className={classNames(styles.root, className)} {...props}>
			<button className={classNames(styles.delete)}>
				<ExitIcon />
			</button>
			<p className={classNames(styles.year)}>2021</p>
			<div>
				<Title tag='h2' className={classNames(styles.mark)}>
					Tayota
				</Title>
				<p className={classNames(styles.model)}>Camry</p>
			</div>
			<div className={classNames(styles.params)}>
				<p className={classNames(styles.param)}>Color: red</p>
				<p className={classNames(styles.param)}>Latitude: 55.753215</p>
				<p className={classNames(styles.param)}>Longitude: 37.620393</p>
			</div>
			<p className={classNames(styles.price)}>21000 $</p>
		</div>
	);
};
