import React from "react";
import styled from "styled-components";

const generateBackgroundImg = (cardImg) => {
	if (cardImg) {
		return `background-image: url(${cardImg}); background-repeat: no-repeat; height: calc(100vh - 85px); width: 100%; background-size: cover; background-position: center`;
	}
};
const Backdrop = ({ className, imgURL }) => {
	return <div className={className}></div>;
};

export default styled(Backdrop)`
	${(props) => generateBackgroundImg(props.imgURL)};
	@media screen and (max-width: 575px) {
		background-size: contain;
	}
`;
