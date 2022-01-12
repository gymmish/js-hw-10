const fetchCountries = countryName => {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages `,
  ).then(response => {
    if (response.status === 404) {
      return Promise.reject(new Error(`Oops, there is no country with that name`));
    }
    return response.json();
  });
};

export { fetchCountries };
