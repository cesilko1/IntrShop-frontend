import React, { useContext, useEffect } from "react";
import IGoods from 'interfaces/Goods';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import config from 'config';
import GoodsInCart from 'contexts/GoodsInCart';
import CartStorage from 'utils/CartStorage';

interface IProps {
	itemData: IGoods;
}

const GoodsOffer: React.FC<IProps> = (props: IProps) => {
	const [goodsInCart, setGoodsInCart] = useContext(GoodsInCart);

	const AddToCart = () => {
		if(props.itemData.inStock === 0) return false;
		CartStorage.addToCart({item: props.itemData, count: 1});
		setGoodsInCart(!goodsInCart);
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
						<Col as="h6"
						className={(props.itemData.inStock > 0) ? "text-success" : "text-danger"}
						>
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