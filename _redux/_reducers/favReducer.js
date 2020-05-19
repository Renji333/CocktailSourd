const initialState = { fav: [] };

function manageFav(state = initialState, action) {

    let nextState;

    switch (action.type) {

        case 'SET_FAV':

            const favoriteFilmIndex = state.fav.findIndex(item => item.idDrink === action.value.idDrink);

            if (favoriteFilmIndex !== -1) {
                // Le film est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,
                    fav: state.fav.filter( (item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    fav: [...state.fav, action.value]
                }
            }
            return nextState || state;

        default:
            return state


    }

}

export default manageFav
