import {changeView} from '../util';
import WelcomeView from './welcome-view';
import startGame from '../game/game';

const welcome = new WelcomeView();
welcome.onStart = () => {
  changeView(startGame());
};

export default () => welcome;
