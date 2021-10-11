import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewUserForm from 'components/NewUserForm/NewUserForm';

const NewUser: React.FC = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);

	return(
		<>
			<Button className="circle-button circle-button-mobile" onClick={()=>setOpenModal(true)}>
				<FontAwesomeIcon icon={faPlus}/>
			</Button>

			<Modal centered show={openModal} backdrop="static" onHide={()=>setOpenModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						Vytvořit nového uživatele
					</Modal.Title>	
				</Modal.Header>

				<Modal.Body>
					<NewUserForm close={setOpenModal}/>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default NewUser;