import AbstractView from '../../view';

const ENTER_KEYCODE = 13;


export default class LevelView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const level = this.level;

    const answerNames = Object.keys(level.answers);
    const answers = answerNames.map((key) => ({key, value: level.answers[key]}));

    return `
<div class="quest">
  <p class="text">${level.text}</p>
  <input type="text">
  <ul class="answers">
    ${answers.map(({key, value}) => `<li class="answer" data-key="${key}">${key}. ${value.description}</li>`).join(``)}
  </ul>  
</div>
<small>Для справки введите <i>help</i></small>`;
  }

  bind() {
    this.input = this.element.querySelector(`input`);
    this.input.onkeydown = (evt) => {
      if (evt.keyCode === ENTER_KEYCODE) {
        this.selectAnswer(this.input.value);
      }
    };

    const answersElement = this.element.querySelector(`.answers`);
    answersElement.onclick = (evt) => {
      const target = evt.target;
      if (target.tagName.toLowerCase() === `li`) {
        this.selectAnswer(target.dataset.key);
      }
    };
  }

  selectAnswer(answerKey = ``) {
    const level = this.level;
    const answer = level.answers[answerKey.toUpperCase()];

    if (answer) {
      this.onAnswer(answer);
    }
  }

  focus() {
    this.input.focus();
  }

  onAnswer(answer) {
    return answer;
  }

}
