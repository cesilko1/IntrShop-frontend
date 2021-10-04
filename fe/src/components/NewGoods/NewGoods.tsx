import React, {useState, useContext } from "react";
import { TokenContext } from 'contexts/TokenContext';
import { Modal } from 'react-bootstrap';

interface IProps {
	open: boolean;
	setOpen: any;
}

const NewGoods: React.FC<IProps> = (props: IProps) => {
	return(
		<Modal size="lg" centered show={props.open} backdrop="static" onHide={()=>props.setOpen(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					Vytvořit nové zboží
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				
			</Modal.Body>
		</Modal>
	);
}

export default NewGoods;