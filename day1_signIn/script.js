let groupChecks = document.getElementsByName('gender-check');
let maleCheck = document.getElementById('male');
let femaleCheck = document.getElementById('female');

maleCheck.onchange = ()=>{
  femaleCheck.checked = false;
}

femaleCheck.onchange = () => {
  maleCheck.checked = false;
}


