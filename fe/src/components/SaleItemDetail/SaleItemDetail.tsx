import React, {useEffect, useContext, useState, useMemo} from "react";
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
	const margin = useMemo(()=>{
		var marginPrice = 0;
		
		for(var i=0; i<soldItems.length; i+=1) {
			marginPrice += (soldItems[i].price - soldItems[i].goods.buyPrice) * soldItems[i].count;
		}
		return marginPrice.toFixed(2).replace('.', ',');

	}, [soldItems]);

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
			<Row className="mb-2 text-success">
				<Col>
					Marže nákupu: {margin} {Config.currency}
				</Col>
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