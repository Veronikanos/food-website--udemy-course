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
  const closeModalBtn = document.querySelector('[data-close]');
  const modal = document.querySelector('.modal')


  const toggleModal =()=>{
    modal.classList.toggle('show');
  }

    openModalBtn.forEach(btn => {
        btn.addEventListener('click', toggleModal);
    });

    closeModalBtn.addEventListener('click', toggleModal)

    modal.addEventListener('click', (e) =>{
        if (e.target === modal) toggleModal()
    })

    document.addEventListener('keydown', (e)=>{
        if (e.code === "Escape") toggleModal()
    })

    // Cards
    class Menu {
        constructor({img, alt, subtitle, description, price}, selector){
            this.image = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.description = description;
            this.price = price;
            this.selector = document.querySelector(selector)
        }

        createMarkup(){
            return `<div class="menu__item">
            <img src=${this.image} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`
        }

        renderCards(){
            this.selector.insertAdjacentHTML("beforeend", this.createMarkup())
        }
    }

    fetch('../assets/cards.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(menu => {
            const card = new Menu(menu, ".cards-container");
            card.renderCards();
      })
    })
    .catch(error => {
      console.error('Помилка завантаження JSON:', error);
    });

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: "Loading...",
        success: "All is ok!",
        fail: "Something went wrong!"
    }


    const postData = (form) => {
        form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage)

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json')

        const formData = new FormData(form);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        })

        request.send(JSON.stringify(object));
        
        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.fail;
            }
        })
    }) 
    }

    forms.forEach(item => {
        postData(item);
    })
});
