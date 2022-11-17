const maleCheck = document.getElementById('male');
const femaleCheck = document.getElementById('female');

maleCheck.onchange = () => {
  femaleCheck.checked = false;
}

femaleCheck.onchange = () => {
  maleCheck.checked = false;
}