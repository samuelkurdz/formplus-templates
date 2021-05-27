// import { useState } from 'react';
import './preview-templates.css';

import { useAppSelector } from '../../app-store/hooks';

import { TemplateCard } from '../template-card/template-card';
import { selectNumberOfTemplates, selectTemplates } from '../../features/template-finder/template-finderSlice';
import { Paginator } from '../paginator/paginator';

const TemplatePreview = () => {
	// let [templates, setTemplates] = useState<Template[]>([]);
	let templates = useAppSelector(selectTemplates);
	let noOfTemplates = useAppSelector(selectNumberOfTemplates);
	return (
		<div className="mt-12">
			<div className="flex justify-between content-center">
				<p>All Templates</p>
				<p className="text-xs text-gray-400">{noOfTemplates.toLocaleString('en-US')} templates</p>
			</div>
			<div className="flex flex-wrap justify-between gap-y-8 lg:gap-y-16 mt-3">
				{
					templates.map((template, index) => {					
						return <TemplateCard key={index} {...template} />
					})
				}
			</div>
			<Paginator  />
		</div>
	)
}


export default TemplatePreview;