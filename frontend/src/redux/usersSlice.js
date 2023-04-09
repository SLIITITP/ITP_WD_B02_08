/*import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "users",
    initialState:{
        user:null,
    },
    reducer:{
        SetUser:(state,action) =>{
            state.user = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;*/
import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
      console.log(action);
    },
  },
});

export const { SetUser } = usersSlice.actions;
export default usersSlice.reducer;