import { createSlice } from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
	name:"teacher_chap_list",
	
	initialState: {
		status : null,
		data: null
	},
	reducers: {
		setTeacher: (state, action) => {
			state.status = action.payload.status;
			state.data = action.payload.data
		}
	},
});

export const TeacherFetchThunk = (id) => {
	return async (dispatch) => {
		dispatch(teacherActions.setTeacher({
			status : "fetching",
			data: null
		}));

		const request = async () => {
			const response = await fetch(`http://52.79.181.56:8080/teacher/${id}/study`);
			if(!response.ok) throw new Error("Failed!");
			// console.log("response" + response.json());
			return response.json();
		}
		try{
			const data = await request();
			dispatch(teacherActions.setTeacher({
				status : "success",
				data : data
			}));
		}catch(err){
			dispatch(teacherActions.setTeacher({
				status: "failed",
				data : null
			}))
		}
	}
}


export const teacherActions = teacherSlice.actions;