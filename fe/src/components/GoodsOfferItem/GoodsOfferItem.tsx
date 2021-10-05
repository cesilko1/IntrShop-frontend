import React, { useContext } from "react";
import IGoods from 'interfaces/Goods';
import ICartData from "interfaces/CartData";
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import config from 'config';
import GoodsInCart from 'contexts/GoodsInCart';

interface IProps {
	itemData: IGoods;
}

const GoodsOffer: React.FC<IProps> = (props: IProps) => {
	const [goodsInCart, setGoodsInCart] = useContext(GoodsInCart);

	const AddToCart = () => {
		
		for(var i=0; i < goodsInCart.length; i+=1) {
			if(goodsInCart[i].item._id === props.itemData._id) return false;
		}

		setGoodsInCart([...goodsInCart, {item: props.itemData, count: 1}]);
	}	

	return(
		<Card className="section-card">
			<Card.Body as={Row}>
				<Col>
					<Row>
						<Col as="h4">
							<b>{props.itemData.name}</b>
						</Col>
						<Col xs="auto" as="h5">
							{props.itemData.sellPrice} {config.currency}
						</Col>
					</Row>
					<Row>
						<Col as="h6">
							Skladem: {props.itemData.inStock} ks
						</Col>
					</Row>
				</Col>

				<Col xs="auto">
					<Button type="button" onClick={AddToCart}>
						<FontAwesomeIcon icon={faCartPlus}/>
					</Button>
				</Col>
			</Card.Body>
		</Card>
	);
}

export default GoodsOffer;