// import { useState } from 'react';
import './preview-templates.css';

import { useAppSelector } from '../../app-store/hooks';

import { TemplateCard } from '../template-card/template-card';
import { selectNumberOfTemplates, selectPages, selectTemplates } from '../../features/template-finder/template-finderSlice';

const TemplatePreview = () => {
	// let [templates, setTemplates] = useState<Template[]>([]);
	let templates = useAppSelector(selectTemplates);
	let noOfTemplates = useAppSelector(selectNumberOfTemplates);
	let PagesNumber = useAppSelector(selectPages);
	return (
		<div className="mt-12">
			<div className="flex justify-between content-center">
				<p>All Templates</p>
				<p className="text-xs text-gray-400">{noOfTemplates.toLocaleString('en-US')} templates</p>
			</div>
			<div className="flex flex-wrap justify-between gap-y-8 mt-3">
				{
					templates.map((template, index) => {					
						return <TemplateCard key={index} {...template} />
					})
				}
			</div>
			<div className="paginator flex justify-between content-center text-xs">
				<p className="my-auto">Prev</p>
				<div>
					<input type="text" name="pageNumber" id="pageNumber" />
					 <span className="ml-2">of {PagesNumber}</span>
				</div>
				<p className="my-auto">Next</p>

			</div>
		</div>
	)
}


export default TemplatePreview;