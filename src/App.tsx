import React from 'react';
import styles from './App.module.css';
import { Order } from './components/Order/Order';
import { Title } from './components/Title/Title';

function App() {
	return (
		<div>
			<div className='container'>
				<Order />
			</div>
		</div>
	);
}

export default App;
