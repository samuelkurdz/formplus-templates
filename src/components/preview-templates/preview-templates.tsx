// eslint-disable-next-line no-use-before-define
import React from 'react';
import './preview-templates.css';

import { useAppSelector } from '../../app-store/hooks';

import TemplateCard from '../template-card/template-card';
import {
	selectLengthOfTemplates,
	selectQueryData,
	selectTemplatesPerPage,
} from '../../features/template-finder/template-finderSlice';
import Paginator from '../paginator/paginator';

const TemplatePreview = () => {
	const templates = useAppSelector(selectTemplatesPerPage);
	const query = useAppSelector(selectQueryData);
	const totalNumOfTemplates = useAppSelector(selectLengthOfTemplates);
	return (
		<div className="mt-12">
			<div className="flex justify-between content-center">
				<p>{query.category === 'default' ? 'All' : query.category} Templates</p>
				<p className="text-xs text-gray-400">{totalNumOfTemplates.toLocaleString('en-US')} templates</p>
			</div>
			<div
				className={`flex flex-wrap gap-y-8 lg:gap-y-16 mt-3 ${templates.length ? 'justify-between' : 'justify-center'}`}
			>
				{templates.length ? (
					templates.map((template) => {
						// eslint-disable-next-line react/no-array-index-key
						return <TemplateCard key={template.name} {...template} />;
					})
				) : (
					<p className="font-semibold text-lg">No template matches this filter or page query</p>
				)}
			</div>
			<Paginator />
		</div>
	);
};

export default TemplatePreview;
