const countryFlag = document.querySelector('#country-flag');
const countryName = document.querySelector('#country-name');
const list1 = document.querySelector('#list-1');
const list2 = document.querySelector('#list-2');
const borderCountriesContainer = document.querySelector('#border-countries div');

window.addEventListener('DOMContentLoaded', async () => {
    const code = sessionStorage.getItem('callingCode');

    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();

    const country = data[0];
    const countryCurrencies = country.currencies;
    const countryLanguages = country.languages;
    const borderCountries = [];

    let currencies = '';
    let languages = '';

    console.log(country)

    if (country.borders) {
        country.borders.forEach(borderCountryCode => borderCountries.push(fetch('https://restcountries.com/v3.1/alpha/' + borderCountryCode)
            .then(res => res.json())
            .then(data => data)));
    }

    for (const currency in countryCurrencies) currencies += country.currencies[currency].name + ', ';
    for (const language in countryLanguages) languages += countryLanguages[language] + ', ';

    countryFlag.src = country.flags.png;
    countryName.innerText = country.name.common;

    list1.innerHTML = `
        <li>Population: <span>${country.population}</span></li>
        <li>Region: <span>${country.region}</span></li>
        <li>Sub Region: <span>${country.subregion}</span></li>
        <li>Capital: <span>${country.capital[0]}</span></li>
    `;

    list2.innerHTML = `
        <li>Currencies: <span>${currencies}</span></li>
        <li>Languages: <span>${languages}</span></li>
    `;

    if (country.borders) {
        Promise.all(borderCountries)
        .then(countries => {
            countries.forEach(country => {
                const div = document.createElement('div');

                div.className = 'border-country shadow';
                div.innerText = country[0].name.common;

                borderCountriesContainer.appendChild(div);
            })
        })
        .catch(err => console.log(err));
    } else borderCountriesContainer.parentElement.style.display = 'none';
});