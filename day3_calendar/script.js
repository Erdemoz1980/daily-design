const modalContainer = document.getElementById('modal-container');
const closeModalBtn = document.getElementById('btn-modal-close');
const openModalBtn = document.getElementById('add-event-btn');
const addToCalendarBtn = document.getElementById('add-to-calendar');
const detailsContainer = document.getElementById('details-flex-container');
//Inputs
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const detailsInput = document.getElementById('details');

const currTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
timeInput.value = currTime

//Check Localstorage on bootup and populate UI

document.addEventListener('DOMContentLoaded', getItemsFromStorage);

function getItemsFromStorage() {
  const savedEvents = localStorage.getItem('events')
    && JSON.parse(localStorage.getItem('events'));
  if (savedEvents) {
    savedEvents.map(event => {  
      //Create the HTML Elements
      const newDetailsItem = document.createElement('div');
      const newIcon = document.createElement('i');
      const detailsTextCtnr = document.createElement('div');
      const detailsTitle = document.createElement('h1');
      const detailsDate = document.createElement('span');
      const detailsTime = document.createElement('span');
      const editDeleteCtnr = document.createElement('div');
      const editBtn = document.createElement('i');
      const delBtn = document.createElement('i');
      const idContainer = document.createElement('span');


     //Add Class names
     newDetailsItem.classList.add('details-item')
     newIcon.classList.add('fa-solid', 'fa-list');
     detailsTextCtnr.classList.add('details-text')
     detailsTitle.classList.add('details-title')
     detailsDate.classList.add('details-date')
     detailsTime.classList.add('details-time')
     editDeleteCtnr.classList.add('edit-delete')
     editBtn.classList.add('edit-btn','btn-sm', 'fa-solid', 'fa-pen-to-square');
     delBtn.classList.add('del-btn', 'btn-sm', 'fa-solid', 'fa-trash')
     idContainer.className = 'id-container'


    //Add Content  
    detailsTitle.innerText = event.detailsTitle
    detailsDate.innerText = event.detailsDate
    detailsTime.innerText = event.detailsTime
    idContainer.innerText = event.id
  
    //Append Elements to DOM
    detailsTextCtnr.appendChild(detailsTitle)
    detailsTextCtnr.appendChild(detailsDate)
    detailsTextCtnr.appendChild(detailsTime)

    editDeleteCtnr.appendChild(editBtn)
    editDeleteCtnr.appendChild(delBtn)

    newDetailsItem.appendChild(newIcon)
    newDetailsItem.appendChild(detailsTextCtnr)
    newDetailsItem.appendChild(editDeleteCtnr)
    newDetailsItem.appendChild(idContainer)
    detailsContainer.appendChild(newDetailsItem)
   })
  } 
  return
};

//Delete or Edit an Event
detailsContainer.addEventListener('click', editOrDelete);

function editOrDelete(e) {
  const item = e.target
  const btnGroup = item.parentElement;
  const calendarEvent = btnGroup.parentElement;
  const savedEvents = JSON.parse(localStorage.getItem('events'))
  const eventId = calendarEvent.children[3].innerText

  //Delete Event
  if (item.classList[0] === 'del-btn') {
    const updatedEvents = savedEvents.filter(event => event.id !== Number(eventId));
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    //Remove from DOM
    calendarEvent.remove();
  } else if (item.classList[0] === 'edit-btn') {
    modalContainer.style.display = 'flex'
    const currEvent = savedEvents.find(event => event.id === Number(eventId))
    //Populate Modal with currEvent
    detailsInput.value = currEvent.detailsTitle
    timeInput.value = currEvent.detailsTime
    dateInput.value = currEvent.detailsDate

  }
}


function saveToLocalStorage(event) {
  const events = localStorage.getItem('events') ?
    JSON.parse(localStorage.getItem('events')) : []
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events))
};

function addCalendarEvent() { 
 //Create the HTML structure
 const newDetailsItem = document.createElement('div')
 const newIcon = document.createElement('i')
 const detailsTextCtnr = document.createElement('div')
 const detailsTitle = document.createElement('h1')
 const detailsDate = document.createElement('span')
 const detailsTime = document.createElement('span')
 const editDeleteCtnr = document.createElement('div')
 const editBtn = document.createElement('i')
const delBtn = document.createElement('i')
const idContainer =document.createElement('span')
 //Add Class names
 newDetailsItem.classList.add('details-item')
 newIcon.classList.add('fa-solid', 'fa-list')
 detailsTextCtnr.classList.add('details-text')
 detailsTitle.classList.add('details-title')
 detailsDate.classList.add('details-date')
 detailsTime.classList.add('details-time')
 editDeleteCtnr.classList.add('edit-delete')
 editBtn.classList.add('edit-btn','btn-sm', 'fa-solid', 'fa-pen-to-square')
 delBtn.classList.add('del-btn', 'btn-sm', 'fa-solid', 'fa-trash')
idContainer.className = 'id-container'
  //Retrieve input values
 detailsTitle.innerText = detailsInput.value
 detailsDate.innerText = dateInput.value
detailsTime.innerText = timeInput.value
idContainer.innerText = Date.now()  

   
  //Append Elements to DOM
  detailsTextCtnr.appendChild(detailsTitle)
  detailsTextCtnr.appendChild(detailsDate)
  detailsTextCtnr.appendChild(detailsTime)
  editDeleteCtnr.appendChild(editBtn)
  editDeleteCtnr.appendChild(delBtn)
  newDetailsItem.appendChild(newIcon)
  newDetailsItem.appendChild(detailsTextCtnr)
  newDetailsItem.appendChild(editDeleteCtnr)
  newDetailsItem.appendChild(idContainer)
  detailsContainer.appendChild(newDetailsItem)

 //Add Event to Localstorage
 saveToLocalStorage({
   detailsTitle: detailsInput.value,
   detailsDate: dateInput.value, 
   detailsTime: timeInput.value,
   id:Date.now()
 });

};

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








