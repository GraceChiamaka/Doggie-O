import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { HeartFilled } from "@ant-design/icons";
import "./style.css";

const HomepageContent = () => {
	return (
		<div className="homepage__content">
			<Row justify="center">
				<Col lg={18}>
					<h1>
						WE <HeartFilled style={{ color: "#ef0d33" }} /> DOGS <br /> @ <br />{" "}
						THE DOGGIE GALLERY
					</h1>
					<Link to="/explore" className="explore__btn pulse">
						EXPLORE
					</Link>
				</Col>
			</Row>
		</div>
	);
};

export default HomepageContent;
