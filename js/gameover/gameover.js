import GameOverView from './gameover-view';
import {changeView} from '../util';
import App from '../application';

class GameOverScreen {
  constructor(win) {
    this.isWin = win;
    this.view = new GameOverView(win);
  }

  init(state) {
    this.view.onRepeat = () => {
      if (this.isWin || state.lives < 0) {
        App.startGame();
      } else {
        App.startGame(state);
      }
    };

    changeView(this.view);
  }
}

export default GameOverScreen;
