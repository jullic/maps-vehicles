import React, { FC } from 'react';
import classNames from 'classnames';
import { ITitleProps } from './Title.props';
import styles from './Title.module.css';

export const Title: FC<ITitleProps> = ({
	className,
	children,
	tag = 'h1',
	...props
}) => {
	const Tag = tag;
	return (
		<Tag
			className={classNames(styles.root, styles[tag], className)}
			{...props}
		>
			{children}
		</Tag>
	);
};
