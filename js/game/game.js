import {initialGame, quest, Result} from '../data/quest';
import {changeView} from '../util';
import App from '../application';
import GameModel from './game-model';
import GameView from './game-view';

class GameScreen {
  constructor(data = quest) {
    this.model = new GameModel(data);
    this.view = new GameView(this.model);

    this.view.onAnswer = (answer) => this.onAnswer(answer);
  }

  init(state = initialGame) {
    this.model.update(state);
    changeView(this.view);
    this.changeLevel();
  }

  onAnswer(answer) {
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
  }

  changeLevel() {
    this.view.updateLevel();

    this.view.focus();
    this.tick();
  }

  tick() {
    this.model.tick();
    this.view.updateHeader();

    this.timer = setTimeout(() => this.tick(), 1000);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

export default GameScreen;
