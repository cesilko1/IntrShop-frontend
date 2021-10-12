import React, {useEffect, useContext, useState, useRef} from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import TokenContext from 'contexts/TokenContext';
import SaleApi from "api/SaleApi";
import ISales from "interfaces/Sales";
import SaleItem from 'components/SaleItem/SaleItem';

const Sales: React.FC = () => {
	const [Token,] = useContext(TokenContext);
	const [sales, setSales] = useState<ISales[]>([]);
	const lastDate = useRef<Number>(0);

	useEffect(()=>{
		LoadData();
	}, []);


	const LoadData = async () => {
		const response = await SaleApi.getSales(Token);
		setSales(response.data.reverse());
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

			<Row>
				<Col>
					{
						sales.map((item: ISales, key: number) => {
							if(!item.date) return(<SaleItem item={item} key={key}/>);
							const date = new Date(item.date)

							if(lastDate.current !== date.getDay()) {
								lastDate.current = date.getDay();

								return(
									<>
										<h6 className="ml-3 mt-5"><b>{date.getDay()}. {date.getMonth()}. {date.getFullYear()}</b></h6>
										<SaleItem item={item} key={key}/>
									</>
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