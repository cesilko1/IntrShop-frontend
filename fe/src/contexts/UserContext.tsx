import {useState, createContext} from 'react';
import IUser from 'interfaces/User';

export const UserContext = createContext<any | null>(null);


export const UserProvider = (props: any) => {
	const [user, setUser] = useState<IUser | undefined>();

	return(
		<UserContext.Provider value={[user, setUser]}>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserContext;