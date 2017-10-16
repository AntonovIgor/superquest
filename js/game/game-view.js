import AbstractView from '../view';
import HeaderView from './header/header-view';
import LevelView from './level/level-view';

const update = (container, view) => {
  container.innerHTML = ``;
  container.appendChild(view.element);
};

export default class GameView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {
    return `
<div class="header-container"></div>
<div class="level-container"></div>`;
  }

  bind() {
    this.headerContainer = this.element.querySelector(`.header-container`);
    this.levelContainer = this.element.querySelector(`.level-container`);
    return super.bind();
  }

  updateLevel() {
    this.updateHeader();
    const level = new LevelView(this.model.getCurrentLevel());
    level.onAnswer = (answer) => this.onAnswer(answer);

    update(this.levelContainer, level);
    this.level = level;
  }

  updateHeader() {
    update(this.headerContainer, new HeaderView(this.model.state));
  }

  focus() {
    this.level.focus();
  }

  onAnswer(answer) {

  }
}
