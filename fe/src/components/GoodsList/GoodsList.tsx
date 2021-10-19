import React from "react";
import IGoods from "interfaces/Goods";
import GoodsListItem from 'components/GoodsListItem/GoodsListItem';
import { Table, Modal, FormControl } from 'react-bootstrap';
import GoodsUpdateForm from 'components/GoodsUpdateForm/GoodsUpdateForm';
import scss from './GoodsList.module.scss';
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";
import GoodsListLogic from './GoodsListLogic';

const GoodsList: React.FC = () => {
	const logic = GoodsListLogic();

	return(
		<LoadingAnimation loading={logic.loading}>
			<FormControl
				placeholder="Vyhledat"
				size="sm"
				className="w-50 mb-3"
				type="text"
				value={logic.searchBy}
				onChange={e=>logic.HandleSearch(e.target.value)}
			/>

			<Table responsive striped bordered hover>
				<thead>
					<tr className={scss.tableHeader}>
						<th></th>
						<th onClick={()=>logic.ReverseData()} style={{width: "8rem"}}>Název zboží</th>
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
						logic.goods.map((item: IGoods, key: number) => {
							return(
								<GoodsListItem item={item} key={key} openMenu={logic.OpenModal} reloadTable={logic.LoadData}/>
							);
						})
					}
				</tbody>
			</Table>

			<Modal size="lg" centered show={logic.openModal} backdrop="static" onHide={()=>logic.setOpenModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						Upravit položku
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<GoodsUpdateForm reloadData={logic.LoadData}/>
				</Modal.Body>
			</Modal>
		</LoadingAnimation>
	);
}

export default GoodsList;