const countryData = document.querySelector('.country-data')
const themeSwitcher = document.querySelector('.theme-switcher-container')
const themeText = document.querySelector('#theme_text')
const moon = document.querySelector('.fa-moon')
const sun = document.querySelector('.fa-sun')
const backBtn = document.querySelector('.back-btn')

import jsonData from '/data.json' assert {type: 'json' }

const matched = window.matchMedia('(prefers-color-scheme: dark)').matches

const formatNum = Intl.NumberFormat(navigator.language)

class App {
   constructor() {
      if (matched) this.switchTheme()
      themeSwitcher.addEventListener('click', this.switchTheme)
      window.addEventListener('load', () => {
         const countryName = sessionStorage.getItem('country')
         const [curCountry] = jsonData.filter(el => el.name === countryName)
         this.renderCountry(curCountry)
      })
      backBtn.addEventListener('click', function () {
         history.back()
      })
   }
   renderCountry(country) {
      let html = `
      <div class="flag-container">
               <img src="${country.flags.png}" alt="">
            </div>
            <div class="country__details">
               <h1>${country.name}</h1>
               <div class="native-name">
                  <span class="text-bold">Native Name:</span>
                  <span>${country.nativeName}</span>
               </div>
               <div class="population">
                  <span class="text-bold">Population:</span>
                  <span>${formatNum.format(country.population)}</span>
               </div>
               <div class="region">
                  <span class="text-bold">Region:</span>
                  <span>${country.region}</span>
               </div>
               <div class="sub-region">
                  <span class="text-bold">Sub Region:</span>
                  <span>${country.subregion}</span>
               </div>
               <div class="capital">
                  <span class="text-bold">Capital:</span>
                  <span>${country.capital}</span>
               </div>
               <div class="top-level-domain">
                  <span class="text-bold">Top Level Domain:</span>
                  <span>${country.topLevelDomain}</span>
               </div>
               <div class="currencies">
                  <span class="text-bold">Currencies:</span>
                  <span>${country.currencies[0].name}</span>
               </div>
               <div class="languages">
                  <span class="text-bold">Languages:</span>
                  <span>${country.languages[0].name}</span>
               </div>`;
      if (country.borders) {
         html +=
            `<div class="border__countries">
            <h1>Border Countries:</h1>
            <div class="borders">
               <div class="border">${country.borders[0]}</div>
               <div class="border">${country.borders[1]}</div>
               <div class="border">${country.borders[2]}</div>
            </div>
         </div>`;
      };
      countryData.insertAdjacentHTML('beforeend', html)
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
