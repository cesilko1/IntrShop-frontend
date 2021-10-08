import React, { useMemo, useContext } from "react";
import IGoods from "interfaces/Goods";
import config from 'config';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import GoodsUpdateContext from 'contexts/GoodsUpdateContext';


interface IProps {
	item: IGoods;
	openMenu: any;
}

const GoodsListItem: React.FC<IProps> = (props: IProps) => {
	const [,setGoodsUpdate] = useContext(GoodsUpdateContext);
	const margin = useMemo(()=>{return ((props.item.sellPrice * 1000 - props.item.buyPrice * 1000) / 1000).toFixed(2)}, []);

	const OpenItemMenu = () => {
		setGoodsUpdate(props.item);
		props.openMenu();
	}

	return(
		<tr>
			<td>
				<Button size="sm" onClick={()=>OpenItemMenu()}>
					<FontAwesomeIcon icon={faEdit}/>
				</Button>
			</td>
			<td>
			{props.item.name}
			</td>
			<td>
				{props.item.inStock} ks
			</td>
			<td>
				{props.item.sold} ks
			</td>
			<td>
				{props.item.lost} ks
			</td>
			<td>
				{props.item.sellPrice} {config.currency}
			</td>
			<td>
				{props.item.buyPrice.toString().replace('.', ',')} {config.currency}
			</td>
			<td>
				{margin.replace('.', ',')} {config.currency}/ks
			</td>
			<td>
				{(Math.round((parseFloat(margin) / props.item.sellPrice) * 1000) / 10).toString().replace('.', ',')} %	
			</td>
		</tr>
	);
}

export default GoodsListItem;