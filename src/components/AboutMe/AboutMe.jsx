import about_me_photo from "../../images/about_me_photo.png";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about-me__nav-title">Студент</h3>
      <div className="about-me__content">
        <div className="about-me__content-pic">
          <img src={about_me_photo} alt="Фотография студента" className="about-me__photo" />
        </div>
        <div className="about-me__article">
          <div>
            <h2 className="about-me__title">Марина</h2>
            <h3 className="about-me__subtitle">Фронтенд-разработчица, 34 года</h3>
            <p className="about-me__description">Я не первый день в IT и работаю продактом в крупной корпорации уже более года, но душа требует разработки. Поэтому я осваиваюсь в новой для меня сфере. Раньше я имела представление о языках разметки, но курс подарил мне новые глубокие знания про JS, JSX, React, Express.js и MongoDB. Совмещать учебу и работу было испытанием, очень хочется верить, что мне удастся сдать этот проект и получить диплом.</p>
          </div>
          <div>
            <a className="about-me__github link" href="https://github.com/MDKirianova" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}