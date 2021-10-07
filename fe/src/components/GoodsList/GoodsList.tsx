import React, { useEffect, useContext, useState} from "react";
import TokenContext from "contexts/TokenContext";
import GoodsApi from "api/GoodsApi";
import IGoods from "interfaces/Goods";
import GoodsListItem from 'components/GoodsListItem/GoodsListItem';
import { Table } from 'react-bootstrap';

const GoodsList: React.FC = () => {
	const [token,] = useContext(TokenContext);
	const [goods, setGoods] = useState<IGoods[]>([]);

	useEffect(()=>{
		LoadData();
	}, []);

	const LoadData = async () => {
		const response = await GoodsApi.getGoods(token);
		setGoods(response.data);
	}

	return(
		<Table responsive="md" striped bordered hover>
			<thead>
				<tr>
					<th>Název</th>
					<th>Cena</th>
					<th>Skladem</th>
					<th>Nákupní cena</th>
					<th>Ztraceno</th>
					<th>Marže</th>
					<th>Marže %</th>
				</tr>
			</thead>
			<tbody>
				{
					goods.map((item: IGoods, key: number) => {
						return(
							<GoodsListItem item={item} key={key}/>
						);
					})
				}
			</tbody>
		</Table>
	);
}

export default GoodsList;