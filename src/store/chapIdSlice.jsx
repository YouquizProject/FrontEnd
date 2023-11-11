import { createSlice } from "@reduxjs/toolkit";

export const chapIdSlice = createSlice({
	name: "chap_id",
	initialState: null,
	reducers: {
		setChapId: (state, action) => {
			return action.payload;
		}
	}
});

export const ChapIdFetchThunk = (chap_id) => {
	return async (dispatch) => {
		dispatch(chapIdActions.setChapId({
			chap_id: chap_id,
		}));
	}
}
export const chapIdActions = chapIdSlice.actions;
