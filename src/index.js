import './style.css';

const urlScore = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/uB09yxigYMjYQjf4BYmA/scores';
const refresh = document.querySelector('.refresh');
const submit = document.querySelector('.submit-btn');
const list = document.querySelector('.list');

function display(arr) {
  list.innerHTML = '';
  arr.forEach((element) => {
    list.innerHTML += `
      <li>${element.user} : ${element.score}</li>
       `;
  });
}

async function getScores(url) {
  const response = await fetch(url);
  let data = await response.json();
  console.log(data.result);
  display(data.result);
}

function addScore() {
  const nameInput = document.querySelector('.input-name');
  const scoreInput = document.querySelector('.input-score');
  fetch(urlScore, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      user: `${nameInput.value}`,
      score: `${scoreInput.value}`,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  nameInput.value = '';
  scoreInput.value = '';
}

submit.addEventListener('click', () => {
  addScore();
});

refresh.addEventListener('click', () => {
  getScores(urlScore);
});