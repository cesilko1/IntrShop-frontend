import React from "react";
import { Container } from "react-bootstrap";

import NewGoods from 'components/NewGoods/NewGoods';

const Goods: React.FC = () => {
	return(
		<Container>
			<h1>Aktuální zboží</h1>
			<NewGoods/>
		</Container>
	);
}

export default Goods;