import React, {useEffect, useContext, useState} from "react";
import { Row, Col } from 'react-bootstrap';
import TokenContext from 'contexts/TokenContext';
import SaleApi from "api/SaleApi";
import { ISaleDetail } from "interfaces/Sales";
import scss from './SaleItemDetail.module.scss';
import Config from "config";

interface IProps {
	saleId?: string;
}

const SaleItemDetail: React.FC<IProps> = (props: IProps) => {
	const [Token,] = useContext(TokenContext);
	const [soldItems, setSoldItems] = useState<ISaleDetail[]>([]);

	useEffect(()=>{
		const loadData = async () => {
			if(!props.saleId) return false;
			const response = await SaleApi.getSaleItemsById(props.saleId, Token);
			setSoldItems(response.data);
		}

		loadData();
		return ()=>{SaleApi.cancel()}
	}, []);

	return(
		<>
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