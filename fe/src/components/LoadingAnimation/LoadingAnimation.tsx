import React from "react";
import scss from './LoadingAnimation.module.scss';

interface IProps extends React.PropsWithChildren<any>{
	loading?: boolean;
	size?: string;
}

const LoadingAnimation: React.FC<IProps> = (props: IProps) => {

	if(props.loading === true) return(
		<div className={scss.wrapper}>
			<div className={scss.skCubeGrid} style={{width: props.size, height: props.size}}>
				<div className={scss.skCube+" "+scss.skCube1}></div>
				<div className={scss.skCube+" "+scss.skCube2}></div>
				<div className={scss.skCube+" "+scss.skCube3}></div>
				<div className={scss.skCube+" "+scss.skCube4}></div>
				<div className={scss.skCube+" "+scss.skCube5}></div>
				<div className={scss.skCube+" "+scss.skCube6}></div>
				<div className={scss.skCube+" "+scss.skCube7}></div>
				<div className={scss.skCube+" "+scss.skCube8}></div>
				<div className={scss.skCube+" "+scss.skCube9}></div>
			</div>
		</div>
	);

	return(
		<>
			{props.children}
		</>
	);
}

export default LoadingAnimation;