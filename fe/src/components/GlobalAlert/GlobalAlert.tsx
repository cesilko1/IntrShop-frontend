import React, {useContext} from 'react';
import { GlobalAlertContext } from 'contexts/GlobalAlertContext';
import { Alert } from 'react-bootstrap';
import IGlobalAlert from 'interfaces/GlobalAlert';
import scss from './GlobalAlert.module.scss';

const GlobalAlert: React.FC = () => {
	const [ globalAlert, setGlobalAlert ] = useContext(GlobalAlertContext);

	const handleClose = () => {
		setGlobalAlert({...setGlobalAlert, open: false});
	}

	return(
		<Alert className={scss.alert} show={globalAlert.open} variant={globalAlert.variant} dismissible onClose={handleClose}>
			{globalAlert.content}
		</Alert>
	);
}

export default GlobalAlert;