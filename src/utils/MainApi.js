const baseUrl = "http://localhost:3000";
// const moviesUrl = `${process.env.REACT_APP_MAIN_API_URL}`;
function sendRequest(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
  }
}

export const register = (email, password, name) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => sendRequest(res));
};

export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => sendRequest(res))
    // .then((data) => {
    //   if (data.token) {
    //     const token = data.token;
    //     localStorage.setItem("token", token);
    //     return token;
    //   }
    // });
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => sendRequest(res));
}

export const setUserInfo = (name, email) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  }).then((res) => sendRequest(res));
};

export const saveMovie = (movie) => {
  return fetch(`${baseUrl}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: movie.country || "",
      director: movie.director || "",
      duration: movie.duration || "",
      year: movie.year || "",
      description: movie.description || "",
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink || "",
      thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU || "",
      nameEN: movie.nameEN || "",
      owner: movie.owner,
    }),
  }).then((res) => sendRequest(res));
}

export const getSavedMovies = () => {
  return fetch(`${baseUrl}/movies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => sendRequest(res));
};

export const deleteMovie = (id) => {
  return fetch(`${baseUrl}/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => sendRequest(res));
}