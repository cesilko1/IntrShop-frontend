import React, {useState, useContext, FormEvent} from "react";
import TokenContext from 'contexts/TokenContext';
import { Form, Col, Button } from 'react-bootstrap';
import GoodsApi from 'api/GoodsApi';
import IGoods from 'interfaces/Goods';
import { v4 as uuid } from 'uuid';
import GlobalAlertContext from 'contexts/GlobalAlertContext';

interface IProps {
	item: IGoods;
	close: any;
	reload: any;
}

interface IFormData {
	price: number;
	count: number;
}

const GoodsAddForm: React.FC<IProps> = (props: IProps) => {
	const [Token,] = useContext(TokenContext);
	const [validated, setValidated] = useState<boolean>(false);
	const [formData, setFormData] = useState<IFormData>({price: 0, count: 0});
	const [,setGlobalAlert] = useContext(GlobalAlertContext);

	const SubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;

		if(!form.checkValidity()) {setValidated(true); return false;}
		if(!props.item._id) return false;

		const response = await GoodsApi.buyNewGoodsById(props.item._id, formData.count, formData.price, Token);

		if(response.status === 200) {
			setGlobalAlert({
				open: true,
				variant: "success",
				content: response.data
			});
			props.reload();
			props.close(false);
		}
	}

	return(
		<Form noValidate validated={validated} onSubmit={SubmitForm}>
			<Form.Row>
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>
						Počet
					</Form.Label>
					<Form.Control
						required
						type="number"
						value={formData.count}
						onChange={e=>setFormData({...formData, count: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>
						Celková cena
					</Form.Label>
					<Form.Control
						required
						type="number"
						value={formData.price}
						onChange={e=>setFormData({...formData, price: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col}>
					<Button variant="success" type="submit">
						Přikoupit
					</Button>
				</Form.Group>
			</Form.Row>
		</Form>
	);
}

export default GoodsAddForm;