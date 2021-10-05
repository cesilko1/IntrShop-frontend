export default interface IGlobalAlert {
	open: boolean;
	variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	content: string;
}