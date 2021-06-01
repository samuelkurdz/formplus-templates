// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app-store/hooks';
import { selectActivePage, selectPages, updateActivePage } from '../../features/template-finder/template-finderSlice';

const Paginator: React.FC = () => {
	const dispatch = useAppDispatch();
	const PagesNumber = useAppSelector(selectPages);
	const currentPage = useAppSelector(selectActivePage);

	const processCurrentPageChange = (event: ChangeEvent<HTMLInputElement>) => {
		// eslint-disable-next-line no-console
		console.log(+event.target.value);
		dispatch(updateActivePage(+event.target.value));
	};

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
				<input
					className="w-16 py-2 px-1.5"
					value={currentPage}
					onChange={processCurrentPageChange}
					max={PagesNumber}
					type="number"
					name="pageNumber"
					id="pageNumber"
				/>
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
