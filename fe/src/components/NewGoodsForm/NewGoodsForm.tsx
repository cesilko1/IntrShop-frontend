import React, { useState, useContext, FormEvent } from "react";
import { TokenContext } from 'contexts/TokenContext';
import { GlobalAlertContext } from 'contexts/GlobalAlertContext';
import { Form, Col, Button } from 'react-bootstrap';
import IGoods from 'interfaces/Goods';
import GoodsApi from 'api/GoodsApi';
import { v4 as uuid } from 'uuid';

interface IProps {
	close: any;
}

const NewGoodsForm: React.FC<IProps> = (props: IProps) => {
	const clearForm: IGoods = {name: "", sellPrice: 0, buyPrice: 0, inStock: 0, lost: 0, sold: 0}
	const token = useContext(TokenContext)[0];
	const setGlobalAlert = useContext(GlobalAlertContext)[1];

	const [formData, setFormData]         = useState<IGoods>(clearForm);
	const [validated, setValidated]       = useState<boolean>(false);

	const SubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;

		if(!form.checkValidity()) {setValidated(true); return false;}

		const response = await GoodsApi.addNewGoods(formData, token);

		if(response.status === 201) {
			setGlobalAlert({
				open: true,
				variant: "success",
				content: response.data
			});
			setValidated(false);
			props.close(false);
			return false;
		}

	}


	return(
		<Form noValidate validated={validated} onSubmit={SubmitForm}>
			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Název</Form.Label>
					<Form.Control
						type="text"
						value={formData.name}
						required
						onChange={e=>setFormData({...formData, name: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Prodejní cena</Form.Label>
					<Form.Control
						type="number"
						value={formData.sellPrice}
						required
						onChange={e=>setFormData({...formData, sellPrice: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Nákupní cena</Form.Label>
					<Form.Control
						type="number"
						value={formData.buyPrice}
						required
						onChange={e=>setFormData({...formData, buyPrice: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Počet na skladu</Form.Label>
					<Form.Control
						type="number"
						value={formData.inStock}
						required
						onChange={e=>setFormData({...formData, inStock: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} id={uuid()}>
					<Form.Label>Ztraceno</Form.Label>
					<Form.Control
						type="number"
						value={formData.lost}
						required
						onChange={e=>setFormData({...formData, lost: Number(e.target.value)})}
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

export default NewGoodsForm;