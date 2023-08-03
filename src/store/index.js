import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "./reducers/auth";
import accountReducer from "./reducers/account";
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        accouunt: accountReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(api.middleware),
});

export const persistor = persistStore(store);