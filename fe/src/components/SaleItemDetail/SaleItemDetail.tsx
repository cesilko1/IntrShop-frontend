import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Button } from 'react-bootstrap';
import { faBan } from "@fortawesome/free-solid-svg-icons";
import PrivilegesManager from 'components/PrivilegesManager/PrivilegesManager';
import scss from './SaleItemDetail.module.scss';
import Config from "config";
import ISales, { ISaleDetail } from "interfaces/Sales";
import SaleItemDetailLogic from './SaleItemDetailLogic';


interface IProps {
	sale: ISales;
	close: any;
}

const SaleItemDetail: React.FC<IProps> = (props: IProps) => {
	const {DeleteSale, soldItems, fee, margin} = SaleItemDetailLogic(props);

	return(
		<>
			<Row className="mb-3">
				<Col>
					<span className="text-success">Marže: <b>{margin} {Config.currency}</b></span>
				</Col>

				{
					props.sale.card ?
						<Col>
							GP: <b>{fee} {Config.currency}</b>
						</Col>
						:
						""
				}

				<PrivilegesManager privileges={0}>
					<Col xs="auto">
						<Button size="sm" variant="warning" onDoubleClick={DeleteSale}>
							<FontAwesomeIcon icon={faBan}/>
						</Button>
					</Col>
				</PrivilegesManager>
			</Row>
			{
				soldItems.map((item: ISaleDetail, key: number) => {
					return(
						<Row key={key} className={scss.row}>
							<Col>
								<b>{item.goods.name}</b>
							</Col>
							<Col xs="auto">
								{item.count} Ks
							</Col>
							<Col xs="auto">
								{item.price} {Config.currency}
							</Col>
						</Row>
					);
				})
			}
		</>
	);
}

export default SaleItemDetail;