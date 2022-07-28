import './style.css';

const urlScore = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/uB09yxigYMjYQjf4BYmA/scores';
const refresh = document.querySelector('.refresh');
const submit = document.querySelector('.submit-btn');
const list = document.querySelector('.list');

const display = ((arr) => {
  list.innerHTML = '';
  arr.forEach((element) => {
    list.innerHTML += `
      <li>${element.user} : ${element.score}</li>
       `;
  });
});

const getScores = (async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  display(data.result);
});

const addScore = (() => {
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
});

submit.addEventListener('click', () => {
  addScore();
});

refresh.addEventListener('click', () => {
  getScores(urlScore);
});