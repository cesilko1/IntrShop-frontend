import React, {useEffect, useContext, useState, useRef} from "react";
import { Container, Row, Col } from "react-bootstrap";
import TokenContext from 'contexts/TokenContext';
import SaleApi from "api/SaleApi";
import ISales from "interfaces/Sales";
import SaleItem from 'components/SaleItem/SaleItem';
import ReloadSalesContext from 'contexts/ReloadSalesContext';

const Sales: React.FC = () => {
	const [reloadSales,] = useContext(ReloadSalesContext);
	const [Token,] = useContext(TokenContext);
	const [sales, setSales] = useState<ISales[]>([]);
	const lastDate = useRef<number>(0);

	useEffect(()=>{
		LoadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reloadSales]);


	const LoadData = async () => {
		lastDate.current = 0;
		const response = await SaleApi.getSales(Token);
		if(response.status === 200) setSales(response.data.reverse());
		else setSales([]);
	}

	return(
		<Container>
			<Row>
				<Col>
					<h2>
						Prodeje
					</h2>
				</Col>
			</Row>

			<Row className="justify-content-md-center">
				<Col md={7} xl={5}>
					{
						sales.map((item: ISales, key: number) => {
							if(!item.date || !item.price) return(<SaleItem item={item} key={key}/>);

							const date = new Date(item.date);
							
							
							if(lastDate.current !== date.getDate()) {
								lastDate.current = date.getDate();

								return(
									<div key={key}>
										<Row className="mt-4">
											<Col className="ml-3">
												<b>{date.getDate()}. {date.getMonth()}. {date.getFullYear()}</b>
											</Col>
										</Row>
										
										<SaleItem item={item}/>
									</div>
								);
							}
							
							return(
								<SaleItem item={item} key={key}/>
							);
						})
					}
				</Col>
			</Row>
		</Container>
	)
}

export default Sales;