import AbstractView from '../view';
export default class ScoreBoardView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
<div class="end">
  <div class="scoreboard">Загружаем данные</div>
  <br>
  <div class="repeat"><span class="repeat-action">Сыграть заново</span>&nbsp;|&nbsp;<span class="repeat-action">Выйти</a>🐌</div>
</div>`;
  }

  bind() {
    this.scoresElement = this.element.querySelector(`.scoreboard`);

    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();
      this.onRepeat();
    };
  }

  printScores(scores) {
    const content = scores.reverse().map((it, i) => `
<tr>
  <td><small>${i + 1}.</small></td>
  <td style="text-align: right;">${new Date(it.date).toDateString()}</td>
  <td style="text-align: right;">${it.time} сек</td>
  <td>${new Array(3 - it.lives).fill(`💔`).concat(new Array(it.lives).fill(`❤️`)).join(``)}</td>
</tr>`).join(``);

    this.scoresElement.innerHTML = `
<h1>Мои лучшие результаты</h1>
<table class="scores">
${content}
</table>`;
  }

  onRepeat() {

  }
}
