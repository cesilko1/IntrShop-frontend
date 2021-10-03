import React, {useState, createContext} from 'react';

export const TokenContext = createContext<any | null>(null);


export const TokenProvider = (props: any) => {
	const [token, setToken] = useState<string | undefined>();

	return(
		<TokenContext.Provider value={[token, setToken]}>
			{props.children}
		</TokenContext.Provider>
	);
}

export default TokenContext;