function slider(){
    
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

  const WIDTH = +width.replace(/\D/g, '');

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
}
export default slider;