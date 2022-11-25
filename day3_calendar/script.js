const modalContainer = document.getElementById('modal-container')
const deleteModalContainer = document.getElementById('modal-container-delete')
const closeModalBtn = document.getElementById('btn-modal-close')
const openModalBtn = document.getElementById('add-event-btn')
const confirmDelBtn = document.getElementById('confirm-delete')
const declineDelBtn = document.getElementById('decline-delete')
const addToCalendarBtn = document.getElementById('add-to-calendar')
const detailsContainer = document.getElementById('details-flex-container')
const daysContainer = document.getElementById('weeks').children

//Inputs
const dateInput = document.getElementById('date')
const timeInput = document.getElementById('time')
const detailsInput = document.getElementById('details')

const currTime = `${new Date().getHours()}:${new Date().getMinutes()}`
timeInput.value = currTime

//Check Localstorage on bootup and populate UI
document.addEventListener('DOMContentLoaded', getItemsFromStorage)

highlightToday();

//Hightlight today on calendar
function highlightToday() {
const date = new Date()
const today = date.getDate()

  for (let i = 0; i < daysContainer.length; i++){
    const p = daysContainer[i]
    if (today < 10) {
      const singleDigitToday = today.split('')[1]
      p.innerText == singleDigitToday && p.classList.add('today')
    } else {
      p.innerText == today && p.classList.add('today')
    }
  }
};


function getItemsFromStorage() {
  const savedEvents = localStorage.getItem('events')
    && JSON.parse(localStorage.getItem('events'))
  if (savedEvents) {
    savedEvents.forEach(event => {  
      //Create the HTML Elements
      const newDetailsItem = document.createElement('div')
      const newIcon = document.createElement('i')
      const detailsTextCtnr = document.createElement('div')
      const detailsTitle = document.createElement('h1')
      const detailsDate = document.createElement('span')
      const detailsTime = document.createElement('span')
      const editDeleteCtnr = document.createElement('div')
      const editBtn = document.createElement('i')
      const delBtn = document.createElement('i')

     //Add Class names
     newDetailsItem.classList.add('details-item',`${event.id}`)
     newIcon.classList.add('fa-solid', 'fa-list');
     detailsTextCtnr.classList.add('details-text')
     detailsTitle.classList.add('details-title')
     detailsDate.classList.add('details-date')
     detailsTime.classList.add('details-time')
     editDeleteCtnr.classList.add('edit-delete')
     editBtn.classList.add('edit-btn','btn-sm', 'fa-solid', 'fa-pen-to-square');
     delBtn.classList.add('del-btn', 'btn-sm', 'fa-solid', 'fa-trash')

    //Add Content  
    detailsTitle.innerText = event.detailsTitle
    detailsDate.innerText = event.detailsDate
    detailsTime.innerText = event.detailsTime    
     
    //Hightlight event day on calendar  
      const eventDay = event.detailsDate.split('-')[2]
    for (let i = 0; i < daysContainer.length; i++){
      const p = daysContainer[i]
      if (eventDay < 10) {
        const singleDigitDay = eventDay.split('')[1]
        p.innerText === singleDigitDay && p.classList.add('event')
      } else {
         p.innerText === eventDay && p.classList.add('event')
      }
      };

    //Append Elements to DOM
    detailsTextCtnr.appendChild(detailsTitle)
    detailsTextCtnr.appendChild(detailsDate)
    detailsTextCtnr.appendChild(detailsTime)

    editDeleteCtnr.appendChild(editBtn)
    editDeleteCtnr.appendChild(delBtn)

    newDetailsItem.appendChild(newIcon)
    newDetailsItem.appendChild(detailsTextCtnr)
    newDetailsItem.appendChild(editDeleteCtnr)
    detailsContainer.appendChild(newDetailsItem)
   })
  } 
  
};

//Delete or Edit an Event
detailsContainer.addEventListener('click', editOrDelete)

