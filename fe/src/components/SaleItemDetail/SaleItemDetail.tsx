import React, {useEffect, useContext, useState, useMemo} from "react";
import { Row, Col, Button } from 'react-bootstrap';
import TokenContext from 'contexts/TokenContext';
import ReloadSalesContext from "contexts/ReloadSalesContext";
import SaleApi from "api/SaleApi";
import ISales, { ISaleDetail } from "interfaces/Sales";
import scss from './SaleItemDetail.module.scss';
import Config from "config";
import PrivilegesManager from 'components/PrivilegesManager/PrivilegesManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlobalAlertContext from 'contexts/GlobalAlertContext';
import { faBan } from "@fortawesome/free-solid-svg-icons";

interface IProps {
	sale: ISales;
	close: any;
}

const SaleItemDetail: React.FC<IProps> = (props: IProps) => {
	const [,setGlobalAlert] = useContext(GlobalAlertContext);
	const [reloadSales, setReloadSales] = useContext(ReloadSalesContext);
	const [Token,] = useContext(TokenContext);
	const [soldItems, setSoldItems] = useState<ISaleDetail[]>([]);

	const fee = useMemo(()=>{
		if(!props.sale.price) return 0;
		return (props.sale.price * Config.feeGP / 100).toFixed(2).replace('.', ',');
	}, [props.sale.price]);

	const margin = useMemo(()=>{
		var marginPrice = 0;
		
		for(var i=0; i<soldItems.length; i+=1) {
			marginPrice += (soldItems[i].price - soldItems[i].goods.buyPrice) * soldItems[i].count;
		}

		return marginPrice.toFixed(2).replace('.', ',');

	}, [soldItems]);


	useEffect(()=>{
		const loadData = async () => {
			if(!props.sale._id) return false;
			const response = await SaleApi.getSaleItemsById(props.sale._id, Token);
			setSoldItems(response.data);
		}

		loadData();
		return ()=>{SaleApi.cancel()}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const DeleteSale = async () => {
		if(!props.sale._id) return false;
		const response = await SaleApi.deleteSaleById(props.sale._id, Token);

		if(response.status === 200) {
			setReloadSales(!reloadSales);
			setGlobalAlert({
				open: true,
				variant: "warning",
				content: "Nákup zrušen."
			});
			props.close(false);
		}
	}

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