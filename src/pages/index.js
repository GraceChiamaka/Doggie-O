import React from "react";
import Layout from "../components/common/Layout";
import HomepageContent from "../components/screens/Home";
const HomePage = () => {
	return (
		<Layout>
			<div className="container">
				<HomepageContent />
			</div>
		</Layout>
	);
};

export default HomePage;
