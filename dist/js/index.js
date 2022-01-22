const countriesContainer = document.querySelector('#countries');
const filter = document.querySelector('#filter');
const input = document.querySelector('input');

const endpoint = 'https://restcountries.com/v3.1';

const addCountry = country => {
    const div = document.createElement('div');

    div.className = 'country shadow pointer';
    div.setAttribute('data-code', country.cca2);

    div.innerHTML = `
        <img src="${country.flags.png}">
        <div>
            <h3>${country.name.common}</h3>
        </div>
    `;

    countriesContainer.appendChild(div);
};

input.addEventListener('keyup', async e => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
        const res = await fetch(`${endpoint}/name/${e.target.value}`);
        const countries = await res.json();

        countriesContainer.innerHTML = '';
        countries.forEach(country => addCountry(country));
    }
});

filter.addEventListener('click', async e => {
    const selectedEl = document.querySelector('#selected');
    const selectedElIcon = document.querySelector('[name=chevron-down-outline]');

    if (selectedEl.id === 'selected' || e.target.name === selectedElIcon.name) {
        const option = document.querySelector('#options');

        if (selectedEl.classList.contains('selected-active') || selectedElIcon.parentElement.classList.contains('selected-active')) option.style.display = 'none';
        else option.style.display = 'block';

        if (selectedEl.id === 'selected') selectedEl.classList.toggle('selected-active');
        else if (e.target.name === selectedElIcon.name) selectedElIcon.parentElement.classList.toggle('selected-active');
    }
    
    if (e.target.classList.contains('option')) {
        const option = e.target;
        const wantedRegion = option.getAttribute('data-region');

        const res = await fetch(`${endpoint}/region/${wantedRegion}`);
        const countries = await res.json();

        option.parentElement.classList.remove('selected-active');
        option.parentElement.style.display = 'none';
        countriesContainer.innerHTML = '';

        if (input.value.trim() !== '') countries.forEach(country => country.name.common.toLowerCase().includes(input.value.toLowerCase()) && country.region.toLowerCase() === wantedRegion.toLowerCase() ? addCountry(country) : '');
        else countries.forEach(country => country.region.toLowerCase() === wantedRegion.toLowerCase() ? addCountry(country) : '');
    }
})

countriesContainer.addEventListener('click', e => {
    if (e.target.classList.contains('country') || e.target.parentElement.classList.contains('country') || e.target.parentElement.parentElement.classList.contains('country')) {
        const code = e.target.getAttribute('data-code') || e.target.parentElement.getAttribute('data-code') || e.target.parentElement.parentElement.getAttribute('data-code');

        sessionStorage.setItem('callingCode', code);
        window.location.href = 'html/singleCountry.html';
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch(endpoint + '/all');
    const countries = await res.json();

    countries.forEach(country => addCountry(country));
});

window.addEventListener('click', e => {
    if (e.target.id !== 'selected' || e.target.name === 'chevron-down-outline') {
        filter.children[0].classList.remove('selected-active');
        filter.children[1].style.display = 'none';
    }
});