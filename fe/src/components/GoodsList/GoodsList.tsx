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
		console.log(response.data);
		setGoods(response.data);
	}

	return(
		<Table responsive="md" striped bordered hover>
			<thead>
				<tr>
					<th>Název</th>
					<th>Cena Kč</th>
					<th>Skladem ks</th>
					<th>Nákupní cena Kč</th>
					<th>Ztraceno</th>
					<th>Marže Kč</th>
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