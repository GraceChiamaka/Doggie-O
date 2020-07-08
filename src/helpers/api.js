import axios from "axios";

export const baseURL = "https://dog.ceo/api/";

export const makeApiCall = (axiosConfigObj) => {
	const config = {
		...axiosConfigObj,
		baseURL,
	};
	return new Promise((resolve, reject) => {
		return axios(config)
			.then(({ data }) => {
				if (data.status !== "success") return reject(data);
				return resolve(data);
			})
			.catch((err) => {
				const { response, request, message } = err;
				const error = response
					? response.data
					: request
					? "Network error, please try again later"
					: message;
				return reject(error);
			});
	});
};

export const getBreedAPI = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const breeds = await makeApiCall({
				url: "breeds/list/all",
				method: "get",
			});
			return resolve(breeds);
		} catch (error) {
			return reject(error);
		}
	});
};

export const getBreedDetailAPI = (breed) => {
	return new Promise(async (resolve, reject) => {
		try {
			const breedDetail = await makeApiCall({
				url: `breed/${breed}/images/random`,
				method: "get",
			});
			return resolve(breedDetail);
		} catch (error) {
			return reject(error);
		}
	});
};
