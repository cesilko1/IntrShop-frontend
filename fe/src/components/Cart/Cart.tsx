import React, { ReactElement, useContext, useEffect, useState } from "react";
import GoodsInCart from 'contexts/GoodsInCart';
import { CreateSaleProvider } from 'contexts/CreateSaleContext';
import { Card, Button, Row, Col, ToggleButton, FormControl, Form } from 'react-bootstrap';
import CartContent from 'components/CartContent/CartContent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCoins, faCreditCard, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CartStorage from "utils/CartStorage";
import ICartData from "interfaces/CartData";
import config from "config";
import {v4 as uuid} from 'uuid';
import SaleApi from 'api/SaleApi';
import TokenContext from "contexts/TokenContext";
import ISales from "interfaces/Sales";
import GlobalAlertContext from "contexts/GlobalAlertContext";
import IGlobalAlert from "interfaces/GlobalAlert";

const Cart: React.FC = () => {
	const [,setGlobalAlert] = useContext(GlobalAlertContext);
	const [token,] = useContext(TokenContext);
	const [goodsInCart,] = useContext(GoodsInCart);
	const [cartData, setCartData] = useState<ICartData[]>([]);
	const [payByCard, setPayByCard] = useState<boolean>(false);
	
	useEffect(()=>{
		LoadData();
	}, [goodsInCart]);

	const saveSale = async () => {
		const saleData: ISales = {
			card: payByCard,
			items: CartStorage.getDataForSale()
		}

		const response = await SaleApi.createSale(saleData, token);

		if(response.status === 201) {
			setGlobalAlert({open: true, variant: "success", content: response.data});
			clearCart();
		}
		else if(response.status === 410 ) {
			const alert: IGlobalAlert = {
				open: true,
				variant: "danger",
				content: "Některé položky nelze prodat"
			};

			setGlobalAlert(alert);
		}
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
						<EmptyCart/>				
					}
				</Card.Body>

				<Card.Body>
					<Row>
						<Col>
							<Form.Check
								type="checkbox"
								checked={payByCard}
								onChange={(e:any)=>setPayByCard(e.target.checked)}
								label="Platba kartou"
								id={uuid()}
							/>
						</Col>
						<Col>
							K platbě celkem:
							&nbsp;
							<b>{CartStorage.getCurrentPrice()} {config.currency}</b>
							&nbsp;
							{payByCard ? <CardIcon/> : <CashIcon/>}
						</Col>
					</Row>
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

const EmptyCart: React.FC = () => {
	return(
		<b>
			Košík je prázdný
		</b>
	);
}

const CashIcon = () => {return(<FontAwesomeIcon icon={faCoins}/>);}
const CardIcon = () => {return(<FontAwesomeIcon icon={faCreditCard}/>);}

export default Cart;