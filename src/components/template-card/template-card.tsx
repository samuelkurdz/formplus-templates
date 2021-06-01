// eslint-disable-next-line no-use-before-define
import React from 'react';
import './template-card.css';

import { Template } from '../../models/template.interface';

/**
 * @param name
 * name of template
 * @param description
 * @param link
 *
 */

const TemplateCard: React.FC<Template> = ({ name, description, link }) => {
	return (
		<div className="card shadow w-full sm:w-72 h-48 relative rounded-sm pt-3">
			<div className="body px-5">
				<h2 className="text-2xl font-medium capitalize">{name}</h2>
				<p className="text-sm mt-5">{description}</p>
			</div>
			<footer className="py-2 px-5 bg-gray-50 text-green-500 font-normal w-full absolute bottom-0">
				<a
					href={link}
					target="_blank"
					rel="noreferrer"
					className="cursor-pointer hover:text-green-600 hover:font-medium duration-75"
				>
					Use Template
				</a>
			</footer>
		</div>
	);
};

export default TemplateCard;
