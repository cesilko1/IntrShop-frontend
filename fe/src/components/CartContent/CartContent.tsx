import React, { useState, useEffect } from "react";
import { Row, Col, Button, FormControl, InputGroup, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import scss from './CartContent.module.scss';
import ICartData from "interfaces/CartData";
import CartStorage from 'utils/CartStorage';
import config from 'config';

interface Iprops {
	item: ICartData;
	reloadData: any;
}

const CartContent: React.FC<Iprops> = (props: Iprops) => {
	const [cartItem, setCartItem] = useState<ICartData>(props.item);

	useEffect(()=>{
		setCartItem(props.item);
	}, [props.item]);

	const ChangeCount = (count: number) => {
		if(count <= 0) return false;
		CartStorage.setCountById(cartItem.item._id as string, count);
		props.reloadData();
	}

	const Delete = () => {
		CartStorage.deleteById(cartItem.item._id as string);
		props.reloadData();
	}

	return(
		<Row className="mb-2">
			<Col>
				{cartItem.item.name}
			</Col>

			<Col xs="auto">
				{cartItem.item.sellPrice * cartItem.count} {config.currency}
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