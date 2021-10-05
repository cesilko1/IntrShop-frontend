import React, { useState, useContext } from "react";
import GoodsInCart from 'contexts/GoodsInCart';
import IGoods from "interfaces/Goods";
import { Row, Col, Button, FormControl, InputGroup, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import scss from './CartContent.module.scss';
import ICartData from "interfaces/CartData";

interface Iprops {
	index: number;
}

const CartContent: React.FC<Iprops> = (props: Iprops) => {
	const [goodsInCart, setGoodsInCart] = useContext(GoodsInCart);
	const [cartItem, setCartItem] = useState<ICartData>(goodsInCart[props.index]);

	const ChangeCount = (count: number) => {
		if(count <= 0) return false;


	}

	const Delete = () => {
		console.log(props.index);
		setGoodsInCart(goodsInCart.splice(props.index, 1));
	}

	return(
		<Row className="mb-2">
			<Col>
				{cartItem.item.name}
			</Col>
			<Col xs="auto">
				<ButtonToolbar>
					<InputGroup size="sm">
						<InputGroup.Prepend>
							<Button onClick={()=>ChangeCount(cartItem.count-1)}>
								<FontAwesomeIcon icon={faMinus}/>
							</Button>
						</InputGroup.Prepend>

						<FormControl
							min={1}
							type="number"
							className={scss.countInput}
							value={cartItem.count}
							onChange={(e)=>ChangeCount(Number(e.target.value))}
						/>

						<InputGroup.Append>
							<Button onClick={()=>ChangeCount(cartItem.count+1)}>
								<FontAwesomeIcon icon={faPlus}/>
							</Button>
						</InputGroup.Append>
					</InputGroup>

					<ButtonGroup size="sm" className="ml-1">
						<Button variant="danger" onClick={()=>Delete()}>
							<FontAwesomeIcon icon={faTrashAlt}/>
						</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</Col>
		</Row>
	);
}

export default CartContent;