import {useContext, useState, FormEvent} from "react";
import UserApi from 'api/UserApi';
import { TokenContext } from 'contexts/TokenContext';
import { UserContext } from 'contexts/UserContext';
import GlobalAlertContext from 'contexts/GlobalAlertContext';


interface ILogin {
	email: string;
	password: string;
}

const LoginLogic = () => {
	const clearForm: ILogin = {email: "", password: ""};
	const setToken = useContext(TokenContext)[1];
	const [,setUser]  = useContext(UserContext);
	const setGlobalAlert = useContext(GlobalAlertContext)[1];

	const [formData, setFormData]         = useState<ILogin>(clearForm);
	const [validated, setValidated]       = useState<boolean>(false);

	const HandleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;

		if(!form.checkValidity()) {setValidated(true); return false;}

		const response = await UserApi.login(formData);

		if(response.status !== 200) {
			setGlobalAlert({
				open: true,
				variant: "danger",
				content: response.data
			});
			setValidated(false);
			return false;
		}
		localStorage.setItem('token', response.headers.token);
		setUser(response.data);
		setToken(response.headers.token);
	}

	return {formData, setFormData, validated, HandleLogin}
}

export default LoginLogic;