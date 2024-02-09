const moviesUrl = "https://api.nomoreparties.co/beatfilm-movies";
// const moviesUrl = `${process.env.REACT_APP_MOVIES_API_URL}`;

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