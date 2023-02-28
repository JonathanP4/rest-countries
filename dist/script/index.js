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
      window.addEventListener('load', this.renderCountries)
      search.addEventListener('keyup', this.sortBySearch)
      themeSwitcher.addEventListener('click', this.switchTheme)
      regionList.addEventListener('click', (e) => {
         e.target.parentNode.focus()
         if (e.target.classList.contains('region')) {
            this.sortByRegion(e)
            regionList.classList.add('list--invisible')
         }
      })
   }
   renderCountries() {
      jsonData.forEach(el => {
         const html =
            `<div class="country">
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
            </div>`;
         countriesContainer.insertAdjacentHTML('beforeend', html)
      })
   }
   sortByRegion(e) {
      const region = e.target.textContent
      regionText.textContent = region

      const countries = document.querySelectorAll('.country')
      countries.forEach(el => el.remove())

      jsonData.filter(el => el.region === region)
         .forEach(el => {
            const html =
               `<div class="country">
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
               </div>`;
            countriesContainer.insertAdjacentHTML('beforeend', html)
         })
   }
   sortBySearch() {
      //Format search bar text
      const lowerCase = search.value.toLowerCase()
      const name = lowerCase.slice(0, 1).toUpperCase() + lowerCase.slice(1)

      if (name === '') this.renderCountries

      regionText.textContent = 'Filter by Region'
      const countries = document.querySelectorAll('.country')
      countries.forEach(el => el.remove())
      console.log(jsonData.filter(el => el.name.match(name)));
      jsonData.filter(el => el.name.match(name))
         .forEach(el => {
            const html =
               `<div class="country">
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
            </div>`;
            countriesContainer.insertAdjacentHTML('beforeend', html)
         })
   }
   switchTheme() {
      document.body.classList.toggle('dark-mode')
      moon.classList.toggle('invisible')
      sun.classList.toggle('invisible')

      themeText.textContent =
         `${document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode'}`;
   }
}
const app = new App()
