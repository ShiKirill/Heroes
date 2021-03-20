'use strict';
let row = document.querySelector('.row');
const filmFilter = document.getElementById('filmFilter');

const createItem = (photo, name, realName, movies, status) => {
  if (!name) {
    name = 'Неизвестно';
  }
  if (!realName) {
    realName = 'Неизвестно';
  }
  if (!status) {
    status = 'Неизвестно';
  }
  let films = '';
  if (movies) {
    movies.forEach(item => {
      films += `<li class="films-list-item">${item}</li>
      `;
    });
  }
  const newElem = `
    <div class="row-item">
        <div class="main-info clearfix">
          <img src="${photo}" alt="Heroes-photo" class="hero-photo clearfix">
          <h1 class="name">Имя: <b>${name}</b></h1>
        </div>
        <div class="descrip-item">
          <button class="show-content-button"><img class="arrow" src="img/iconfinder_icon-ios7-arrow-down_211687.svg" alt="Arrow-down" 
            style="vertical-align: middle"></button>
          <p class="description">Подробная информация.</p>
        </div>
    <div class="pop-up">
    <h2 class="real-name">Настоящее имя: <b>${realName}</b></h2>
    <ul class="films-list">Список фильмов:
      ${films}
    </ul>
    <p class="status">Статус: ${status}</p>
    `;

  return newElem;
};

const showBoard = (data) => {
  data.forEach((item) => {
    row.insertAdjacentHTML('beforeend', createItem(item.photo, item.name, item.actors, item.movies, item.status));
  });
};

const filter = (data, compareWord) => {
  row.innerHTML = ''
  if (compareWord !== 'default') {
    let filteredData = [];
    data.forEach(item => {
      if (item.movies) {
        if (item.movies.find(item => item.indexOf(compareWord) !== -1)) {
          filteredData.push(item);
        }
      }
    })
    showBoard(filteredData);
  } else {
    showBoard(data);
  }

}

const eventListeners = (data) => {
  document.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains('arrow')) {
      if (target.closest('.row-item').querySelector('.pop-up').style.display === "block") {
        target.closest('.row-item').querySelector('.pop-up').style.display = "none";
        target.closest('.row-item').querySelector('.pop-up').classList.remove('pop-up-active');
      } else {
        setTimeout(() => { target.closest('.row-item').querySelector('.pop-up').classList.add('pop-up-active'); }, 50);
        target.closest('.row-item').querySelector('.pop-up').style.display = "block";
      }
      target.closest('.row-item').classList.toggle('row-item-active');
      target.classList.toggle('btn-reverse');

    }
  });

  filmFilter.addEventListener('input', () => {
    filter(data, filmFilter.value);
  })
};

const request = new XMLHttpRequest();
request.open('GET', 'dbHeroes.json');
request.addEventListener('readystatechange', () => {
  if (request.readyState !== 4) {
    return;
  }
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    showBoard(data);
    eventListeners(data);
  }
});
request.send();