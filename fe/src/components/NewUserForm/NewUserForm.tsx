import React, { useState, useContext, FormEvent } from "react";
import UserApi from 'api/UserApi';
import TokenContext from 'contexts/TokenContext';
import { Button, Form, Col } from 'react-bootstrap';
import GlobalAlertContext from 'contexts/GlobalAlertContext';
import { v4 as uuid} from 'uuid';

interface IProps {
	close: any;
}

interface INewUser {
	email: string;
	privileges: number;
	password: string;
	repeatPassword?: string;
}

const NewUserForm: React.FC<IProps> = (props: IProps) => {
	const [formData, setFormData] = useState<INewUser>({email: "", privileges: 0, password: "", repeatPassword: ""});
	const [Token,] = useContext(TokenContext);
	const [validated, setValidated] = useState<boolean>(false);
	const [,setGlobalAlert] = useContext(GlobalAlertContext);

	const SubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;

		if(!form.checkValidity()) {setValidated(true); return false;}

		if(formData.password !== formData.repeatPassword) {
			setGlobalAlert({
				open: true,
				variant: "danger",
				content: "Zadaná hesla se neshodují"
			});
			return false;
		}

		delete formData.repeatPassword;

		const response = await UserApi.register(formData, Token);

		if(response.status === 201) {
			setGlobalAlert({
				open: true,
				variant: "success",
				content: response.data
			});

			props.close();
		}
		else if(response.status === 400) {
			setGlobalAlert({
				open: true,
				variant: "danger",
				content: response.data
			});
		}
	}

	return(
		<Form noValidate validated={validated} onSubmit={SubmitForm}>
			<Form.Row>
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						type="text"
						value={formData.email}
						onChange={e=>setFormData({...formData, email: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>Oprávnění</Form.Label>
					<Form.Control
						required
						type="number"
						value={formData.privileges}
						onChange={e=>setFormData({...formData, privileges: Number(e.target.value)})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>Heslo</Form.Label>
					<Form.Control
						required
						type="password"
						value={formData.password}
						onChange={e=>setFormData({...formData, password: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} controlId={uuid()}>
					<Form.Label>Heslo znovu</Form.Label>
					<Form.Control
						required
						type="password"
						value={formData.repeatPassword}
						onChange={e=>setFormData({...formData, repeatPassword: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col}>
					<Button type="submit">
						Vytvořit
					</Button>
				</Form.Group>
			</Form.Row>
		</Form>
	);
}

export default NewUserForm;