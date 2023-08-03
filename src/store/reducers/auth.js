import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "user",
    storage,
};

const initialState = { login: null, token: null, status: null };

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: (
            state,
            { payload: { login, token, status } }
        ) => {
            state.login = login;
            state.token = token;
            state.status = status;
        },
        removeCredentials: (state) => {
            state.login = null;
            state.token = null;
            state.status = null;
        },
    },
});

export const { setCredentials, removeCredentials } = slice.actions;

export default persistReducer(persistConfig, slice.reducer);

export const selectUser = (state) => state.auth;
