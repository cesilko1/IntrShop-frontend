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

interface IFormData {
	name: string;
	count: number;
	buyPrice: number;
	sellPrice: number;
}

const NewGoodsForm: React.FC<IProps> = (props: IProps) => {
	const clearForm: IFormData = {name: "", count: 1, buyPrice: 0, sellPrice: 0};
	const token = useContext(TokenContext)[0];
	const setGlobalAlert = useContext(GlobalAlertContext)[1];

	const [formData, setFormData]         = useState<IFormData>(clearForm);
	const [validated, setValidated]       = useState<boolean>(false);

	const SubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;

		if(!form.checkValidity()) {setValidated(true); return false;}

		const newGoods: IGoods = {
			name: formData.name,
			inStock: formData.count,
			buyPrice: (formData.buyPrice / formData.count),
			bought: formData.count,
			lost: 0,
			sold: 0,
			sellPrice: formData.sellPrice
		};

		const response = await GoodsApi.addNewGoods(newGoods, token);

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
				<Form.Group as={Col} controlId={uuid()}>
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
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>Nakoupený počet</Form.Label>
					<Form.Control
						min={1}
						type="number"
						value={formData.count}
						required
						onChange={e=>setFormData({...formData, count: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>Celková cena</Form.Label>
					<Form.Control
						type="number"
						value={formData.buyPrice}
						required
						onChange={e=>setFormData({...formData, buyPrice: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>Prodejní cena za kus</Form.Label>
					<Form.Control
						type="number"
						value={formData.sellPrice}
						required
						onChange={e=>setFormData({...formData, sellPrice: Number(e.target.value)})}
					/>
					<Form.Text>
						Nákupní cena za kus: <b>{(formData.buyPrice / formData.count).toFixed(2).replace('.', ',')} Kč</b>
					</Form.Text>
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