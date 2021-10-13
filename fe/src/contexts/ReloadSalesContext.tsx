import {useState, createContext} from 'react';

export const ReloadSalesContext = createContext<any | null>(null);


export const ReloadSalesProvider = (props: any) => {
	const [reloadSales, setReloadSales] = useState<boolean>(false);

	return(
		<ReloadSalesContext.Provider value={[reloadSales, setReloadSales]}>
			{props.children}
		</ReloadSalesContext.Provider>
	);
}

export default ReloadSalesContext;