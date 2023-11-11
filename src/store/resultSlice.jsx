import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
	name:"result_chap_list",
	
	initialState: {
		status : null,
		data: null
	},
	reducers: {
		setResult : (state, action) => {
			state.status = action.payload.status;
			state.data = action.payload.data;
		}
	},
});

export const ResultFetchThunk = ( id ) => {
	return async (dispatch) => {
		dispatch(resultActions.setResult({
			status : "fetching",
			data: null
		}));

		const request = async () => {
			const response = await fetch(`http://52.79.181.56:8080/student/${id}/studystatus`);
			if(!response.ok) throw new Error("Failed!");
			//console.log("response" + response.json());
			return response.json();
		}

		try{
			const data = await request();
			dispatch(resultActions.setResult({
				status : "success",
				data : data
			}));
		}catch(err){
			dispatch(resultActions.setResult({
				status: "failed",
				data : null
			}))
		}
	}
}


export const resultActions = resultSlice.actions;