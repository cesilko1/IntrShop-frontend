import React, {useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewGoodsForm from 'components/NewGoodsForm/NewGoodsForm';


const NewGoods: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);

	return(
		<>
		<Button type="button" className={"circle-button circle-button-mobile"} onClick={()=>setOpen(true)}>
			<FontAwesomeIcon icon={faPlus}/>
		</Button>

		<Modal centered show={open} backdrop="static" onHide={()=>setOpen(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					Vytvořit nové zboží
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<NewGoodsForm close={setOpen}/>
			</Modal.Body>
		</Modal>
		</>
	);
}

export default NewGoods;