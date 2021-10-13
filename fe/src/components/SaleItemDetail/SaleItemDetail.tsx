import React, {useEffect, useContext, useState, useMemo} from "react";
import { Row, Col, Button } from 'react-bootstrap';
import TokenContext from 'contexts/TokenContext';
import ReloadSalesContext from "contexts/ReloadSalesContext";
import SaleApi from "api/SaleApi";
import { ISaleDetail } from "interfaces/Sales";
import scss from './SaleItemDetail.module.scss';
import Config from "config";
import PrivilegesManager from 'components/PrivilegesManager/PrivilegesManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlobalAlertContext from 'contexts/GlobalAlertContext';
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

interface IProps {
	saleId?: string;
	close: any;
}

const SaleItemDetail: React.FC<IProps> = (props: IProps) => {
	const [,setGlobalAlert] = useContext(GlobalAlertContext);
	const [reloadSales, setReloadSales] = useContext(ReloadSalesContext);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const DeleteSale = async () => {
		if(!props.saleId) return false;
		const response = await SaleApi.deleteSaleById(props.saleId, Token);

		if(response.status === 200) {
			props.close(false);
			setReloadSales(!reloadSales);
			setGlobalAlert({
				open: true,
				variant: "warning",
				content: "Nákup zrušen."
			});
		}
	}

	return(
		<>
			<Row className="mb-3">
				<Col className="text-success">
					Marže nákupu: {margin} {Config.currency}
				</Col>

				<PrivilegesManager privileges={0}>
					<Col xs="auto">
						<Button size="sm" variant="danger" onClick={DeleteSale}>
							<FontAwesomeIcon icon={faWindowClose}/>
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