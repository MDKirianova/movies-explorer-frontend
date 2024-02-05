import "./Footer.css";

export default function Footer() {
  return (
    <section className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__underline">
        <ul className="footer__links">
          <li><a className="footer__link link" href="https://practicum.yandex.ru/" rel="noreferrer" target="_blank">Яндекс.Практикум</a></li>
          <li><a className="footer__link link" href="https://github.com/explore" rel="noreferrer" target="_blank">Github</a></li>
        </ul>
        <p className="footer__copyright">© 2024</p>
      </div>
    </section>
  )
}