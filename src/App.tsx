// eslint-disable-next-line no-use-before-define
import React from 'react';
import './App.css';
// import Loader from './components/loader/loader';

import TemplateFinder from './features/template-finder/template-finder';

function App() {
	return (
		<div className="App">
			<TemplateFinder />
			{/* <Loader /> */}
		</div>
	);
}

export default App;
