import React from "react";
import {render} from "react-dom";

function App(props) {
        return(<h1>{props.name}</h1>);
}

const appDiv = document.getElementById('app');
render(<App name="Darren"/>, appDiv);

export default App;