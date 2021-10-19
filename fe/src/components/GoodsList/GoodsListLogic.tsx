import { useContext, useState, useEffect } from "react";
import TokenContext from "contexts/TokenContext";
import GoodsApi from "api/GoodsApi";
import IGoods from "interfaces/Goods";

const GoodsListLogic = () => {
	const [token,] = useContext(TokenContext);
	const [goods, setGoods] = useState<IGoods[]>([]);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [searchBy, setSearchBy] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(()=>{
		LoadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const LoadData = async () => {
		setLoading(true);
		const response = await GoodsApi.getGoods(token);
		setLoading(false);
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

	return {goods, openModal, searchBy, loading, OpenModal, ReverseData, HandleSearch, LoadData, setOpenModal}
}

export default GoodsListLogic;