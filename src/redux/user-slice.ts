import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthType } from "../@types";

interface InitialStateType{
    user: AuthType;
}

const initialState :InitialStateType = {
    user:JSON.parse(Cookies.get("user")as string)  || null
}


export const userSlice = createSlice({
    name: "user-slice",
    initialState,
    reducers: {
        getUser(state , action) {
            state.user = action.payload
        }
    },
})


export const { getUser } = userSlice.actions



export default userSlice.reducer