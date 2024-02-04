## Вторая часть дипломной работы Верстка и JSX

[Ссылка на макет, выбранный вариант dark-4](https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/%D0%94%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC%D0%BD%D1%8B%D0%B9-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82?type=design&node-id=24-3210&mode=design&t=rUxfzIelo1SOIHaO-4)

[Cсылка на репозиторий](https://github.com/MDKirianova/movies-explorer-frontend). Работы ведутся в ветке level-2


### Примечание для статичного сайта

В файле MoviesCard.jsx можно управлять отображением кнопки сохранения, удаления карточки видео с помощью переменных:
  let isSavedMovie = false;
  let isRemoveMovies = false;

В файле Navigation.jsx можно управлять авторизованностью пользователя с помощью параметра:
  let isAutorized = true;

В файле Profile.jsx можно управлять отображением ошибки с помощью параметра:
  let isError = false;

В файлах Login.jsx и Register.jsx есть параметр для отображения ошибок, которые передаются каждого инпута и WindowWithForm.
