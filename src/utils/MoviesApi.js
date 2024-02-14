const moviesUrl = "https://api.nomoreparties.co/beatfilm-movies";

function sendRequest(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
  }
}

export const getMovies = () => {
  return fetch(moviesUrl)
  .then((res) =>sendRequest(res))
}