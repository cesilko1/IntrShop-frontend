import {useState, createContext} from 'react';
import IGlobalAlert from 'interfaces/GlobalAlert';


export const GlobalAlertContext = createContext<any | null>(null);

export const GlobalAlertProvider = (props: any) => {
	const [globalAlert, setGlobalAlert] = useState<IGlobalAlert>({
		open: false,
		variant: 'primary',
		content: ""
	});

	return(
		<GlobalAlertContext.Provider value={[globalAlert, setGlobalAlert]}>
			{props.children}
		</GlobalAlertContext.Provider>
	);
}

export default GlobalAlertContext;