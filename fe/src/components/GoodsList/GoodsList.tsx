import React, { useEffect, useContext, useState} from "react";
import TokenContext from "contexts/TokenContext";
import GoodsApi from "api/GoodsApi";
import IGoods from "interfaces/Goods";
import GoodsListItem from 'components/GoodsListItem/GoodsListItem';
import { Table, Modal, Button } from 'react-bootstrap';
import GoodsUpdateForm from 'components/GoodsUpdateForm/GoodsUpdateForm';
import GoodsUpdateContext from "contexts/GoodsUpdateContext";
import GlobalAlertContext from 'contexts/GlobalAlertContext';

const GoodsList: React.FC = () => {
	const [,setGlobalAlert] = useContext(GlobalAlertContext);
	const [goodsUpdate,] = useContext(GoodsUpdateContext);
	const [token,] = useContext(TokenContext);
	const [goods, setGoods] = useState<IGoods[]>([]);
	const [openModal, setOpenModal] = useState<boolean>(false);

	useEffect(()=>{
		LoadData();
	}, []);

	const LoadData = async () => {
		const response = await GoodsApi.getGoods(token);
		setGoods(response.data);
	}

	const OpenModal = () => {
		setOpenModal(true);
	}

	const DeleteItem = async () => {
		const response = await GoodsApi.deleteGoodsById(goodsUpdate._id, token);

		if(response.status === 200) {
			setGlobalAlert({
				open: true,
				variant: "warning",
				content: "Položka "+goodsUpdate.name+" je smazána"
			})
			setOpenModal(false);
			LoadData();
		}
	}

	return(
		<>
		<Table responsive="md" striped bordered hover>
			<thead>
				<tr>
					<th></th>
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
							<GoodsListItem item={item} key={key} openMenu={OpenModal}/>
						);
					})
				}
			</tbody>
		</Table>

		<Modal size="lg" centered show={openModal} backdrop="static" onHide={()=>setOpenModal(false)}>
			<Modal.Header closeButton>
				Upravit položku
			</Modal.Header>

			<Modal.Body>
				<GoodsUpdateForm reloadData={LoadData}/>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="danger" onClick={()=>DeleteItem()}>
					Smazat
				</Button>
			</Modal.Footer>
		</Modal>
		</>
	);
}

export default GoodsList;