import usersSlice from "./usersSlice";
import { configureStore } from "@reduxjs/toolkit";
import loaderSlice  from "./loaderSlice";

const store = configureStore({   //to showing username and loader
    reducer: {
        users: usersSlice,
        loader : loaderSlice
    }
});

export default store;