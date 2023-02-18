import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { IOrderProps } from './Order.props';
import styles from './Order.module.css';

import { ReactComponent as Icon } from '../../assets/img/polygon.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { changeCurrentSort } from '../../redux/slices/sort.slice';
import { ISort } from '../../interfaces/sort.interface';

export const Order: FC<IOrderProps> = ({ className, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);

	const { variants, currentSort } = useAppSelector(
		(state) => state.sortReducer
	);
	const dispatch = useAppDispatch();

	const changeSortHandler = (data: ISort) => {
		dispatch(changeCurrentSort({ data }));
	};

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
				<span>{currentSort.value}</span>
			</div>
			<div className={classNames(styles.items, { active: isOpen })}>
				{variants.map((variant) => (
					<div
						key={variant.value}
						className={classNames(styles.item, {
							active: variant.value === currentSort.value,
						})}
						onClick={(e) => changeSortHandler(variant)}
					>
						{variant.value}
					</div>
				))}
			</div>
		</div>
	);
};
