import './css/styles.css';
import Notiflix from 'notiflix';
import { debounce } from 'debounce';
import { fetchCountries } from './fechCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};

const countryList = countries => {
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

const countryCard = countries => {
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

const errorSearch = error => {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
};

function base(e) {
  e.preventDefault();
  const countryName = e.target.value;

  if (!countryName) {
    refs.countryList.innerHTML = ' ';
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 0 && data.length < 10) {
        const markupList = countryList(data);
        refs.countryList.innerHTML = markupList;
        return;
      }
      if (data.length > 10) {
        Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
      }
      if (data.length === 1) {
        const markupCard = countryCard(data);
        refs.countryList.innerHTML = markupCard;
        return;
      }
    })
    .catch(error => errorSearch(error));
}

refs.input.addEventListener('input', debounce(base, DEBOUNCE_DELAY));
