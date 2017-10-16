import {initialGame, Result} from '../data/quest';
import LevelView from './game-view';
import {changeView} from '../util';
import App from '../application';
import GameModel from './game-model';

class GameScreen {

  init(state = initialGame) {
    this.model = new GameModel(state);
    this.changeLevel();
  }

  changeLevel() {
    this.level = new LevelView(this.model.state);

    this.level.onAnswer = (answer) => {
      this.stopTimer();
      switch (answer.result) {
        case Result.DIE:
          this.model.die();
          App.die(this.model.state);
          break;
        case Result.WIN:
          App.win(this.model.state);
          break;
        case Result.NEXT:
          this.model.nextLevel();
          this.changeLevel();
          break;
        default:
          throw new Error(`Unknown result ${answer.result}`);
      }
    };
    changeView(this.level);
    this.level.focus();
    this.tick();
  }

  tick() {
    this.model.tick();
    this.level.updateTime(this.model.state.time);

    this.timer = setTimeout(() => this.tick(), 1000);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

export default new GameScreen();
