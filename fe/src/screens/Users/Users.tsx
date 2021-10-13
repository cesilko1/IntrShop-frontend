import React, {useEffect, useState, useContext} from "react";
import TokenContext from "contexts/TokenContext";
import UserApi from "api/UserApi";
import IUser from "interfaces/User";
import { Card, Container, Table, Row, Col } from 'react-bootstrap';
import UserTableItem from 'components/UserTableItem/UserTableItem';
import NewUser from 'components/NewUser/NewUser';


const Users: React.FC = () => {
	const [Token,] = useContext(TokenContext);
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(()=>{
		LoadUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const LoadUsers = async () => {
		const response = await UserApi.getUsers(Token);
		setUsers(response.data);
	}

	return(
		<Container>
			<Card className="section-card">
				<Card.Header>
					<Row>
						<Col>
							<h3>Uživatelé</h3>
						</Col>

						<Col xs="auto">
							<NewUser/>
						</Col>
					</Row>
				</Card.Header>

				<Card.Body>
					<Table responsive striped bordered hover>
						<thead>
							<tr>
								<th></th>
								<th>Email</th>
								<th>Oprávnění</th>
								<th>Datum registrace</th>
							</tr>
						</thead>
						<tbody>
							{
								users.map((user: IUser, key: number)=>{
									return(
										<UserTableItem user={user} reloadData={LoadUsers} key={key}/>
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