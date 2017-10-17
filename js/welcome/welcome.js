import {changeView} from '../util';
import WelcomeView from './welcome-view';
import App from '../application';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      App.startGame();
    };
  }
}

export default new WelcomeScreen();
