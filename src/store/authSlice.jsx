import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
	status : null,
	id : null,
	username : null,
	role : null,
};

export const authSlice = createSlice({
	name:"auth",
	initialState,
	reducers: {
	setAuth : (state, action) => {
		state.status = action.payload.status;
		state.id = action.payload.id;
		state.username = action.payload.username;
		state.role = action.payload.role;
	}
	},
	extraReducers: builder => {
		builder.addCase(PURGE, () => initialState);
	},
});

export const AuthFetchThunk = (role, id, pw) => {
	return async (dispatch) => {
		dispatch(authActions.setAuth({
			status : "fetching",
			id : null,
			username : null,
			role : null,
		}));

		const request = async () => {
			const response = await fetch(`http://52.79.181.56:8080/login/${role}`, {
				method : "POST",
				headers:{
					"Content-Type" : "application/json"
				},
				body : JSON.stringify({
					"userId" : id,
					"password" : pw
				})
			});
			if(!response.ok) throw new Error("Login Failed!");
			
			return response.json();
		}

		try{
			const data = await request();
			dispatch(authActions.setAuth({
				status : "success",
				id : data.id,
				username : data.username,
				role : role
			}));
		}catch(err){
			dispatch(authActions.setAuth({
				status: "failed",
				id : null,
				username: null,
				role : null
			}))
		}
	}
}
export const authActions = authSlice.actions;