import React, { useState, useEffect } from "react";
import { Row, Col, message, Input } from "antd";
import { LoadingOutlined, AudioOutlined } from "@ant-design/icons";
import { getBreedAPI } from "../../../helpers/api";

import ExploreCard from "./ExploreCard";
import "./style.css";

const { Search } = Input;

const ExploreContent = () => {
	const [result, setResult] = useState(null);
	const [breeds, setBreeds] = useState(null);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		getDogsList();
	}, []);
	useEffect(() => {
		getContent();
	}, [result]);


	// FETCH LIST OF BREEDS
	const getDogsList = () => {
		setLoading(true);
		getBreedAPI()
			.then((res) => {
				setResult(res);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				message.error(error);
				setLoading(false);
			});
	};

	// GETS LIST OF BREEDS
	const getContent = () => {
		const dogBreed = [];
		if (result !== null) {
			for (let item in result.message) {
				dogBreed.push(item);
				// CHECKS IF ITEMS CONTAINS SUB BREED
				if (result.message[item].length > 0) {
					const subBreed = getChildBreed(item, result.message[item])[0];
					dogBreed.push(subBreed);
				}
			}
		} else {
			return (
				<div className="loader">
					<LoadingOutlined spin />
				</div>
			);
		}
		
		setBreeds(dogBreed);
	};

	// GETS SUB BREED VALUES
	const getChildBreed = (item, arr) => {
		return arr.map((breedX) => `${item} ${breedX}`);
	};

	const handleSearch = (ev) => {
		setSearch(ev.target.value);
	};

	// DISPLAY BREEDS
	const displayContent = () => {
		const newSearch = search.toLowerCase();
		if (breeds !== null) {
			const filteredBreeds = breeds.filter((name) => {
				return name.indexOf(newSearch) !== -1;
			});
			return filteredBreeds.map((name) => {
				return (
					<Col xs={24} md={12} lg={6} key={name}>
						<ExploreCard breedName={name} />
					</Col>
				);
			});
		} else {
			return (
				<div className="loader">
					<LoadingOutlined spin />
				</div>
			);
		}
	};

	return (
		<div className="explore__content">
			<Row justify="end">
				<Col lg={12}>
					<Search
						placeholder="Search for breed"
						onChange={handleSearch}
						style={{ width: "100% ", marginBottom: "2rem" }}
					/>
				</Col>
			</Row>
			<Row gutter={1}>
				{loading ? (
					<div className="loader">
						<LoadingOutlined spin />
					</div>
				) : (
					displayContent()
				)}
			</Row>
		</div>
	);
};

export default ExploreContent;
