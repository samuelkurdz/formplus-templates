/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app-store/store';
import { QueryObject, Template } from '../../models/template.interface';

export interface TemplateState {
	templates: Template[];
	pages: number;
	activePage: number;
	status: 'loading' | 'idle' | 'failed';
	queryResultTemplates: Template[];
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
			state.pages = Math.round(action.payload.length / 30);
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

				state.pages = Math.round(action.payload.length / 30);
				state.templates = action.payload;
				// on page load, all templates are passed as query is empty
				state.queryResultTemplates = action.payload;
			})
			.addCase(getTemplatesAsync.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const { setTemplates, setQueryResultTemplates, setQueryToStore } = templateSlice.actions;

// selectors
export const selectAllTemplates = (state: RootState) => state.template.templates;

export const selectQueryResultTemplates = (state: RootState) => state.template.queryResultTemplates;
export const selectTemplatesPerPage = (state: RootState) => state.template.queryResultTemplates.slice(0, 30);
export const selectLengthOfTemplates = (state: RootState) => state.template.queryResultTemplates.length;

export const selectState = (state: RootState) => state.template.status;
export const selectPages = (state: RootState) => state.template.pages;
export const selectActivePage = (state: RootState) => state.template.activePage;
export const selectQueryData = (state: RootState) => state.template.query;

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
			dispatch(setQueryResultTemplates([]));

			let filteredTemplates: Template[] = [];
			if (query.category !== 'default') {
				filteredTemplates = totalTemplates.filter((template) => template.category.includes(query.category));
			} else {
				filteredTemplates = totalTemplates;
			}

			let orderSortedTemplates: Template[] = [];
			if (query.order !== 'default') {
				if (query.order === 'ascending') {
					orderSortedTemplates = [...filteredTemplates].sort((a, b) =>
						a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
					);
				} else {
					orderSortedTemplates = [...filteredTemplates].sort((a, b) =>
						b.name.localeCompare(a.name, 'en', { sensitivity: 'base' }),
					);
				}
			} else {
				orderSortedTemplates = filteredTemplates;
			}

			let dateSortedTemplates: Template[] = [];
			if (query.date !== 'default') {
				if (query.date === 'ascending') {
					dateSortedTemplates = [...orderSortedTemplates].sort((a, b) =>
						a.created.localeCompare(b.created, 'en', { sensitivity: 'base' }),
					);
				} else {
					dateSortedTemplates = [...orderSortedTemplates].sort((a, b) =>
						b.created.localeCompare(a.created, 'en', { sensitivity: 'base' }),
					);
				}
			} else {
				dateSortedTemplates = orderSortedTemplates;
			}

			dispatch(setQueryResultTemplates(dateSortedTemplates));
		}
	};

export default templateSlice.reducer;
