import React from "react";
import { Card, Row, Col } from 'react-bootstrap';

const Cart: React.FC = () => {
	return(
		<Card className="section-card">
			<Card.Body>
				<Row>
					<Col>
						Stav Košíku
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

export default Cart;