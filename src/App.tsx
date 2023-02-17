import React from 'react';
import styles from './App.module.css';
import { Card } from './components/Card/Card';
import { CardContainer } from './components/CardContainer/CardContainer';
import { Order } from './components/Order/Order';
import { Title } from './components/Title/Title';

function App() {
	return (
		<div>
			<div className='container'>
				<Order />
				<CardContainer />
			</div>
		</div>
	);
}

export default App;
