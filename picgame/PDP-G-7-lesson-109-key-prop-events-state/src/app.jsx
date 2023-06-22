import React from "react";
import GameComponent from "./components/game";
import "./main.scss";
class App extends React.Component {

	render() {
		return (
			<div className="container-big">
				<GameComponent />
			</div>
		);
	}
}

export default App;

