export interface Template {
	name: string;
	link: string;
	created: string;
	category: string[];
	description: string;
}
export interface QueryObject {
	searchText: string;
	category: string;
	order: string;
	date: string;
}
