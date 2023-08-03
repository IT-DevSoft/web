import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "account",
    storage,
};

const initialState = {
    account: undefined,
};

const slice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        setAccount: (
            state,
            { payload: { account } }
        ) => {
            state.account = account;
        },
        removeAccount: (state) => {
            state.account = undefined;
        },
    },
});

export const { setAccount, removeAccount } = slice.actions;

export default persistReducer(persistConfig, slice.reducer);

export const selectAccount = (state) => state.accouunt;
