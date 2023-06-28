function cards(){
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
}

export default cards;