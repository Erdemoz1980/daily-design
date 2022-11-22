const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.getElementById('btn-modal-close');
const openModalBtn = document.getElementById('add-event-btn');
const addToCalendarBtn = document.getElementById('add-to-calendar');

const detailsFlexContainer = document.getElementById('details-flex-container')

const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const detailsInput = document.getElementById('details');


// Open Modal
openModalBtn.onclick = function (e) {
  modalContainer.style.display = 'flex'
}

//Close Modal
closeModalBtn.onclick = function (e) {
  e.preventDefault();
  modalContainer.style.display = 'none'
};

window.onclick = function (e) {
  if (e.target == modalContainer) {
    modalContainer.style.display = 'none'
  }
};


addToCalendarBtn.onclick = function (e) {
  e.preventDefault();
  const newDetailsItem = document.createElement('div');
  const newIcon = document.createElement('i');
  const detailsTextCtnr = document.createElement('div');
  const detailsTitle = document.createElement('h1');
  const detailsDate = document.createElement('span');
  const detailsTime = document.createElement('span');
  const editDeleteCtnr = document.createElement('div');
  const editBtn = document.createElement('button');
  const delBtn = document.createElement('button');

  newDetailsItem.classList = 'details-item';
  newIcon.classList = 'fa-solid fa-magnifying-glass';
  detailsTextCtnr.classList = 'details-text';
  
  detailsTitle.innerText = detailsInput.value;
  detailsTitle.className = 'details-title';

  detailsDate.innerText = dateInput.value;
  detailsDate.className = 'details-date';

  detailsTime.innerText = timeInput.value;
  detailsTime.classList = 'details-time';
  
  editDeleteCtnr.classList = 'edit-delete';
  editBtn.className = 'edit-btn';
  delBtn.className = 'delete-btn';

  detailsTextCtnr.appendChild(detailsTitle);
  detailsTextCtnr.appendChild(detailsDate);
  detailsTextCtnr.appendChild(detailsTime);

  editDeleteCtnr.appendChild(editBtn);
  editDeleteCtnr.appendChild(delBtn);

  newDetailsItem.appendChild(newIcon);
  newDetailsItem.appendChild(detailsTextCtnr);
  newDetailsItem.appendChild(editDeleteCtnr);
  detailsFlexContainer.appendChild(newDetailsItem);

  dateInput.value = '';
  timeInput.value = '';
  detailsInput.value = '';
  
};






