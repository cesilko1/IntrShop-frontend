import React, { useMemo, useContext, useState } from "react";
import IGoods from "interfaces/Goods";
import config from 'config';
import { Button, ButtonToolbar, ButtonGroup, Modal, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPlus, faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import GoodsUpdateContext from 'contexts/GoodsUpdateContext';
import GoodsApi from 'api/GoodsApi';
import TokenContext from "contexts/TokenContext";
import GlobalAlertContext from 'contexts/GlobalAlertContext';
import PrivilegesManager from 'components/PrivilegesManager/PrivilegesManager';
import GoodsAddForm from 'components/GoodsAddForm/GoodsAddForm';

interface IProps {
	item: IGoods;
	openMenu: any;
	reloadTable: any;
}

const GoodsListItem: React.FC<IProps> = (props: IProps) => {
	const [Token,] = useContext(TokenContext);
	const [,setGlobalAlert] = useContext(GlobalAlertContext);
	const [,setGoodsUpdate] = useContext(GoodsUpdateContext);
	const margin = useMemo(()=>{return ((props.item.sellPrice * 1000 - props.item.buyPrice * 1000) / 1000).toFixed(2)}, []);

	const [openModal, setOpenModal] = useState<boolean>(false);
	const [looseCount, setLooseCOunt] = useState<number>(1);

	const [openAddModal, setOpenAddModal] = useState<boolean>(false);

	const OpenItemMenu = () => {
		setGoodsUpdate(props.item);
		props.openMenu();
	}

	const LooseItem = async () => {
		if(!props.item._id) return false;

		const response = await GoodsApi.looseGoodsById(props.item._id, looseCount, Token);

		if(response.status === 200) {
			setOpenModal(false);
			setLooseCOunt(0);
			setGlobalAlert({
				open: true,
				variant: "success",
				content: "Položka úspěšně odepsána"
			});	
			props.reloadTable();
		}

		else {
			setGlobalAlert({
				open: true,
				variant: "danger",
				content: response.data
			});
		}
	}

	const deleteItem = async () => {
		if(!props.item._id) return false;

		const response = await GoodsApi.deleteGoodsById(props.item._id, Token);

		if(response.status === 200) {
			setGlobalAlert({
				open: true,
				variant: "warning",
				content: response.data
			});
			props.reloadTable();
		}
	}

	return(
		<>
			<tr>
				<td>
					<ButtonToolbar className="flex-nowrap">
						<PrivilegesManager privileges={0}>
							<ButtonGroup className="mr-1">
								<Button size="sm" variant="success" onClick={()=>setOpenAddModal(true)}>
									<FontAwesomeIcon icon={faPlus}/>
								</Button>
							</ButtonGroup>
						</PrivilegesManager>

						<ButtonGroup className="mr-1">
							<Button size="sm" variant="warning" onClick={()=>setOpenModal(!openModal)}>
								<FontAwesomeIcon icon={faBan}/>
							</Button>
						</ButtonGroup>

						<PrivilegesManager privileges={0}>
							<ButtonGroup className="mr-1">
								<Button size="sm" variant="primary" onClick={()=>OpenItemMenu()}>
									<FontAwesomeIcon icon={faPen}/>
								</Button>
							</ButtonGroup>

							<ButtonGroup>
								<Button size="sm" variant="danger" onDoubleClick={()=>deleteItem()}>
									<FontAwesomeIcon icon={faTrashAlt}/>
								</Button>
							</ButtonGroup>
						</PrivilegesManager>
					</ButtonToolbar>
				</td>
				
				<td className="text-left">
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
					{props.item.bought} ks
				</td>
				<td>
					{props.item.sellPrice} {config.currency}
				</td>
				<td>
					{props.item.buyPrice.toFixed(2).replace('.', ',')} {config.currency}
				</td>
				<td>
					{margin.replace('.', ',')} {config.currency}
				</td>
				<td>
					{(Math.round((parseFloat(margin) / props.item.sellPrice) * 1000) / 10).toString().replace('.', ',')} %	
				</td>
			</tr>

			<Modal size="sm" centered show={openModal} backdrop="static" onHide={()=>setOpenModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						Odepsat položku
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<FormControl
						type="number"
						value={looseCount}
						onChange={e=>setLooseCOunt(Number(e.target.value))}
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={()=>LooseItem()}>
						Odepsat
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal size="sm" centered show={openAddModal} backdrop="static" onHide={()=>setOpenAddModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						Přikoupit zboží
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<GoodsAddForm item={props.item} close={setOpenAddModal} reload={props.reloadTable}/>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default GoodsListItem;