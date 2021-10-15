import {useEffect, useContext, useState, useMemo} from 'react';
import SaleApi from "api/SaleApi";
import TokenContext from 'contexts/TokenContext';
import ReloadSalesContext from "contexts/ReloadSalesContext";
import ISales, { ISaleDetail } from "interfaces/Sales";
import GlobalAlertContext from 'contexts/GlobalAlertContext';
import Config from 'config';

interface IProps {
	sale: ISales;
	close: any;
}

const SaleItemDetaiLogic = (props: IProps) => {
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

	return {DeleteSale, soldItems, fee, margin}
}

export default SaleItemDetaiLogic;