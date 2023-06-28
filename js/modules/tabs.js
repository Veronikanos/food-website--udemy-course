// Tabs

function tabs() {
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
}

export default tabs;