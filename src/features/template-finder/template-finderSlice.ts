import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app-store/store';
import { Template } from '../../models/template.interface';


export interface TemplateState {
	templates: Template[];
	pages: number;
	activePage: number;
	status: 'loading' | 'idle' | 'failed'
}
  
const initialState: TemplateState = {
	templates: [],
	status: 'loading',
	pages: 1,
	activePage: 1
};

// Async code can be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getTemplatesAsync = createAsyncThunk(
  'template/fetchTemplates', async () => {
    const response = await fetch('https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates');
		const templates = await response.json();
		// console.log(templates);
    // The value we return becomes the `fulfilled` action payload
    return templates;
  }
);

// state slice
export const templateSlice = createSlice({
	name: 'template',
	initialState,
	// actions
	reducers: {
		setTemplates: (state, action: PayloadAction<Template[]>) => {
			state.templates = [...action.payload]
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
				state.pages = Math.round((action.payload.length / 30));
        state.templates = action.payload;
      })
			.addCase(getTemplatesAsync.rejected, (state) => {
				console.log('big fat rejected or network error; NICE');
				state.status = 'failed';
			});
  },
});

export const { setTemplates } = templateSlice.actions;

// selectors
// export const selectTemplates = (state: RootState) => state.template.templates.filter(
// 	(template, index) => index < 30
// 	);
export const selectTemplates = (state: RootState) => state.template.templates.slice(0, 30);
export const selectNumberOfTemplates = (state: RootState) => state.template.templates.length;
export const selectState = (state: RootState) => state.template.status;
export const selectPages = (state: RootState) => state.template.pages;
export const selectActivePage = (state: RootState) => state.template.activePage;

export default templateSlice.reducer;