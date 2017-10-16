import {getLevel} from '../data/quest';
import AbstractView from '../view';

const ENTER_KEYCODE = 13;

const drawHeart = (full) => {
  return `<span class="heart__${full ? `full` : `empty`}">${full ? `&#9829;` : `&#9825;`}</span>`;
};

const drawHeader = (data) => {
  return `
<header class="header">
  <div>Мир: ${data.level}</div>
  <div>Жизни: ${drawHeart(data.lives > 2)}
              ${drawHeart(data.lives > 1)}
              ${drawHeart(data.lives > 0)}
  </div>
  <div>Время: <span class="time">${data.time}</span></div>
</header>`;
};

export default class LevelView extends AbstractView {
  constructor(state) {
    super();
    this.model = state;
  }

  get template() {
    const level = getLevel(this.model.level);

    const answerNames = Object.keys(level.answers);
    const answers = answerNames.map((key) => ({key, value: level.answers[key]}));

    return `
    ${drawHeader(this.model)}
    <div class="quest">
      <p class="text">${level.text}</p>
      <input type="text">
      <ul class="answers">
        ${answers.map(({key, value}) => `<li class="answer" data-key="${key}">${key}. ${value.description}</li>`).
      join(``)}
      </ul>  
    </div>
    <small>Для справки введите <i>help</i></small>`.trim();
  }

  bind() {
    this.timeElement = this.element.querySelector(`.time`);
    this.input = this.element.querySelector(`input`);
    this.input.onkeydown = (evt) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        const level = getLevel(this.model.level);
        const answer = level.answers[this.input.value.toUpperCase()];

        if (answer) {
          this.onAnswer(answer);
        }
      }
    };

    const answersElement = this.element.querySelector(`.answers`);
    answersElement.onclick = (evt) => {
      const target = evt.target;
      if (target.tagName.toLowerCase() === `li`) {
        const level = getLevel(this.model.level);
        const answer = level.answers[target.dataset.key.toUpperCase()];

        if (answer) {
          this.onAnswer(answer);
        }
      }
    };
  }

  updateTime(time) {
    this.timeElement.textContent = time;
  }

  focus() {
    this.input.focus();
  }

  onAnswer(answer) {
    return answer;
  }

}
