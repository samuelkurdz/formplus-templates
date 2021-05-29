// eslint-disable-next-line no-use-before-define
import React from 'react';
import './error.css';

const ErrorPage = () => {
	return (
		<div className="text-center space-y-4 mt-16">
			<p className="text-6xl uppercase font-semibold">Error Occured</p>
			<p className="text-gray-500 text-base">Something went wrong while trying to fetch templates.</p>
		</div>
	);
};

export default ErrorPage;
