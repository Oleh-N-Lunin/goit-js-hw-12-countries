import countriesCard from '../templates/country-cards.hbs';
import countriesList from '../templates/country-list.hbs';
import OnSerch from './fetch-function.js';
import { error } from './allert.js';
const debounce = require('lodash.debounce');
const containerCard = document.querySelector('.formCard');
const inputEl = document.querySelector('.search');

inputEl.addEventListener('input', debounce(onSerchCountries, 500));
const onSerch = new OnSerch();

function onSerchCountries(e) {
  clearContainer();
  if (e.target.value.length < 1) {
    return;
  }
  onSerch.query = e.target.value;
  onSerch
    .serchCountries()
    .then(createMarkup)
    .catch(error => {
      alert('BLA BLA');
    });
}

function createMarkup(data) {
  if (data.length === 1) {
    createMarkupCard(data);
  } else if (data.length > 1 && data.length <= 10) {
    createMarkupList(data);
  } else if (data.length > 10) {
    error({
      title: 'Too many!',
      delay: 2000,
    });
  }
}

function createMarkupCard(data) {
  const markup = countriesCard(data);
  containerCard.insertAdjacentHTML('beforeend', markup);
}
function createMarkupList(data) {
  const markup = countriesList(data);
  containerCard.insertAdjacentHTML('beforeend', markup);
}
function clearContainer() {
  containerCard.innerHTML = '';
}