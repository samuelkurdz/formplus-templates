import { useEffect } from 'react';
import './template-finder.css';
import { useAppDispatch, useAppSelector } from '../../app-store/hooks';
import Alert from '../../components/alert/alert';
import TemplatePreview from '../../components/preview-templates/preview-templates';
import SearchFilter from '../../components/search-filter-bar/search-filter';
import { selectState, getTemplatesAsync } from './template-finderSlice';
import { TemplateCardSkeleton } from '../../components/template-skeleton/template-skeleton';


const TemplateFinder = () => {
	const dispatch = useAppDispatch();
	const loadingStatus = useAppSelector(selectState);
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		dispatch(getTemplatesAsync());
	};
	const message = 'Tada! Get started with a free template. Can’t find what you are looking for? Search from the 1000+ available templates';
	return (
		<div className="my-6 px-4 sm:px-8 md:px-14 lg:px-16">
			<SearchFilter />
			<Alert message={message} type="warning"/>
			{
				loadingStatus === 'idle' ? <TemplatePreview /> : <TemplateCardSkeleton />
			}
			{/* <TemplatePreview /> */}
		</div>
	)
}


export default TemplateFinder;