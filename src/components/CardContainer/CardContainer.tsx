import React, { FC } from 'react';
import classNames from 'classnames';
import { ICardContainerProps } from './CardContainer.props';
import styles from './CardContainer.module.css';
import { Card } from '../Card/Card';

export const CardContainer: FC<ICardContainerProps> = ({
	className,
	...props
}) => {
	return (
		<div className={classNames(styles.root, className)} {...props}>
			<Card className='active' />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	);
};
