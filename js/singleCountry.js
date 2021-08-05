const countryFlag = document.querySelector('#country-flag')
const countryName = document.querySelector('#country-name')
const list1 = document.querySelector('#list-1')
const list2 = document.querySelector('#list-2')
const borderCountriesContainer = document.querySelector('#border-countries div')

fetch('http://restcountries.eu/rest/v2/callingcode/' + sessionStorage.getItem('callingCode'))
    .then(res => res.json())
    .then(data => {
        let country = data[0]
        let currencies = ''
        let languages = ''
        let borderCountries = []

        country.borders.forEach(border => borderCountries.push(fetch('https://restcountries.eu/rest/v2/alpha?codes=' + border)
            .then(res => res.json())
            .then(data => data)))

        country.currencies.forEach(currency => currencies += currency.code + ', ')
        country.languages.forEach(language => languages += language.name + ', ')

        countryFlag.src = country.flag
        countryName.innerText = country.name

        list1.innerHTML = `
            <li>Native Name: <span>${country.nativeName}</span></li>
            <li>Population: <span>${country.population}</span></li>
            <li>Region: <span>${country.region}</span></li>
            <li>Sub Region: <span>${country.subregion}</span></li>
            <li>Capital: <span>${country.capital}</span></li>
        `

        list2.innerHTML = `
            <li>Top Level Domain: <span>${country.topLevelDomain[0]}</span></li>
            <li>Currencies: <span>${currencies}</span></li>
            <li>Languages: <span>${languages}</span></li>
        `

        Promise.all(borderCountries)
            .then(countries => {
                countries.forEach(country => {
                    const div = document.createElement('div')

                    div.className = 'border-country shadow'
                    div.innerText = country[0].name

                    borderCountriesContainer.appendChild(div)
                })
            })
            .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

// http://restcountries.eu/rest/v2/callingcode/{callingCode}