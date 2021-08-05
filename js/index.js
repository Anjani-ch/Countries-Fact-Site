const input = document.querySelector('input')
const filter = document.querySelector('#filter')
const countriesContainer = document.querySelector('#countries')

const addCountry = country => {
    const div = document.createElement('div')

    div.className = 'country shadow pointer'
    div.setAttribute('data-code', country.callingCodes[0])

    div.innerHTML = `
            <img src="${country.flag}">
            <div>
                <h3>${country.name}</h3>
                <ul>
                    <li>Population: <span>${country.population}</span></li>
                    <li>Region: <span>${country.region}</span></li>
                    <li>Capital: <span>${country.capital}</span></li>
                </ul>
            </div>
        `

    countriesContainer.appendChild(div)
}

input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        fetch('https://restcountries.eu/rest/v2/name/' + e.target.value)
            .then(res => res.json())
            .then(countries => {
                countriesContainer.innerHTML = ''

                countries.forEach(country => addCountry(country))
            })
    }
})

filter.addEventListener('click', e => {
    if (e.target.id === 'selected') {
        if (e.target.classList.contains('selected-active')) e.target.parentElement.children[1].style.display = 'none'
        else e.target.parentElement.children[1].style.display = 'block'

        e.target.classList.toggle('selected-active')
    } else if (e.target.classList.contains('option')) {
        let wantedRegion = e.target.innerText

        fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(countries => {
                e.target.parentElement.classList.remove('selected-active')
                e.target.parentElement.style.display = 'none'
                countriesContainer.innerHTML = ''

                if (input.value !== '') {
                    countries.forEach(country => country.name.toLowerCase().includes(input.value.toLowerCase()) && country.region === wantedRegion ? addCountry(country) : '')
                } else {
                    countries.forEach(country => country.region === wantedRegion ? addCountry(country) : '')
                }
            })
    }
})

countriesContainer.addEventListener('click', e => {
    if (e.target.classList.contains('country') || e.target.classList.contains('country') || e.target.parentElement.classList.contains('country') || e.target.parentElement.parentElement.classList.contains('country') || e.target.parentElement.parentElement.parentElement.classList.contains('country') || e.target.parentElement.parentElement.parentElement.parentElement.classList.contains('country')) {
        const code = e.target.getAttribute('data-code') || e.target.getAttribute('data-code') || e.target.parentElement.getAttribute('data-code') || e.target.parentElement.parentElement.getAttribute('data-code') || e.target.parentElement.parentElement.parentElement.getAttribute('data-code') || e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-code')

        sessionStorage.setItem('callingCode', code)
        window.location.href = 'html/singleCountry.html'
    }
})

addEventListener('click', e => {
    if (e.target.id !== 'selected') {
        filter.children[0].classList.remove('selected-active')
        filter.children[1].style.display = 'none'
    }
})

addEventListener('DOMContentLoaded', async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json()

    countries.forEach(country => addCountry(country))
})