function editOrDelete(e) {
 if (e.target.parentElement.className !== 'edit-delete') return;

  const item = e.target
  const savedEvents = JSON.parse(localStorage.getItem('events'))
  const btnGroup = item.parentElement
  const calendarEvent = btnGroup.parentElement
  const eventId = Number(calendarEvent.classList[1])
  
  //Delete || Edit Events
  if (item.classList[0] === 'del-btn') {
    deleteModalContainer.style.display = 'flex'
    confirmDelBtn.onclick = () => {
      //Remove event from localstorage
      const updatedEvents = savedEvents.filter(event => event.id !== Number(eventId))
      localStorage.setItem('events', JSON.stringify(updatedEvents))
      //Remove from DOM
      calendarEvent.remove();
      //Remove highlight from Calendar (DOM) in real time
      const currentEvent = savedEvents.find(event => event.id === eventId);
      const eventDay = currentEvent.detailsDate.split('-')[2]
      for (let i = 0; i < daysContainer.length; i++){
        const p = daysContainer[i]
        if (eventDay < 10) {
          const singleDigitDay = eventDay.split('')[1]
          p.innerText === singleDigitDay && p.classList.remove('event')
        } else {
           p.innerText === eventDay && p.classList.remove('event')
        }
        };
   
      deleteModalContainer.style.display = 'none'
    }
    declineDelBtn.onclick = () => {
      deleteModalContainer.style.display = 'none'
    } 
  } else if (item.classList[0] === 'edit-btn') {
    modalContainer.style.display = 'flex'
    addToCalendarBtn.innerText = 'Edit Event'
    addToCalendarBtn.classList.add(eventId)

       //Populate Modal with currEvent
       const currEvent = savedEvents.find(event => event.id === eventId)
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
}

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

 //Add Class names
 const id = Date.now()
 newDetailsItem.classList.add('details-item', `${id}`)
 newIcon.classList.add('fa-solid', 'fa-list')
 detailsTextCtnr.classList.add('details-text')
 detailsTitle.classList.add('details-title')
 detailsDate.classList.add('details-date')
 detailsTime.classList.add('details-time')
 editDeleteCtnr.classList.add('edit-delete')
 editBtn.classList.add('edit-btn','btn-sm', 'fa-solid', 'fa-pen-to-square')
 delBtn.classList.add('del-btn', 'btn-sm', 'fa-solid', 'fa-trash')

  //Get input values
 detailsTitle.innerText = detailsInput.value
 detailsDate.innerText = dateInput.value
 detailsTime.innerText = timeInput.value
  
  //Highlight on Calendar in real time
  const eventDay = dateInput.value.split('-')[2]
  for (let i = 0; i < daysContainer.length; i++){
    const p = daysContainer[i]
    if (eventDay < 10) {
      const singleDigitDay = eventDay.split('')[1]
      p.innerText === singleDigitDay && p.classList.add('event')
    } else {
       p.innerText === eventDay && p.classList.add('event')
    }
    };

  //Append Elements to DOM
  detailsTextCtnr.appendChild(detailsTitle)
  detailsTextCtnr.appendChild(detailsDate)
  detailsTextCtnr.appendChild(detailsTime)
  editDeleteCtnr.appendChild(editBtn)
  editDeleteCtnr.appendChild(delBtn)
  newDetailsItem.appendChild(newIcon)
  newDetailsItem.appendChild(detailsTextCtnr)
  newDetailsItem.appendChild(editDeleteCtnr)
  detailsContainer.appendChild(newDetailsItem)

 //Add Event to Localstorage
 saveToLocalStorage({
   detailsTitle: detailsInput.value,
   detailsDate: dateInput.value, 
   detailsTime: timeInput.value,
   id
 });

};

function updateEvent() {
  const eventId = addToCalendarBtn.classList[2]
   //Update the DOM / UI!
  const currEventsInDOM = document.querySelectorAll('.details-item');
  currEventsInDOM.forEach(event => {
    if (event.classList[1] == eventId) {
      event.children[1].children[0].innerText = detailsInput.value
      event.children[1].children[1].innerText = dateInput.value
      event.children[1].children[2].innerText = timeInput.value
      //Remove id number from button
      addToCalendarBtn.classList.remove(`${eventId}`);
    } else {
      return event
    }
  });
  //Update localstorage
  const savedEvents = JSON.parse(localStorage.getItem('events'))
  const updatedEvents = savedEvents.map(event => {
    if (event.id === Number(eventId)) {
      return {
        ...event,
        detailsTitle: detailsInput.value,
        detailsTime: timeInput.value,
        detailsDate:dateInput.value
      }
    } else {
      return event
    }
   })
  localStorage.setItem('events', JSON.stringify(updatedEvents));
 

}
//Add to Calendar or Edit Event Button
addToCalendarBtn.onclick = function (e) {
  e.preventDefault()
  if (addToCalendarBtn.innerText === 'Add to Calendar') {
  addCalendarEvent()
  } else {
    updateEvent();
}
modalContainer.style.display = 'none'
}

// Open Modal
openModalBtn.onclick = function (e) {
  addToCalendarBtn.innerText =  'Add to Calendar'
  modalContainer.style.display = 'flex'
}

//Close Modal
closeModalBtn.onclick = function (e) {
  e.preventDefault();
  modalContainer.style.display = 'none'
};

window.onclick = function (e) {
  if (e.target === modalContainer) {
    modalContainer.style.display = 'none'
   
  }
  if (e.target === deleteModalContainer) {
    deleteModalContainer.style.display = 'none'
  }
};








