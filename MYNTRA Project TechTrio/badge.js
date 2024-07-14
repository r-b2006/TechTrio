function showPopup(event) {
  var mainDiv = event.target;
  var popupId = mainDiv.getAttribute('data-popup');
  var popupDiv = document.getElementById(popupId);
  popupDiv.style.display = popupDiv.style.display === 'block' ? 'none' : 'block';
}

const urlParams = new URLSearchParams(window.location.search);
const username3 = urlParams.get('username');
const p = document.querySelector(".fullp");
p.innerText = `HI ${username3}!`;