// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useAppSelector } from './app-store/hooks';
import './App.css';
import Loader from './components/loader/loader';

import TemplateFinder from './features/template-finder/template-finder';
import { selectIsProcessingQuery } from './features/template-finder/template-finderSlice';

function App() {
	const isProcessingQuery = useAppSelector(selectIsProcessingQuery);
	return (
		<div className="App relative">
			<TemplateFinder />
			{isProcessingQuery ? <Loader /> : ''}
		</div>
	);
}

export default App;
