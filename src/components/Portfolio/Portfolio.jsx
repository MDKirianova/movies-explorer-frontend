import externalLinkIcon from "../../images/external_link_icon.svg";
import "./Portfolio.css"

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__nav-title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-element"><a className="portfolio__list-link link" target="_blank" rel="noreferrer" href="https://github.com/MDKirianova/how-to-learn"><p className="portfolio__list-text">Статичный сайт</p><img className="portfolio__link-icon" alt="иконка внешней ссылки" src={externalLinkIcon} /></a></li>
        <li className="portfolio__list-element"><a className="portfolio__list-link link" target="_blank" rel="noreferrer" href="https://github.com/MDKirianova/russian-travel"><p className="portfolio__list-text">Адаптивный сайт</p><img className="portfolio__link-icon" alt="иконка внешней ссылки" src={externalLinkIcon} /></a></li>
        <li className="portfolio__list-element portfolio__list-element_hiddenline"><a className="portfolio__list-link link" target="_blank" rel="noreferrer" href="https://github.com/MDKirianova/react-mesto-api-full-gha"><p className="portfolio__list-text">Одностраничное приложение</p><img className="portfolio__link-icon" alt="иконка внешней ссылки" src={externalLinkIcon} /></a></li>
      </ul>
    </section>
  )
}