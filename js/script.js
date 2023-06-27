window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach((item) =>
      item.classList.remove('tabheader__item_active')
    );
  };

  const showTabContent = (i = 0) => {
    tabs[i].classList.add('tabheader__item_active');
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

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

  // Modal
  const openModalBtn = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerId);
  }

  openModalBtn.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  modal.addEventListener('click', (e) => {
    if (
      e.target === modal ||
      e.target.getAttribute('data-close') == ''
    )
      closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') closeModal();
  });

  // Cards
  class Menu {
    constructor({img, altimg, title, descr, price}, selector) {
      this.image = img;
      this.alt = altimg;
      this.subtitle = title;
      this.description = descr;
      this.price = price;
      this.selector = document.querySelector(selector);
    }

    createMarkup() {
      return `<div class="menu__item">
            <img src=${this.image} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
    }

    renderCards() {
      this.selector.insertAdjacentHTML(
        'beforeend',
        this.createMarkup()
      );
    }
  }
  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach((menu) => {
      const card = new Menu(menu, '.cards-container');
      card.renderCards();
    });
  });

  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Loading...',
    success: 'All is ok!',
    fail: 'Something went wrong!',
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });
    return await res.json();
  };

  const bindPostData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(
        Object.fromEntries(formData.entries())
      );

      postData('http://localhost:3000/requests', json)
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.fail);
        })
        .finally(() => {
          form.reset();
        });
    });
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">Мы скоро с Вами свяжемся!</div>
        </div>
        `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  // Slider

  const sliderWrapper = document.querySelector(
    '.offer__slider-wrapper'
  );
  const sliderCarousel = document.querySelector(
    '.offer__slider-carousel'
  );
  const slideWrapper = document.querySelector('.offer__slider-wrapper');
  const allSlides = document.querySelectorAll('.offer__slide');
  const next = document.querySelector('.offer__slider-next');
  const prev = document.querySelector('.offer__slider-prev');
  const total = document.querySelector('#total');
  const current = document.querySelector('#current');
  const slider = document.querySelector('.offer__slider');

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `    
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;`;

  slider.append(indicators);
 

  for (let i = 0; i < allSlides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;

    if (i == 0){
        dot.style.opacity = 1;
    }
    indicators.append(dot); 
    dots.push(dot);
  }

  const width = window.getComputedStyle(slideWrapper).width;
  sliderWrapper.style.overflow = 'hidden';
  sliderCarousel.style.display = 'flex';
  sliderCarousel.style.width = allSlides.length * 100 + '%';
  sliderCarousel.style.transition = 'all 0.3s ease-in-out';

  let sliderIndex = 1;
  let offset;

  function initSlider() {
    total.textContent = formateIndex(allSlides.length);
    current.textContent = formateIndex(sliderIndex);
    offset = 0;
  }

  initSlider();

  function formateIndex(num) {
    return num.toString().padStart(2, '0');
  }

  const WIDTH = +width.slice(0, -2);

  next.addEventListener('click', () => {
    if (sliderIndex >= allSlides.length) {
      sliderIndex = 1;
      current.textContent = formateIndex(sliderIndex);
      sliderCarousel.style.transform = `translateX(0px)`;
      offset = 0;
    } else {
      offset += WIDTH;
      sliderCarousel.style.transform = `translateX(-${offset}px)`;
      sliderIndex++;
    }
    setActiveDotAndCurrentTab();
  });

  prev.addEventListener('click', () => {
    
    if (sliderIndex <= 1) {
        sliderIndex = allSlides.length;
        current.textContent = formateIndex(sliderIndex);
        offset = (sliderIndex - 1) * WIDTH;
        sliderCarousel.style.transform = `translateX(-${offset}px)`;
    } else {
        offset -= WIDTH;
        sliderCarousel.style.transform = `translateX(-${offset}px)`;
        sliderIndex--;
    }
    setActiveDotAndCurrentTab();

  });

  function setActiveDotAndCurrentTab(){
    current.textContent = formateIndex(sliderIndex);
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[sliderIndex - 1].style.opacity = 1;
  }

  dots.forEach(dot =>{
    dot.addEventListener('click', (e)=>{
        const slideTo = e.target.getAttribute('data-slide-to');

        sliderIndex = slideTo;
        offset = WIDTH * (slideTo - 1);
        sliderCarousel.style.transform = `translateX(-${offset}px)`;

        setActiveDotAndCurrentTab();

    })
  })
});
