import React, { useContext, useEffect, useState } from "react";
import GoodsInCart from 'contexts/GoodsInCart';
import { CreateSaleProvider } from 'contexts/CreateSaleContext';
import { Card, Button } from 'react-bootstrap';
import CartContent from 'components/CartContent/CartContent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CartStorage from "utils/CartStorage";
import ICartData from "interfaces/CartData";
import config from "config";

const Cart: React.FC = () => {
	const [goodsInCart,] = useContext(GoodsInCart);
	const [cartData, setCartData] = useState<ICartData[]>([]);
	
	useEffect(()=>{
		LoadData();
	}, [goodsInCart]);

	const saveSale = () => {
		console.log(CartStorage.getCurrentData());
	}

	const LoadData = () => {
		setCartData(CartStorage.getCurrentData());
	}

	const clearCart = () => {
		CartStorage.clear();
		LoadData();
	}

	return(
		<CreateSaleProvider>
			<Card className="section-card">
				<Card.Body>
					{(cartData.length !== 0) ?
						cartData.map((item: any, key: number)=>{
							return(
								<CartContent key={key} item={item} reloadData={LoadData}/>
							);
						})
						:
						"Košík je prázdný"
					}
				</Card.Body>

				<Card.Body>
					K platbě celkem: {CartStorage.getCurrentPrice()} {config.currency}
				</Card.Body>

				<Card.Footer>
					<Button className="circle-button" variant="success" onClick={()=>saveSale()}>
						<FontAwesomeIcon icon={faCheck}/>
					</Button>

					<Button className="circle-button ml-4" variant="danger" onClick={()=>clearCart()}>
						<FontAwesomeIcon icon={faTrashAlt}/>
					</Button>
				</Card.Footer>
			</Card>
		</CreateSaleProvider>
	);
}

export default Cart;