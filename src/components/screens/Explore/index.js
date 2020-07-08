import React, { useState, useEffect } from "react";
import { Row, Col, message, Pagination, Input } from "antd";
import { LoadingOutlined, AudioOutlined } from "@ant-design/icons";
import { getBreedAPI } from "../../../helpers/api";
import ExploreCard from "./ExploreCard";
import "./style.css";

const { Search } = Input;

const postPerPage = 10;

const ExploreContent = () => {
	const [result, setResult] = useState(null);
	const [breeds, setBreeds] = useState(null);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [totalBreeds, setTotalBreeds] = useState(0);

	useEffect(() => {
		getDogsList();
	}, []);
	useEffect(() => {
		getContent();
	}, [result]);
	useEffect(() => {
		displayContent(currentItems);
	}, [currentPage]);

	const suffix = (
		<AudioOutlined
			style={{
				fontSize: 16,
				color: "#1890ff",
			}}
		/>
	);

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
		setTotalBreeds(dogBreed.length);
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
	const displayContent = (items) => {
		const newSearch = search.toLowerCase();
		if (items !== null) {
			const filteredBreeds = items.filter((name) => {
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

	const indexOfLastItem = currentPage * postPerPage;
	const indexOfFirstItem = indexOfLastItem - postPerPage;
	const currentItems =
		breeds &&
		breeds !== null &&
		breeds.slice(indexOfFirstItem, indexOfLastItem);

	const changePagination = (page, pageNumber) => {
		setCurrentPage(page);
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
			<Row gutter={12}>
				{loading ? (
					<div className="loader">
						<LoadingOutlined spin />
					</div>
				) : (
					displayContent(currentItems)
				)}
				<Col lg={24} className="paginator">
					<Pagination
						defaultCurrent={1}
						total={totalBreeds}
						onChange={changePagination}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default ExploreContent;
