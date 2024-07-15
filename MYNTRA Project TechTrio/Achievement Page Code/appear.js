
document.addEventListener("DOMContentLoaded", function() {
    const badgeContainer = document.querySelector('.badge-container');
    badgeContainer.classList.add('show-badge');
});

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const p = document.querySelector(".indexp");
p.innerText = `HI ${username}!`;

function nextslide() {
    const username2 = username;
    window.location.href = `badge.html?username=${username2}`;
  }

