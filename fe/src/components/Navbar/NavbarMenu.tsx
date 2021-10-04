import React, { useState, useContext } from 'react';
import { Nav, Navbar, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import scss from './NavbarMenu.module.scss';
import { UserContext } from 'contexts/UserContext';
import { TokenContext } from 'contexts/TokenContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';

import { HOME, GOODS, SALES } from 'paths';
import IUser from 'interfaces/User';

const NavbarMenu: React.FC = () => {
	const [ expanded, setExpanded ] = useState<boolean>(false);
	const user: IUser = useContext(UserContext)[0];
	const setToken = useContext(TokenContext)[1];

	const logout = (e: any) => {
		e.preventDefault();
		localStorage.clear();
		setToken();
	}

	return(
		<Navbar expand="md" bg="primary" variant="dark" expanded={expanded} className={scss.navbar}>
			<Container>
				<Navbar.Brand as={Dropdown}>
					<Dropdown.Toggle id={uuid()}>
						<FontAwesomeIcon icon={faUserCircle} className={scss.icon}/>
						<span className={scss.email}>{user.email}</span>
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>
							Změnit Heslo
						</Dropdown.Item>
						<Dropdown.Divider/>
						<Dropdown.Item onClick={(e: any)=>logout(e)}>
							<FontAwesomeIcon icon={faSignOutAlt}/>
							&nbsp;Odhlásit
						</Dropdown.Item>
					</Dropdown.Menu>
				</Navbar.Brand>

				<Navbar.Toggle onClick={()=>setExpanded(!expanded)} className={scss.button}/>

				<Navbar.Collapse>
					<Nav className="ml-auto">
						<Nav.Link as={Link} to={HOME} onClick={()=>setExpanded(false)} className={scss.navLink}>
							Domů
						</Nav.Link>
						<Nav.Link as={Link} to={GOODS} onClick={()=>setExpanded(false)} className={scss.navLink}>
							Zboží
						</Nav.Link>
						<Nav.Link as={Link} to={SALES} onClick={()=>setExpanded(false)} className={scss.navLink}>
							Prodeje
						</Nav.Link>
						<Nav.Link onClick={(e: any)=>{setExpanded(false); logout(e)}} className={scss.navLink}>
							Odhlásit
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavbarMenu;