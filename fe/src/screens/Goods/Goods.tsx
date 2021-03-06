import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import GoodsList from 'components/GoodsList/GoodsList';
import NewGoods from 'components/NewGoods/NewGoods';
import { GoodsUpdateProvider } from 'contexts/GoodsUpdateContext';

const Goods: React.FC = () => {
	return(
		<Container>
			<Card className="section-card mb-5">
				<Card.Header>
					<Row>
						<Col>
							<h3>Aktuální zboží</h3>
						</Col>
						<Col xs="auto">
							<NewGoods/>
						</Col>
					</Row>
				</Card.Header>

				<Card.Body>
					<GoodsUpdateProvider>
						<GoodsList/>
					</GoodsUpdateProvider>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Goods;