const initialState = { favoritesMovies: [] }

export default function toggleFavorite(state=initialState, action){
  let nextState
  switch(action.type) {
    case 'TOGGLE_FAVORITE':
      const favoritesMovieIndex = state.favoritesMovies.findIndex(item => item.id === action.value.id)
      if (favoritesMovies !== -1) {
        nextState = {
          ...state,
          favoritesMovies: state.favoritesMovies.filter( (item, index) => index != favoritesMovieIndex )
        }
      } else {
        nextState = {
          ...state,
          favoritesMovies: [ ...state.favoritesMovies, action.value ]
        }
      }
      return nextState || state
    default:
      return state
  }
}
