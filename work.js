document.addEventListener('DOMContentLoaded', function() {

  const expandButtons = document.getElementsByClassName('expandCard');

  for (let i = 0; i < expandButtons.length; i++) {
    expandButtons[i].addEventListener('click', function() {
      if (expandButtons[i].textContent == '+') {
        expandButtons[i].textContent = '-';
      } else {
        expandButtons[i].textContent = '+';
      }
    });
  }

});
