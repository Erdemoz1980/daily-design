const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.getElementById('btn-modal-close');
const openModalBtn = document.getElementById('add-event-btn');
const addToCalendarBtn = document.getElementById('add-to-calendar');

const detailsContainer = document.getElementById('details-flex-container');

const calendarItem = document.getElementById('details-item');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const detailsInput = document.getElementById('details');


function addCalendarEvent() { 
  console.log('Button working?')

  //Create the HTML structure
  const newDetailsItem = document.createElement('div');
  const newIcon = document.createElement('i');
  const detailsTextCtnr = document.createElement('div');
  const detailsTitle = document.createElement('h1');
  const detailsDate = document.createElement('span');
  const detailsTime = document.createElement('span');
  const editDeleteCtnr = document.createElement('div');
  const editBtn = document.createElement('button');
  const delBtn = document.createElement('button');

  //Add Class names
  newDetailsItem.classList.add('details-item')
  newIcon.classList.add('fa-solid', 'fa-list');
  detailsTextCtnr.classList.add('details-text')
  detailsTitle.classList.add('details-title')
  detailsDate.classList.add('details-date')
  detailsTime.classList.add('details-time')
  editDeleteCtnr.classList.add('edit-delete')
  editBtn.classList.add('btn-sm')
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  delBtn.classList.add('btn-sm')
  delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  //Add Text Content
  detailsTitle.innerText = detailsInput.value;
  detailsDate.innerText = dateInput.value;
  detailsTime.innerText = timeInput.value;


  //Append Elements to DOM
  detailsTextCtnr.appendChild(detailsTitle);
  detailsTextCtnr.appendChild(detailsDate);
  detailsTextCtnr.appendChild(detailsTime);

  editDeleteCtnr.appendChild(editBtn);
  editDeleteCtnr.appendChild(delBtn);

  newDetailsItem.appendChild(newIcon);
  newDetailsItem.appendChild(detailsTextCtnr);
  newDetailsItem.appendChild(editDeleteCtnr);

  detailsContainer.appendChild(newDetailsItem)



  //Reset Input Boxes
  dateInput.value = '';
  timeInput.value = '';
  detailsInput.value = '';

}

addToCalendarBtn.onclick = function (e) {
  e.preventDefault()
  addCalendarEvent()
  modalContainer.style.display = 'none';
}; 


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








