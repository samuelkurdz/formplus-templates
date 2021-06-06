// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import './search-filter.css';

import { useAppSelector, useAppDispatch } from '../../app-store/hooks';
import { queryResolver, selectQueryData } from '../../features/template-finder/template-finderSlice';
import { QueryObject } from '../../models/template.interface';

const SearchFilter = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [categoryQuery, setCategoryQuery] = useState('');
	const [dateQuery, setDateQuery] = useState('');
	const [orderQuery, setOrderQuery] = useState('');

	const dispatch = useAppDispatch();
	const query = useAppSelector(selectQueryData);

	const delayedQuery = useCallback(
		debounce((updatedQuery: QueryObject) => {
			dispatch(queryResolver(updatedQuery));
		}, 1000),
		[],
	);

	const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		switch (event.target.name) {
			case 'category':
				setCategoryQuery(event.target.value);
				break;
			case 'order':
				setOrderQuery(event.target.value);
				break;
			default:
				setDateQuery(event.target.value);
				break;
		}
		const updatedQuery: QueryObject = { ...query, [event.target.name]: event.target.value };
		delayedQuery(updatedQuery);
	};

	// const onOrderSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
	// 	event.preventDefault();
	// 	const updatedQuery: QueryObject = { ...query, order: event.target.value };
	// 	dispatch(queryResolver(updatedQuery));
	// };
	// const onCategorySelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
	// 	event.preventDefault();
	// 	const updatedQuery: QueryObject = { ...query, category: event.target.value };
	// 	dispatch(queryResolver(updatedQuery));
	// };
	// const onDateSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
	// 	event.preventDefault();
	// 	const updatedQuery: QueryObject = { ...query, date: event.target.value };
	// 	dispatch(queryResolver(updatedQuery));
	// };

	const getSearchNameQuery = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setSearchQuery(event.target.value);
		const updatedQuery: QueryObject = { ...query, searchText: event.target.value };
		delayedQuery(updatedQuery);
		// dispatch(queryResolver(updatedQuery));
	};

	return (
		<>
			<form className="flex flex-col sm:flex-row justify-between content-center mb-10">
				<div className="form-group mb-5 sm:mb-0 relative">
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Search Templates"
						value={searchQuery}
						onChange={getSearchNameQuery}
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 absolute top-2 right-2 text-gray-400 backdrop-filter backdrop-blur-lg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<section className="flex flex-col sm:flex-row justify-around space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
					<p className="my-auto text-gray-400 text-xs">Sort By:</p>
					<div className="form-group">
						<label htmlFor="category">
							<p>Category</p>
							<select name="category" id="category" value={categoryQuery} onChange={onSelectChange}>
								<option value="default">All</option>
								<option value="Education">Education</option>
								<option value="E-commerce">E-commerce</option>
								<option value="Health">Health</option>
							</select>
						</label>
					</div>
					<div className="form-group">
						<label htmlFor="order">
							<p>Order</p>
							<select name="order" id="order" value={orderQuery} onChange={onSelectChange}>
								<option value="default">Default</option>
								<option value="ascending">Ascending</option>
								<option value="descending">Descending</option>
							</select>
						</label>
					</div>
					<div className="form-group">
						<label htmlFor="date">
							<p>Date</p>
							<select name="date" id="date" value={dateQuery} onChange={onSelectChange}>
								<option value="default">Default</option>
								<option value="ascending">Ascending</option>
								<option value="descending">Descending</option>
							</select>
						</label>
					</div>
				</section>
			</form>
		</>
	);
};

export default SearchFilter;
