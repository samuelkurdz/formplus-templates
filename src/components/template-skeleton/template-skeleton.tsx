import React from 'react';


export const TemplateCardSkeleton: React.FC = () => {
	let holderLength = [1,2,3,4,5,6];
  return (
		<div className="flex flex-wrap justify-between gap-y-8 mt-12">
		{
			holderLength.map((value) => {
				return (
					<div key={value} className="border border-blue-300 shadow rounded-sm p-4 w-full sm:w-72 mx-auto card">
						<div className="animate-pulse flex space-x-4">
							<div className="rounded-full bg-blue-400 h-12 w-12"></div>
							<div className="flex-1 space-y-3 py-1">
							<div className="h-4 bg-blue-400 rounded w-3/4"></div>
							<div className="space-y-4">
								<div className="h-4 bg-blue-400 rounded"></div>
								<div className="h-4 bg-blue-400 rounded"></div>
							</div>
							</div>
						</div>
					</div>
				)
			})
		}
		</div>
  )
}
