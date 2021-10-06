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
	const ChangeCount = (count: number) => {
		if(count <= 0 || count > props.item.item.inStock) return false;
		CartStorage.setCountById(props.item.item._id as string, count);
		props.reloadData();
	}

	const Delete = () => {
		CartStorage.deleteById(props.item.item._id as string);
		props.reloadData();
	}

	return(
		<Row className={scss.row}>
			<Col>
				<b>{props.item.item.name}</b>
			</Col>

			<Col xs="auto">
				{props.item.price || props.item.item.sellPrice} {config.currency}/ks
			</Col>

			<Col xs="auto">
				<ButtonToolbar>
					<ButtonGroup size="sm" className="mr-1">
						<Button variant="danger" onClick={()=>Delete()}>
							<FontAwesomeIcon icon={faTrashAlt}/>
						</Button>
					</ButtonGroup>

					<InputGroup size="sm">
						<InputGroup.Prepend>
							<Button onClick={()=>ChangeCount(props.item.count-1)}>
								<FontAwesomeIcon icon={faMinus}/>
							</Button>
						</InputGroup.Prepend>

						<FormControl
							min={1}
							type="number"
							className={scss.countInput}
							value={props.item.count}
							onChange={(e)=>ChangeCount(Number(e.target.value))}
						/>

						<InputGroup.Append>
							<Button onClick={()=>ChangeCount(props.item.count+1)}>
								<FontAwesomeIcon icon={faPlus}/>
							</Button>
						</InputGroup.Append>
					</InputGroup>

				</ButtonToolbar>
			</Col>
		</Row>
	);
}

export default CartContent;