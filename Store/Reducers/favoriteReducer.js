const initialState = { favoritesMovies: [] }

export default function toggleFavorite(state=initialState, action){
  let nextState
  switch(action.type) {
    case 'TOGGLE_FAVORITE':
      const favoritesMoviesIndex = state.favoritesMovies.findIndex(item => item.id === action.value.id)
      if (favoritesMoviesIndex !== -1) {
        nextState = {
          ...state,
          favoritesMovies: state.favoritesMovies.filter( (item, index) => index != favoritesMoviesIndex )
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
