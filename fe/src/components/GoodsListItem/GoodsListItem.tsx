import React, { useMemo } from "react";
import IGoods from "interfaces/Goods";
import config from 'config';

interface IProps {
	item: IGoods;
}

const GoodsListItem: React.FC<IProps> = (props: IProps) => {
	const margin = useMemo(()=>{return (props.item.sellPrice * 1000 - props.item.buyPrice * 1000) / 1000}, []);

	return(
		<tr>
			<td>
			{props.item.name}
			</td>
			<td>
				{props.item.sellPrice} {config.currency}
			</td>
			<td>
				{props.item.inStock} ks
			</td>
			<td>
				{props.item.buyPrice} {config.currency}
			</td>
			<td>
				{props.item.lost} ks
			</td>
			<td>
				{margin} {config.currency}
			</td>
			<td>
				{Math.round((margin / props.item.sellPrice) * 100)} %	
			</td>
		</tr>
	);
}

export default GoodsListItem;