import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import scss from './Login.module.scss';
import LoginLogic from './LoginLogic';


// interface ILogin {
// 	email: string;
// 	password: string;
// }

const Login: React.FC = () => {
	// const clearForm: ILogin = {email: "", password: ""};
	// const setToken = useContext(TokenContext)[1];
	// const [,setUser]  = useContext(UserContext);
	// const setGlobalAlert = useContext(GlobalAlertContext)[1];

	// const [formData, setFormData]         = useState<ILogin>(clearForm);
	// const [validated, setValidated]       = useState<boolean>(false);

	// const HandleLogin = async (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const form: HTMLFormElement = event.currentTarget;

	// 	if(!form.checkValidity()) {setValidated(true); return false;}

	// 	const response = await UserApi.login(formData);

	// 	if(response.status !== 200) {
	// 		setGlobalAlert({
	// 			open: true,
	// 			variant: "danger",
	// 			content: response.data
	// 		});
	// 		setValidated(false);
	// 		return false;
	// 	}
	// 	localStorage.setItem('token', response.headers.token);
	// 	setUser(response.data);
	// 	setToken(response.headers.token);
	// }
	const logic = LoginLogic();

	return(
		<Form className={scss.form} noValidate validated={logic.validated} onSubmit={logic.HandleLogin}>
			
			<h1 className={scss.heading}>IntrShop</h1>

			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control
						type="email"
						required
						placeholder="Email"
						value={logic.formData.email}
						onChange={e=>logic.setFormData({...logic.formData, email: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control
						type="password"
						placeholder="Heslo"
						required
						value={logic.formData.password}
						onChange={e=>logic.setFormData({...logic.formData, password: e.target.value})}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col}>
					<Button variant="primary" type="submit">Přihlásit</Button>
				</Form.Group>
			</Form.Row>
		</Form>
	);
}

export default Login;