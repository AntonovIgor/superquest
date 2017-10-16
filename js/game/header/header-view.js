import AbstractView from '../../view';

const drawHeart = (full) => {
  return `<span class="heart__${full ? `full` : `empty`}">${full ? `&#9829;` : `&#9825;`}</span>`;
};

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }


  get template() {
    return `
<header class="header">
  <div>Мир: ${this.state.level}</div>
  <div>Жизни: ${drawHeart(this.state.lives > 2)}
              ${drawHeart(this.state.lives > 1)}
              ${drawHeart(this.state.lives > 0)}
  </div>
  <div>Время: <span class="time">${this.state.time}</span></div>
</header>`;
  }
}
