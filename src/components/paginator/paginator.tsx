// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../../app-store/hooks';
import { selectActivePage, selectPages, updateActivePage } from '../../features/template-finder/template-finderSlice';

const Paginator: React.FC = () => {
	const dispatch = useAppDispatch();
	const PagesNumber = useAppSelector(selectPages);

	const currentPage = useAppSelector(selectActivePage);

	const delayedQuery = useCallback(
		debounce((updatedPageQuery: number) => {
			dispatch(updateActivePage(updatedPageQuery));
		}, 500),
		[],
	);

	const handlePrevPage = () => {
		const newPageQuery = currentPage - 1;
		if (newPageQuery === 0) {
			// eslint-disable-next-line no-alert
			alert('No Zeroth Page');
			return;
		}
		dispatch(updateActivePage(newPageQuery));
	};

	const handleNextPage = () => {
		const newPageQuery = currentPage + 1;
		if (newPageQuery > PagesNumber) {
			// eslint-disable-next-line no-alert
			alert('No Page Higher than this Page');
			return;
		}
		dispatch(updateActivePage(newPageQuery));
	};
	const processCurrentPageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (+event.target.value <= 0 || +event.target.value > PagesNumber) {
			return;
		}
		delayedQuery(+event.target.value);
	};

	return (
		<div className="flex justify-between items-center text-xs mt-9">
			<div aria-hidden="true" className="flex cursor-pointer hover:text-blue-600" onClick={handlePrevPage}>
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
					min="1"
					max={PagesNumber}
					type="number"
					name="pageNumber"
					id="pageNumber"
				/>
				<span className="ml-2">of {PagesNumber}</span>
			</div>
			<div aria-hidden="true" className="flex cursor-pointer hover:text-blue-600" onClick={handleNextPage}>
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
