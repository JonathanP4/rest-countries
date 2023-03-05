const regionSelector = document.querySelector('.region__selector')
const regionList = document.querySelector('.regions__list')
const regionText = document.querySelector('.filter-text')

const themeSwitcher = document.querySelector('.theme-switcher-container')
const themeText = document.querySelector('#theme_text')
const moon = document.querySelector('.fa-moon')
const sun = document.querySelector('.fa-sun')

const countriesContainer = document.querySelector('.countries')
const search = document.querySelector('#search-country')

const fetchData = await fetch('https://restcountries.com/v3.1/all')
const jsonData = await fetchData.json()

regionSelector.addEventListener('click', () => {
   regionList.classList.toggle('list--invisible')
})
const formatNum = Intl.NumberFormat(navigator.language)
const matched = window.matchMedia('(prefers-color-scheme: dark)').matches

class App {
   constructor() {
      if (matched) this.switchTheme()
      this.renderCountries(jsonData)
      search.addEventListener('keyup', () => this.sortBySearch())
      search.addEventListener('keydown', this.countriesL)
      countriesContainer.addEventListener('click', (e) => this.setSessionStorage(e))
      themeSwitcher.addEventListener('click', this.switchTheme)
      regionList.addEventListener('click', (e) => {
         if (e.target.classList.contains('region')) {
            this.sortByRegion(e)
            regionList.classList.add('list--invisible')
         }
      })
   }
   renderCountries(countries) {
      countries.forEach(country => {
         const html =
            `<div class="country" data-country="${country.name.common}">
               <a href="countryDetails.html">
                  <div class="flag-container">
                     <img class="flag" src="${country.flags.png}" alt="flag_${country.name.common}">
                  </div>
                  <div class="country__details">
                     <h1>${country.name.common}</h1>
                     <div class="population">
                        <span class="text-bold">Population:</span>
                        <span>${formatNum.format(country.population)}</span>
                     </div>
                     <div class="region">
                        <span class="text-bold">Region:</span>
                        <span>${country.region}</span>
                     </div>
                     <div class="capital">
                        <span class="text-bold">Capital:</span>
                        <span>${country.capital}</span>
                     </div>
                  </div>
               </a>
            </div>`;
         countriesContainer.insertAdjacentHTML('beforeend', html)
      })
   }
   //hm
   sortByRegion(e) {
      const region = e.target.textContent
      regionText.textContent = region

      countriesContainer.innerHTML = ''

      const filteredRegion = jsonData.filter(el => el.region === region)
      this.renderCountries(filteredRegion)
   }
   sortBySearch() {
      //Format search bar text
      const lowerCase = search.value.toLowerCase()
      const name = lowerCase.slice(0, 1).toUpperCase() + lowerCase.slice(1)

      if (name === '') this.renderCountries

      regionText.textContent = 'Filter by Region'
      countriesContainer.innerHTML = ''

      const filteredSearch = jsonData.filter(el => el.name.common.match(name))
      this.renderCountries(filteredSearch)
   }
   countriesL() {
      if (window.innerWidth >= 1230)
         setTimeout(() => {
            const countries = document.querySelectorAll('.country')
            if (countries.length === 1) {
               countriesContainer.style.gridTemplateColumns = 'repeat(1, auto)'
            } else {
               countriesContainer.style.gridTemplateColumns = 'repeat(4, auto)'
            }
         }, 100);
   }
   switchTheme() {
      document.body.classList.toggle('dark-mode')
      moon.classList.toggle('invisible')
      sun.classList.toggle('invisible')

      themeText.textContent =
         `${document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode'}`;
   }
   setSessionStorage(e) {
      const country = e.target.closest('.country').dataset.country
      sessionStorage.setItem('country', country)
   }
}
const app = new App()
//# sourceMappingURL=index.js.map
