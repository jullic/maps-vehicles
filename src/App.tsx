import classNames from 'classnames';
import styles from './App.module.css';
import { CardContainer } from './components/CardContainer/CardContainer';
import { MapContainer } from './components/MapContainer/MapContainer';
import { Order } from './components/Order/Order';
import { Title } from './components/Title/Title';

function App() {
	return (
		<div>
			<div className={classNames('container', styles.container)}>
				<Title>Vehicles</Title>
				<Order />
				<div className={classNames(styles.wrap)}>
					<CardContainer />
					<MapContainer />
				</div>
			</div>
		</div>
	);
}

export default App;
