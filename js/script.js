import tabs from './modules/tabs';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
  tabs();
  timer('.timer', '2023-07-30');
  cards();
  forms();
  modal();
  slider();
});
