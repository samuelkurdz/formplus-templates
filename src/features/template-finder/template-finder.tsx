// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react';
import './template-finder.css';

import { useAppDispatch, useAppSelector } from '../../app-store/hooks';
import { selectState, getTemplatesAsync } from './template-finderSlice';

import TemplateCardSkeleton from '../../components/template-skeleton/template-skeleton';
import Alert from '../../components/alert/alert';
import TemplatePreview from '../../components/preview-templates/preview-templates';
import SearchFilter from '../../components/search-filter-bar/search-filter';
import ErrorPage from '../../components/error-component/error';

const TemplateFinder = () => {
	const dispatch = useAppDispatch();
	const loadingStatus = useAppSelector(selectState);
	// eslint-disable-next-line no-undef
	let returnedComponent: JSX.Element;

	const fetchData = () => {
		dispatch(getTemplatesAsync());
	};
	useEffect(() => {
		fetchData();
	}, []);

	switch (loadingStatus) {
		case 'idle':
			returnedComponent = <TemplatePreview />;
			break;
		case 'failed':
			returnedComponent = <ErrorPage />;
			break;
		default:
			returnedComponent = <TemplateCardSkeleton />;
			break;
	}

	const message =
		'Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates';
	return (
		<div className="my-6 px-4 sm:px-8 md:px-14 lg:px-40">
			<SearchFilter />
			<Alert message={message} type="warning" />
			{returnedComponent}
		</div>
	);
};

export default TemplateFinder;
