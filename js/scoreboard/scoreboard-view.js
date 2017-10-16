import AbstractView from '../view';
export default class ScoreBoardView extends AbstractView {
  constructor(scores) {
    super();
    this.scores = scores;
  }

  get template() {
    return `
<div class="end">
  <div class="scoreboard">${this.printScores(this.scores)}</div>
  <br>
  <div class="repeat"><span class="repeat-action">Сыграть заново</span>&nbsp;|&nbsp;<span class="repeat-action">Выйти</a>🐌</div>
</div>`;
  }

  bind() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();
      this.onRepeat();
    };
  }

  printScores(scores) {
    return `
<h1>Мои лучшие результаты</h1>

<table class="scores">
  ${scores.map((it, i) => `<tr>
    <td><small>${i + 1}.</small></td>
    <td style="text-align: right;">${it.time} сек</td>
    <td>${new Array(3 - it.lives).fill(`💔`).concat(new Array(it.lives).fill(`❤️`)).join(``)}</td>
  </tr>`)}
</table>`;
  }

  onRepeat() {

  }
}
