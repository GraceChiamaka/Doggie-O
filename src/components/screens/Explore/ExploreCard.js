import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { getBreedDetailAPI } from "../../../helpers/api";
import "./style.css";

const ExploreCard = ({ breedName }) => {
	const [breedURL, setBreedURL] = useState("");
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (breedName) {
			getBreedImage();
		}
	}, [breedName]);
	const getBreedImage = () => {
		const breed = breedName.split(" ").join("/");
		setLoading(true);
		getBreedDetailAPI(breed)
			.then((res) => {
				setBreedURL(res.message);
				localStorage.setItem(breedName, res.message);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(true);
			});
	};
	const breed = breedName.split(" ").join("/");
	return (
		<div className="explore__card">
			<Link to={`/explore/${breed}`}>
				{loading ? <LoadingOutlined spin /> : <img src={breedURL} alt="" />}
			</Link>

			<div className="body">
				<h3>{breedName}</h3>
			</div>
		</div>
	);
};

export default ExploreCard;
