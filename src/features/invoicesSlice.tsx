import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Request from "../utils/Request";

interface InvoicesState {
	invoices: any[];
	loading: boolean;
	error: string | null;
}

const initialState: InvoicesState = {
	invoices: [],
	loading: false,
	error: null,
};

export const fetchAllInvoices = createAsyncThunk(
	'invoices/fetchAll',
	async () => {
		try {
			const response = await Request.get('invoices');
			return response.data;
		} catch (error) {
			throw new Error('Failed to fetch invoices');
		}
	}
);

export const invoicesSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllInvoices.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchAllInvoices.fulfilled, (state, action) => {
				state.loading = false;
				state.invoices = action.payload;
				state.error = null;
			})
			.addCase(fetchAllInvoices.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch invoices';
			});
	},
});

export default invoicesSlice.reducer;
