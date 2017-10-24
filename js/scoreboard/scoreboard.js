import ScoreBoardView from './scoreboard-view';
import {changeView} from '../util';
import App from '../application';

import Loader from '../loader';

class ScoreBoardScreen {
  init() {
    const view = new ScoreBoardView();

    view.onRepeat = () => App.showWelcome();
    changeView(view);

    Loader.loadResults().then((scores) => view.printScores(scores));
  }
}

export default new ScoreBoardScreen();

