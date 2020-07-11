import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { getBreedDetailAPI } from "../../../helpers/api";
import "./style.css";

const ExploreCard = ({ breedName }) => {
	const [breedURL, setBreedURL] = useState("");
	const [loading, setLoading] = useState(false);
	const [height, setHeight] = useState({});
	const imgRef = useRef();
	useEffect(() => {
		if (breedName) {
			getBreedImage();
		}
	}, [breedName]);
	useEffect(() => {
		// if (loading) {
		lazyLoad();
		// }
	}, [loading]);

	useLayoutEffect(() => {
		console.log(imgRef, "img ref");
		if (imgRef.current.height < 300 || imgRef.current.height > 350) {
			setHeight({
				height: "350px",
			});
		} else if (imgRef.current.height > 400 || imgRef.current.height > 620) {
			setHeight({ height: "500px" });
		}
	}, []);

	const preLaodImage = (img) => {
		const src = img.getAttribute("data-src");
		if (!src) {
			return;
		}
		img.src = src;
	};

	const lazyLoad = () => {
		const images = document.querySelectorAll("[data-src]");
		const imgOptions = {
			threshold: 1,
			rootMargin: "0px 0px 200px 0px",
		};
		const imgObserver = new IntersectionObserver((entries, imgObserver) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				} else {
					preLaodImage(entry.target);
					imgObserver.unobserve(entry.target);
				}
			});
		}, imgOptions);
		console.log(images.length);
		images.forEach((image) => {
			imgObserver.observe(image);
		});
	};

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
				{loading ? (
					<LoadingOutlined spin />
				) : (
					<>
						<img
							data-src={breedURL}
							alt={breedName}
							ref={imgRef}
							style={height}
						/>
						<div className="overlay">
							<div className="body">
								<h3>{breedName}</h3>
							</div>
						</div>
					</>
				)}
			</Link>
		</div>
	);
};

export default ExploreCard;
