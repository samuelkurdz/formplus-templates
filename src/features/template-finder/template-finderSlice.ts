/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app-store/store';
import { QueryObject, Template } from '../../models/template.interface';

export interface TemplateState {
	templates: Template[];
	pages: number;
	activePage: number;
	status: 'loading' | 'idle' | 'failed';
	queryResultTemplates?: Template[];
	query: QueryObject;
}

const initialState: TemplateState = {
	templates: [],
	status: 'loading',
	pages: 1,
	activePage: 1,
	query: {
		searchText: '',
		category: 'default',
		date: 'default',
		order: 'default',
	},
	queryResultTemplates: [],
};

// Async code can be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getTemplatesAsync = createAsyncThunk('template/fetchTemplates', async () => {
	const response = await fetch('https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates');
	const templates = await response.json();
	// The value we return becomes the `fulfilled` action payload
	return templates;
});

// state slice
export const templateSlice = createSlice({
	name: 'template',
	initialState,
	// actions
	reducers: {
		setTemplates: (state, action: PayloadAction<Template[]>) => {
			state.templates = action.payload;
		},
		setQueryResultTemplates: (state, action: PayloadAction<Template[]>) => {
			state.queryResultTemplates = action.payload;
		},
		setQueryToStore: (state, action: PayloadAction<QueryObject>) => {
			state.query = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTemplatesAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getTemplatesAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				// if (action.payload) {
				// 	state.pages = Math.round((action.payload.length / 30));
				// }
				state.pages = Math.round(action.payload.length / 30);
				state.templates = action.payload;
			})
			.addCase(getTemplatesAsync.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const { setTemplates, setQueryResultTemplates, setQueryToStore } = templateSlice.actions;

// selectors
export const selectAllTemplates = (state: RootState) => state.template.templates;
export const selectTemplatesPerPage = (state: RootState) => state.template.templates.slice(0, 30);
export const selectLengthOfTemplates = (state: RootState) => state.template.templates.length;
export const selectState = (state: RootState) => state.template.status;
export const selectPages = (state: RootState) => state.template.pages;
export const selectActivePage = (state: RootState) => state.template.activePage;
export const selectQueryData = (state: RootState) => state.template.query;
export const selectQueryResultTemplates = (state: RootState) => state.template.queryResultTemplates;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const queryResolver =
	(query: QueryObject): AppThunk =>
	async (dispatch, getState) => {
		const storedQuery = selectQueryData(getState());
		const totalTemplates = selectAllTemplates(getState());
		if (query !== storedQuery) {
			query = { ...query, searchText: query.searchText?.trimLeft() };
			dispatch(setQueryToStore(query));

			let sortedTemplates: Template[] = [];
			if (query.category !== 'default') {
				sortedTemplates = totalTemplates.filter((template) => template.category.includes(query.category));
			} else {
				sortedTemplates = totalTemplates;
			}

			// if (query.order !== 'default' && query.order === 'ascending') {
			// 	sortedTemplates.sort((a,b) => {
			// 		let nameA = a.name.toLowerCase();
			// 		let nameB = b.name.toLowerCase();
			// 		if(nameA < nameB) { return -1; }
			// 		if(nameA > nameB) { return 1; }
			// 		return 0;
			// 	});
			// }
			dispatch(setQueryResultTemplates(sortedTemplates));
		}
	};

export default templateSlice.reducer;
