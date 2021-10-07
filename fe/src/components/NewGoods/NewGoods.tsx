import React, {useState, useContext } from "react";
import { TokenContext } from 'contexts/TokenContext';
import { Modal, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import scss from './NewGoods.module.scss';
import NewGoodsForm from 'components/NewGoodsForm/NewGoodsForm';


const NewGoods: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);

	return(
		<>
		<Button type="button" className={"circle-button"+' '+scss.button} onClick={()=>setOpen(true)}>
			<FontAwesomeIcon icon={faPlus}/>
		</Button>

		<Modal size="lg" centered show={open} backdrop="static" onHide={()=>setOpen(false)}>
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