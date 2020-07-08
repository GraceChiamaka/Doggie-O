import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/index";
import ExplorePage from "../pages/explore";
import ExploreDetailPage from "../pages/explore-details";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact key="homepage" path="/" component={HomePage} />,
			<Route exact key="explore" path="/explore" component={ExplorePage} />
			<Route
				exact
				key="explore-detail"
				path="/explore/:breed/:name"
				component={ExploreDetailPage}
			/>
			<Route
				exact
				key="explore-detail"
				path="/explore/:breed/"
				component={ExploreDetailPage}
			/>
		</Switch>
	</BrowserRouter>
);

export default Routes;
