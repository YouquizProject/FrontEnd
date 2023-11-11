import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status : null,
	role : null,
	id : null,
	password : null,
	username : null,
	birth : null,
	sex : null,
	phoneNumber : null,
	class_id : null,
};

export const registerSlice = createSlice({
	name:"register",
	initialState,
	reducers: {
		setRegister : (state, action) => {
			state.status = action.payload.status;
			state.role = action.payload.role;
			state.id = action.payload.id;
			state.username = action.payload.username;
			state.password = action.payload.password;
			state.birth = action.payload.birth;
			state.sex = action.payload.sex;
			state.phoneNumber = action.payload.phoneNumber;
			state.class_id = action.payload.class_id;
		}
	}
});

export const RegisterFetchThunk = (role, id, password, username, birth, sex, phoneNumber) => {
	return async (dispatch) => {
		dispatch(registerActions.setRegister({
			status : "fetching",
			role : null,
			id : null,
			username : null,
			password : null,
			birth : null,
			sex : null,
			phoneNumber : null,
			class_id : null,
		}));

		const request = async () => {
			const response = await fetch(`http://52.79.181.56:8080/register/${role}`, {
				method : "POST",
				headers:{
					"Content-Type" : "application/json"
				},
				body : JSON.stringify({
					"userId" : id,
					"password" : password,
					"username": username,
					"birth": birth,
					"sex": sex,
					"phoneNumber": phoneNumber,
					"class_id" : "1",
				})
			});
			if(!response.ok) throw new Error("Register Failed!");
			
			return response.json();
		}

		try{
			const data = await request();
			
			dispatch(registerActions.setRegister({
				status : "success",
				role : data.role,
				id : data.id,
				username : data.username,
				password : data.password,
				birth : data.birth,
				sex : data.sex,
				phoneNumber : data.phoneNumber,
				class_id : "1"
			}));
		}catch(err){
			dispatch(registerActions.setRegister({
				status: "failed",
				role : null,
				id : null,
				username : null,
				password : null,
				birth : null,
				sex : null,
				phoneNumber : null,
				class_id : null
			}))
		}
	}
}
export const registerActions = registerSlice.actions;