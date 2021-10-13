import React, { useEffect, useContext, useState} from "react";
import TokenContext from "contexts/TokenContext";
import GoodsApi from "api/GoodsApi";
import IGoods from "interfaces/Goods";
import GoodsListItem from 'components/GoodsListItem/GoodsListItem';
import { Table, Modal, FormControl } from 'react-bootstrap';
import GoodsUpdateForm from 'components/GoodsUpdateForm/GoodsUpdateForm';
import scss from './GoodsList.module.scss';

const GoodsList: React.FC = () => {
	const [token,] = useContext(TokenContext);
	const [goods, setGoods] = useState<IGoods[]>([]);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [searchBy, setSearchBy] = useState<string>("");

	useEffect(()=>{
		LoadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const LoadData = async () => {
		const response = await GoodsApi.getGoods(token);
		setGoods(response.data);
	}

	const OpenModal = () => {
		setOpenModal(true);
	}

	const ReverseData = () => {
		const sortedData = [...goods].reverse();
		setGoods(sortedData);
	}

	const HandleSearch = (searchString: string) => {
		setSearchBy(searchString);
		if(searchString === '') return LoadData();

		setGoods([...goods].filter(o=>o.name.toLowerCase().includes(searchString)));
	}

	return(
		<>
		<FormControl
			placeholder="Vyhledat"
			size="sm"
			className="w-50 mb-3"
			type="text"
			value={searchBy}
			onChange={e=>HandleSearch(e.target.value)}
		/>

		<Table responsive striped bordered hover>
			<thead>
				<tr className={scss.tableHeader}>
					<th></th>
					<th onClick={()=>ReverseData()} style={{width: "8rem"}}>Název zboží</th>
					<th>Skladem</th>
					<th>Prodáno</th>
					<th>Ztraceno</th>
					<th>Nakoupeno</th>
					<th>Prodejní cena</th>
					<th>Nákupní cena</th>
					<th>Marže</th>
					<th>Marže %</th>
				</tr>
			</thead>
			<tbody className={scss.tbody}>
				{
					goods.map((item: IGoods, key: number) => {
						return(
							<GoodsListItem item={item} key={key} openMenu={OpenModal} reloadTable={LoadData}/>
						);
					})
				}
			</tbody>
		</Table>

		<Modal size="lg" centered show={openModal} backdrop="static" onHide={()=>setOpenModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					Upravit položku
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<GoodsUpdateForm reloadData={LoadData}/>
			</Modal.Body>
		</Modal>
		</>
	);
}

export default GoodsList;