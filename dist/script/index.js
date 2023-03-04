const regionSelector = document.querySelector('.region__selector')
const regionList = document.querySelector('.regions__list')
const regionText = document.querySelector('.filter-text')

const themeSwitcher = document.querySelector('.theme-switcher-container')
const themeText = document.querySelector('#theme_text')
const moon = document.querySelector('.fa-moon')
const sun = document.querySelector('.fa-sun')

const countriesContainer = document.querySelector('.countries')
const search = document.querySelector('#search-country')

import jsonData from '/data.json' assert {type: 'json' }

regionSelector.addEventListener('click', () => {
   regionList.classList.toggle('list--invisible')
})
const formatNum = Intl.NumberFormat(navigator.language)
const matched = window.matchMedia('(prefers-color-scheme: dark)').matches

class App {
   constructor() {
      if (matched) this.switchTheme()
      window.addEventListener('load', this.renderCountries(jsonData))
      search.addEventListener('keyup', () => this.sortBySearch())
      search.addEventListener('keydown', () => this.countriesL())
      countriesContainer.addEventListener('click', (e) => this.setSessionStorage(e))
      themeSwitcher.addEventListener('click', this.switchTheme)
      regionList.addEventListener('click', (e) => {
         e.target.parentNode.focus()
         if (e.target.classList.contains('region')) {
            this.sortByRegion(e)
            regionList.classList.add('list--invisible')
         }
      })
   }
   renderCountries(countries) {
      countries.forEach(el => {
         const html =
            `<div class="country" data-country="${el.name}">
               <a href="countryDetails.html">
                  <div class="flag-container">
                     <img class="flag" src="${el.flags.png}" alt="flag_${el.name.split(' ').join('_')}">
                  </div>
                  <div class="country__details">
                     <h1>${el.name}</h1>
                     <div class="population">
                        <span class="text-bold">Population:</span>
                        <span>${formatNum.format(el.population)}</span>
                     </div>
                     <div class="region">
                        <span class="text-bold">Region:</span>
                        <span>${el.region}</span>
                     </div>
                     <div class="capital">
                        <span class="text-bold">Capital:</span>
                        <span>${el.capital}</span>
                     </div>
                  </div>
               </a>
            </div>`;
         countriesContainer.insertAdjacentHTML('beforeend', html)
      })
   }
   sortByRegion(e) {
      const region = e.target.textContent
      regionText.textContent = region

      const countries = document.querySelectorAll('.country')
      countries.forEach(el => el.remove())

      const filteredRegion = jsonData.filter(el => el.region === region)
      this.renderCountries(filteredRegion)
      search.value = ''
      this.countriesL
   }
   sortBySearch() {
      //Format search bar text
      const lowerCase = search.value.toLowerCase()
      const name = lowerCase.slice(0, 1).toUpperCase() + lowerCase.slice(1)

      if (search.value === '') this.renderCountries(jsonData)

      regionText.textContent = 'Filter by Region'

      const countries = document.querySelectorAll('.country')
      countries.forEach(el => el.remove())
      const filteredSearch = jsonData.filter(el => el.name.match(name))
      console.log(filteredSearch);

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
