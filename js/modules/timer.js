// Timer

function timer() {
  const deadline = '2023-07-30';

  const getRemainingTime = (deadline) => {
    let days, hours, minutes, seconds;

    const t = Date.parse(deadline) - Date.parse(new Date());

    if (t <= 0) {
      return {
        t: 0,
        days: 0,
        minutes: 0,
        hours: 0,
        seconds: 0,
      };
    }

    days = Math.floor(t / (1000 * 60 * 60 * 24));
    hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((t / (1000 / 60)) % 60);
    seconds = Math.floor((t / 1000) % 60);
    return {
      t,
      days,
      minutes,
      hours,
      seconds,
    };
  };

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  const setClock = (selector, deadline) => {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    const updateClock = () => {
      const t = getRemainingTime(deadline);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.t <= 0) {
        clearInterval(startTimer);
      }
    };

    updateClock();

    const startTimer = setInterval(updateClock, 1000);
  };

  setClock('.timer', deadline);
}
export default timer;