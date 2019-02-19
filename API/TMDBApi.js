const API_TOKEN = "fd3b3b2724dc8f3b535f3bbbc8a66da4"


export function getMovies(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=en&query=' + text + '&page=' + page
  console.log(url)
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getImage(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}
