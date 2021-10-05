import {useState, createContext} from 'react';
import ISales from 'interfaces/Sales';

export const CreateSaleContext = createContext<any | null>(null);

export const CreateSaleProvider = (props: any) => {
	const [createSale, setCreateSale] = useState<ISales[]>();

	return(
		<CreateSaleContext.Provider value={[createSale, setCreateSale]}>
			{props.children}
		</CreateSaleContext.Provider>
	);
}

export default CreateSaleContext;