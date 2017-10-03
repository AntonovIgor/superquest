import {createElement, changeView} from './util';
import game from './game';

const html = `
<div class="end">
  <p>КОНЕЦ!</p>
  <p>Повторим?!</p>
  <div class="repeat"><span class="repeat-action">Да</span>|<span class="repeat-action">Не</a></div>
</div>`;

const element = createElement(html);

element.querySelector(`span.repeat-action`).onclick = (evt) => {
  evt.preventDefault();

  changeView(game);
};

export default element;
