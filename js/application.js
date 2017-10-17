import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import {initialGame} from './data/quest';
import GameOverScreen from './gameover/gameover';
import scoreboard from './scoreboard/scoreboard';

const dieScreen = new GameOverScreen(false);

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  SCORE: `score`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return initialGame;
  }
};

const routes = {
  [ControllerId.WELCOME]: welcomeScreen,
  [ControllerId.GAME]: gameScreen,
  [ControllerId.SCORE]: scoreboard
};

export default class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static startGame(state = initialGame) {
    location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static die(state) {
    dieScreen.init(state);
  }

  static win(state) {
    location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }
}

Application.init();
