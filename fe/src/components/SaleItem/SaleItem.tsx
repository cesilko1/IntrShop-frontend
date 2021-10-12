import React, {useMemo} from "react";
import ISales from 'interfaces/Sales';
import { Card, Row, Col } from 'react-bootstrap';
import config from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

interface IProps {
	item: ISales;
}

const SaleItem: React.FC<IProps> = (props: IProps) => {

	const date: Date = useMemo(()=>{
		if(!props.item.date) return new Date();
		return new Date(props.item.date);
	}, [props.item.date]);


	return(
		<Card className="section-card" border={props.item.card ? "warning" : ""}>
			<Card.Body>
				<Row>
					<Col>
						Cena: <b>{props.item.price} {config.currency}</b>
					</Col>
					<Col xs="auto">
						{date.getHours()}:{date.getMinutes()}
					</Col>
					<Col xs="auto">
						<FontAwesomeIcon icon={props.item.card ? faCreditCard : faCoins}/>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

export default SaleItem;