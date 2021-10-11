import React, {useEffect, useState, useContext} from "react";
import TokenContext from "contexts/TokenContext";
import UserApi from "api/UserApi";
import IUser from "interfaces/User";
import { Card, Container, Table } from 'react-bootstrap';

const Users: React.FC = () => {
	const [Token,] = useContext(TokenContext);
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(()=>{
		LoadUsers();
	}, []);

	const LoadUsers = async () => {
		const response = await UserApi.getUsers(Token);
		console.log(response.data);
		setUsers(response.data);
	}

	return(
		<Container>
			<Card className="section-card">
				<Card.Header>
					<h3>Uživatelé</h3>
				</Card.Header>

				<Card.Body>
					<Table responsive striped bordered hover>
						<thead>
							<tr>
								<th>Email</th>
								<th>Oprávnění</th>
								<th>Datum registrace</th>
							</tr>
						</thead>
						<tbody>
							{
								users.map((user: IUser, key: number)=>{
									return(
										<tr>
											<td>{user.email}</td>
											<td>{user.privileges}</td>
											<td>{user.createdAt}</td>
										</tr>
									);
								})
							}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Users;