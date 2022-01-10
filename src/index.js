import './css/styles.css';
import Notiflix from 'notiflix';
import { debounce } from 'debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

const cardsCountryUl = countries => {
  console.log(countries);
  const markup = countries
    .map(({ name, flags }) => {
      return `
    <ul class="country-list">
    <img src="${flags.png}" alt="">
    <h1>${name.official}</h1>
    </ul>`;
    })
    .join('');
  return markup;
};

const cardsCountryDiv = countries => {
  console.log(countries);
  const markup = countries
    .map(({ name, capital, population, languages, flags }) => {
      return `
<li>
      <div class="country-info">
      <img src="${flags.png}" alt="">
        <h1>${name.official}</h1>
        <div>${capital[0]}</div>
        <div>${population}</div>
        <div>${Object.values(languages).join(', ')}</div>
      </div>
    </li>`;
    })
    .join('');
  return markup;
};
