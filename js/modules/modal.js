// Modal

function modal() {
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
}
export default  modal;