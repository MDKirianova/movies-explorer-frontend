import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project">
      <h3 id="diploma" className="about-project__nav-title">О проекте</h3>
      <div className="about-project__gird">
        <div className="about-project__gird_element">
          <h4 className="about-project__title">Дипломный проект включал 5 этапов</h4>
          <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__gird_element">
          <h4 className="about-project__title">На выполнение диплома ушло 5 недель</h4>
          <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__progress-bar">
          <span className="about-project__part">1 неделя</span>
          <span className="about-project__part about-project__part_front">4 недели</span>
          <span className="additional-text">Back-end</span>
          <span className="additional-text">Front-end</span>
      </div>
    </section>
  )
}