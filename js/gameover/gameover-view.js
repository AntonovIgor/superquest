import AbstractView from '../view';
export default class GameOverView extends AbstractView {
  constructor(isWin) {
    super();
    this.isWin = isWin;
  }

  get template() {
    let message;
    if (this.isWin) {
      message = `<p>УРА!</p><p>Победа!</p>`;
    } else {
      message = `<p>КОНЕЦ!</p><p>Повторим?!</p>`;
    }
    return `
<div class="end">
  ${message.trim()}
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</a></div>
</div>`;
  }

  bind() {
    this.element.querySelector(`span.repeat-action`).onclick = (evt) => {
      evt.preventDefault();

      this.onRepeat();
    };
  }

  onRepeat() {

  }
}
