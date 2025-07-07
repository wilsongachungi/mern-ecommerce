import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: [],
    reducers: {
        addToFavorites: (state, action) => {
            //chech if the product is not already favourites
            if(!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        }, 
        removeFromFavorites: (state, action) => {
            //remove the [roduct with thw matchind id
            return state.filter((product) => product._id !== action.payload._id)
        },
        setFavorites: (state, action) => {
            //set the favourites from localStorage
            return action.payload
        },
    },
});

export const {addToFavorites, removeFromFavorites, setFavorites} = favouriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favouriteSlice.reducer;