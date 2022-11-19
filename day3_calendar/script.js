const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.getElementById('btn-modal-close');
const addEventBtn = document.getElementById('add-event-btn');


addEventBtn.onclick = function () {
  modalContainer.style.display = 'flex'
}


closeModalBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modalContainer.style.display = 'none'
});

window.onclick = function (e) {
  if (e.target == modalContainer) {
    modalContainer.style.display = 'none'
  }
}



