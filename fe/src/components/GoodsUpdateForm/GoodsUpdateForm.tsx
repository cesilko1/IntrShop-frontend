import React, { useContext, useState, FormEvent } from "react";
import GoodsUpdateContext from 'contexts/GoodsUpdateContext';
import TokenContext from "contexts/TokenContext";
import { Form, Col, Button } from 'react-bootstrap';
import { v4 as uuid} from "uuid";
import GoodsApi from "api/GoodsApi";
import GlobalAlertContext from "contexts/GlobalAlertContext";


interface IProps {
	reloadData: any;
}

const GoodsUpdateForm: React.FC<IProps> = (props: IProps) => {
	const [,setGlobalAlert] = useContext(GlobalAlertContext);
	const [token,] = useContext(TokenContext);
	const [goodsUpdate,setGoodsUpdate] = useContext(GoodsUpdateContext);
	const [validated, setValidated] = useState<boolean>(false);


	const SubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;

		if(!form.checkValidity()) {setValidated(true); return false;}

		const id = goodsUpdate._id;

		delete goodsUpdate._id;
		delete goodsUpdate.__v;
		
		const response = await GoodsApi.updateGoodsById(id, goodsUpdate, token);	

		if(response.status === 200) {
			setGlobalAlert({
				open: true,
				variant: "success",
				content: "Položka byla upravena"
			});
			props.reloadData();
		}
	}

	return(
		<Form noValidate validated={validated} onSubmit={SubmitForm}>
			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Název</Form.Label>
					<Form.Control
						type="text"
						value={goodsUpdate.name}
						required
						onChange={e=>setGoodsUpdate({...goodsUpdate, name: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Prodejní cena</Form.Label>
					<Form.Control
						type="number"
						value={goodsUpdate.sellPrice}
						required
						onChange={e=>setGoodsUpdate({...goodsUpdate, sellPrice: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Nákupní cena</Form.Label>
					<Form.Control
						type="number"
						value={goodsUpdate.buyPrice}
						required
						onChange={e=>setGoodsUpdate({...goodsUpdate, buyPrice: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Počet na skladu</Form.Label>
					<Form.Control
						type="number"
						value={goodsUpdate.inStock}
						required
						onChange={e=>setGoodsUpdate({...goodsUpdate, inStock: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Ztraceno</Form.Label>
					<Form.Control
						type="number"
						value={goodsUpdate.lost}
						required
						onChange={e=>setGoodsUpdate({...goodsUpdate, lost: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Nakoupeno</Form.Label>
					<Form.Control
						type="number"
						value={goodsUpdate.bought}
						required
						onChange={e=>setGoodsUpdate({...goodsUpdate, bought: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col}>
					<Button variant="primary" type="submit">Uložit</Button>
				</Form.Group>
			</Form.Row>
		</Form>
	);
}

export default GoodsUpdateForm;