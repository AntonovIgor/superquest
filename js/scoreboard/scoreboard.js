import ScoreBoardView from './scoreboard-view';
import {changeView} from '../util';
import App from '../application';

class ScoreBoardScreen {
  init(state) {
    const view = new ScoreBoardView([state]);
    view.onRepeat = () => {
      App.startGame();
    };
    changeView(view);
  }
}

export default new ScoreBoardScreen();

