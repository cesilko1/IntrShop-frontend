import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GoodsInCartProvider } from 'contexts/GoodsInCart';
import GoodsOffer from 'components/GoodsOffer/GoodsOffer';
import Cart from 'components/Cart/Cart';

const HomePage: React.FC = () => {
	return(
		<GoodsInCartProvider>
			<Container>
				<Row xs={1} md={2}>
					<Col xs={{order: 'last'}} md={{order: 'first'}} className="mb-4">
						<h3 className="mb-3">Zboží v nabídce</h3>
						<GoodsOffer/>
					</Col>

					<Col xs={{order: 'first'}} md={{order: 'last'}} className="mb-4">
						<h3 className="mb-3">Nákupní košík</h3>
						<Cart/>
					</Col>
				</Row>
			</Container>
		</GoodsInCartProvider>
	);
}

export default HomePage;