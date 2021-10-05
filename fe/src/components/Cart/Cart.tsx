import React, { useContext, useEffect } from "react";
import GoodsInCart from 'contexts/GoodsInCart';
import { CreateSaleProvider } from 'contexts/CreateSaleContext';
import { Card, Button } from 'react-bootstrap';
import CartContent from 'components/CartContent/CartContent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Cart: React.FC = () => {
	const goodsInCart = useContext(GoodsInCart)[0];

	const saveSale = () => {
		
	}

	return(
		<CreateSaleProvider>
			<Card className="section-card">
				<Card.Body>
					{
						goodsInCart.map((item: any, index: number)=>{
							return(
								<CartContent key={index} index={index}/>
							);
						})
					}
				</Card.Body>
				<Card.Footer>
					<Button className="circle-button" variant="success" onClick={()=>saveSale()}>
						<FontAwesomeIcon icon={faCheck}/>
					</Button>
				</Card.Footer>
			</Card>
		</CreateSaleProvider>
	);
}

export default Cart;