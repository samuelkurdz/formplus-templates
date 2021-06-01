// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useAppSelector } from '../../app-store/hooks';
import { selectPages } from '../../features/template-finder/template-finderSlice';

const Paginator: React.FC = () => {
	const PagesNumber = useAppSelector(selectPages);
	return (
		<div className="flex justify-between items-center text-xs mt-9">
			<div className="flex cursor-pointer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
				<span>Prev</span>
			</div>
			<div>
				<input className="w-16" max={PagesNumber} type="number" name="pageNumber" id="pageNumber" />
				<span className="ml-2">of {PagesNumber}</span>
			</div>
			<div className="flex cursor-pointer">
				<span>Next</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
				</svg>
			</div>
		</div>
	);
};

export default Paginator;
