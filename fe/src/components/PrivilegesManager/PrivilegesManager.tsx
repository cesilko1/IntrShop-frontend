import React, {useContext} from "react";
import UserContext from "contexts/UserContext";

interface IProps {
	privileges: number;
	children: any;
}

const PrivilegesManager: React.FC<IProps> = (props: IProps) => {
	const [user] = useContext(UserContext);

	return(
		<>
			{(user.privileges <= props.privileges) ? props.children : <></>}
		</>
	);
}

export default PrivilegesManager;