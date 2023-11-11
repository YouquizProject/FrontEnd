import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { chapSlice } from "./chapSlice";
import { teacherSlice } from "./teacherSlice";
import { resultSlice } from "./resultSlice";
import { chapIdSlice } from "./chapIdSlice";
import { registerSlice } from "./registerSlice";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storageSession from "redux-persist/lib/storage/session";

const reducers = combineReducers({
  auth: authSlice.reducer,
  chap: chapSlice.reducer,
  teacher: teacherSlice.reducer,
  result: resultSlice.reducer,
  chap_id: chapIdSlice.reducer,
  register: registerSlice.reducer,
});
  
const persistConfig = {
  key: "root",
  storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});