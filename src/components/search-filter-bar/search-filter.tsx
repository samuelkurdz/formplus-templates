import React, { ChangeEvent, useEffect } from 'react';
import './search-filter.css';


const SearchFilter = () => {
	const onOrderSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		console.log(event);
		console.log(event.target.value);
	}

	return (
		<>
			<form className="flex flex-col sm:flex-row justify-between content-center mb-10">
				<div className="form-group mb-5 sm:mb-0 relative">
					<input type="text" name="name" id="name" placeholder="Search Templates" />
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-2 right-2 text-gray-400 backdrop-filter backdrop-blur-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
				<section className="flex flex-col sm:flex-row justify-around space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
					<p className="my-auto text-gray-400 text-xs">Sort By:</p>
					<div className="form-group">
						<label htmlFor="category">Category</label>
						<select name="category" id="category" defaultValue="">
							<option value="">All</option>
							<option value="agriculture">Agriculture</option>
							<option value="education">Education</option>
							<option value="ecommerce">E-commerce</option>
							<option value="health">Health</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="order">Order</label>
						<select name="order" id="order" defaultValue="" onChange={onOrderSelectChange}>
							<option value="">Default</option>
							<option value="ascending">Ascending</option>
							<option value="descending">Descending</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="date">Date</label>
						<select name="date" id="date" defaultValue="">
							<option value="">Default</option>
							<option value="ascending">Ascending</option>
							<option value="descending">Descending</option>
						</select>
					</div>
				</section>
      		</form>
		</>
	)
}

export default SearchFilter;