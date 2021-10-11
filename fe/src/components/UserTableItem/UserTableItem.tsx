import React, { useContext, useMemo } from "react";
import IUser from "interfaces/User";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import TokenContext from 'contexts/TokenContext';
import UserApi from 'api/UserApi';
import GlobalAlertContext from 'contexts/GlobalAlertContext';
import UserContext from 'contexts/UserContext';

interface IProps {
	user: IUser;
	reloadData: any;
}

const UserTableItem: React.FC<IProps> = (props: IProps) => {
	const [Token,] = useContext(TokenContext);
	const [user,] = useContext(UserContext);
	const [,setGlobalAlert] = useContext(GlobalAlertContext);

	const date = useMemo(()=>{
		return new Date(props.user.createdAt);
	}, [props.user.createdAt]);

	const DeleteUser = async () => {
		if(!props.user._id) return false;

		if(props.user._id === user._id) {
			setGlobalAlert({
				open: true,
				variant: "danger",
				content: "Nemůžeš smazat sám sebe!"
			});
			return false;
		}

		const response = await UserApi.deleteUserById(props.user._id, Token);

		if(response.status === 200) {
			setGlobalAlert({
				open: true,
				variant: "danger",
				content: response.data
			});

			props.reloadData();
		}
	}

	return(
		<>
			<tr>
				<td>
					<ButtonToolbar>
						<ButtonGroup>
							<Button size="sm" variant="danger" onDoubleClick={()=>DeleteUser()}>
								<FontAwesomeIcon icon={faTrashAlt}/>
							</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</td>
				<td>{props.user.email}</td>
				<td>{props.user.privileges}</td>
				<td>{date.toLocaleString()}</td>
			</tr>
		</>
	);
}

export default UserTableItem;