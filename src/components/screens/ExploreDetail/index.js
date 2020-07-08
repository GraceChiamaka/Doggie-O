import React, { useState, useEffect } from "react";
// import { getBreedDetailAPI } from "../../../helpers/api";
import { Row, Col, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { matchPath } from "react-router";
import { Link } from "react-router-dom";
import Backdrop from "./Backdrop";
import "./style.css";

const ExploreDetailContent = ({ className }) => {
	const [breedName, setBreedName] = useState(null);
	const [breedURL, setBreedURL] = useState(null);
	const [loading, setLoading] = useState(false);
	const { pathname } = window.location;

	useEffect(() => {
		getMatch();
	}, []);
	useEffect(() => {
		if (breedName !== "") {
			getBreedDetail();
		}
	}, [breedName]);
	const getMatch = () => {
		const matchLong = matchPath(pathname, {
			path: "/explore/:breed/:name",
			exact: false,
			strict: false,
		});
		const matchShort = matchPath(pathname, {
			path: "/explore/:breed",
			exact: false,
			strict: false,
		});

		if (matchShort !== null) {
			setBreedName(`${matchShort.params.breed}`);
		}
		if (matchLong !== null) {
			setBreedName(`${matchLong.params.breed} ${matchLong.params.name}`);
		}
	};

	const getBreedDetail = () => {
		setLoading(true);
		const URL = localStorage.getItem(breedName);

		if (URL !== "") {
			setBreedURL(URL);
			setLoading(false);
		} else {
			message.error("Unable to fetch data");
			setLoading(false);
		}
	};

	const displayDetails = () => {
		if (breedURL !== null) {
			console.log(breedName);
			return <Backdrop imgURL={breedURL} />;
		} else {
			return (
				<div className="loader">
					<LoadingOutlined style={{ fontSize: "2rem" }} spin />
				</div>
			);
		}
	};
	// console.log(breedName);
	return (
		<div className="explore__detail">
			{loading ? (
				<div className="loader">
					<LoadingOutlined style={{ fontSize: "2rem" }} spin />
				</div>
			) : (
				<Row>
						<Col xs={{ span: 24, order: 2 }} md={{ order: 1, span: 14 }} lg={16}>
							<div className="backdrop__container">
								{displayDetails()}
							</div>
						
					</Col>
					<Col xs={{ span: 24, order: 1 }} md={{ span: 10, order: 2 }} lg={8}>
						<>
							<Link to="/explore" className="return__link">
								<ArrowLeftOutlined />
							</Link>
							<div className="detail__content">
								<h3>
									{" "}
									THE <br /> {breedName} <br /> DOG
								</h3>
							</div>
						</>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default ExploreDetailContent;
