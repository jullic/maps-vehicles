import React, { FC } from 'react';
import classNames from 'classnames';
import { ICardSkeletonProps } from './CardSkeleton.props';
import styles from './CardSkeleton.module.css';

import { ReactComponent as SpinnerIcon } from '../../assets/img/spinner.svg';

export const CardSkeleton: FC<ICardSkeletonProps> = ({
	className,
	...props
}) => {
	return (
		<div className={classNames(styles.root, className)} {...props}>
			<SpinnerIcon className={classNames(styles.spinner)} />
		</div>
	);
};
