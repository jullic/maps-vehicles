import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { IOrderProps } from './Order.props';
import styles from './Order.module.css';

import { ReactComponent as Icon } from '../../assets/img/polygon.svg';

export const Order: FC<IOrderProps> = ({ className, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handler = () => {
			setIsOpen(false);
			console.log(1);
		};
		if (isOpen) {
			document.addEventListener('click', handler);
			return () => {
				document.removeEventListener('click', handler);
			};
		}
	}, [isOpen]);

	return (
		<div className={classNames(styles.root, className)} {...props}>
			<div
				className={classNames(styles.current)}
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen((p) => !p);
				}}
			>
				<Icon className={classNames(styles.icon, { active: isOpen })} />
				<p>Order by:</p>
				<span>Year (ascending)</span>
			</div>
			<div className={classNames(styles.items, { active: isOpen })}>
				<div className={classNames(styles.item, { active: isOpen })}>
					Year (ascending)
				</div>
				<div className={classNames(styles.item)}>Year (decreasing)</div>
				<div className={classNames(styles.item)}>Price (ascending)</div>
				<div className={classNames(styles.item)}>
					Price (decreasing)
				</div>
			</div>
		</div>
	);
};
