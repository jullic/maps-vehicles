import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface IFILENAMEProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: ReactNode;
}
