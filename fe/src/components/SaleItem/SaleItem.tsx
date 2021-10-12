import React, {useMemo, useState, useRef} from "react";
import ISales from 'interfaces/Sales';
import { Card, Row, Col, Collapse, Button } from 'react-bootstrap';
import config from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import SaleItemDetail from 'components/SaleItemDetail/SaleItemDetail';

interface IProps {
	item: ISales;
}

const SaleItem: React.FC<IProps> = (props: IProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const ariaControls = useRef<HTMLDivElement>(null);

	const date: Date = useMemo(()=>{
		if(!props.item.date) return new Date();
		return new Date(props.item.date);
	}, [props.item.date]);


	return(
		<>
		<Card className="section-card" border={props.item.card ? "warning" : ""}>
			<Card.Body onClick={()=>setOpen(!open)}>
				<Row>
					<Col>
						Cena: <b>{props.item.price} {config.currency}</b>
					</Col>
					<Col xs="auto">
						{date.getHours()}:{(date.getMinutes() < 10) ? '0'+date.getMinutes() : date.getMinutes()}
					</Col>
					<Col xs="auto">
						<FontAwesomeIcon icon={props.item.card ? faCreditCard : faCoins}/>
					</Col>
				</Row>
			</Card.Body>

			<Collapse in={open} mountOnEnter unmountOnExit>
				<Card.Body>
					<SaleItemDetail saleId={props.item._id}/>
				</Card.Body>
			</Collapse>
		</Card>
		</>
	);
}

export default SaleItem;