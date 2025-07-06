//add a product from a local storage
export const addFavoriteTolocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage()
    if(!favorites.some((p) => p._id === product._id)) {
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}
//Remove product from local storage
export const removeFavoriteFromLocaStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
        (product) => product._id !== productId
    )
    localStorage.setItem("favorites", JSON.stringify(updateFavorites))
}

//retrieve favourites from local storage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites")
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}