import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import favoriteReducer from "../redux/features/favourite/FavouriteSlice"
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoriteReducer,
    },

    preloadedState: {
        favorites: initialFavorites
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch);

export default store