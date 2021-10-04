import React, { useState, useContext, FormEvent } from "react";
import { Form, Col, Alert, Button } from "react-bootstrap";
import UserApi from 'api/UserApi';
import { TokenContext } from 'contexts/TokenContext';
import { UserContext } from 'contexts/UserContext';
import scss from './Login.module.scss';


interface ILogin {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const clearForm: ILogin = {email: "", password: ""};
	const setToken = useContext(TokenContext)[1];
	const [user, setUser]  = useContext(UserContext);

	const [formData, setFormData]         = useState<ILogin>(clearForm);
	const [alertContent, setAlertContent] = useState<string>("");
	const [alert, setAlert]               = useState<boolean>(false);
	const [validated, setValidated]       = useState<boolean>(false);

	const HandleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;

		if(!form.checkValidity()) {setValidated(true); return false;}

		const response = await UserApi.login(formData);

		if(response.status !== 200) {
			setAlertContent(response.data);
			setAlert(true);
			setValidated(false);
			return false;
		}
		localStorage.setItem('token', response.headers.token);
		setUser(response.data);
		setToken(response.headers.token);
	}

	return(
		<Form className={scss.form} noValidate validated={validated} onSubmit={HandleLogin}>
			
			<h1 className={scss.heading}>IntrShop</h1>

			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control
						type="email"
						required
						placeholder="Email"
						value={formData.email}
						onChange={e=>setFormData({...formData, email: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control
						type="password"
						placeholder="Heslo"
						required
						value={formData.password}
						onChange={e=>setFormData({...formData, password: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Alert variant="danger" dismissible show={alert} onClose={()=>setAlert(false)}>
				<p>{alertContent}</p>
			</Alert>

			<Form.Row>
				<Form.Group as={Col}>
					<Button variant="primary" type="submit">Přihlásit</Button>
				</Form.Group>
			</Form.Row>
		</Form>
	);
}

export default Login;