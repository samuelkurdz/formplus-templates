// eslint-disable-next-line no-use-before-define
import React from 'react';
import './alert.css';

interface AlertProps {
	message: string;
	type: 'danger' | 'success' | 'info' | 'warning' | 'generic';
	dismissable?: boolean;
}

const Alert: React.FunctionComponent<AlertProps> = (props) => {
	// eslint-disable-next-line no-undef
	let returnedComponent: JSX.Element;
	switch (props.type) {
		case 'warning':
			returnedComponent = (
				<div className="bg-yellow-100 alert-wrapper">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-yellow-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p>{props.message}</p>
					{/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
				</svg> */}
				</div>
			);
			break;
		case 'info':
			returnedComponent = (
				<div className="bg-blue-100 alert-wrapper">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-blue-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p>{props.message}</p>
				</div>
			);
			break;
		case 'danger':
			returnedComponent = (
				<div className="bg-red-100 alert-wrapper">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							// eslint-disable-next-line prettier/prettier
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p>{props.message}</p>
				</div>
			);
			break;
		case 'success':
			returnedComponent = (
				<div className="bg-green-100 alert-wrapper">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-green-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p>{props.message}</p>
				</div>
			);
			break;
		default:
			returnedComponent = (
				<div className="bg-gray-200 alert-wrapper">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-black"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p>{props.message}</p>
				</div>
			);
			break;
	}
	return returnedComponent;
};

export default Alert;
