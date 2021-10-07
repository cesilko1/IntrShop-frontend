import IGoods from "interfaces/Goods";
import React from "react";

interface IProps {
	item: IGoods;
}

const GoodsListItem: React.FC<IProps> = (props: IProps) => {
	const margin = (props.item.sellPrice * 1000 - props.item.buyPrice * 1000) / 1000;

	return(
		<tr>
			<td>
			{props.item.name}
			</td>
			<td>
				{props.item.sellPrice}
			</td>
			<td>
				{props.item.inStock}
			</td>
			<td>
				{props.item.buyPrice}
			</td>
			<td>
				{props.item.lost}
			</td>
			<td>
				{margin}
			</td>
			<td>
				{
					100*(props.item.sellPrice/props.item.buyPrice)
				}	
			</td>
		</tr>
	);
}

export default GoodsListItem;