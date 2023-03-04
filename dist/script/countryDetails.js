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
               </div>
            </div>`;
      if (country.borders) {
         html +=
            `<div class="border__countries">
            <h1>Border Countries:</h1>
            <div class="borders">
            </div>
         </div>`;
      };
      countryData.insertAdjacentHTML('beforeend', html)
      if (country.borders) {
         const bordersContainer = document.querySelector('.borders')
         country.borders.forEach((_, i) => {
            if (i < 3)
               bordersContainer.insertAdjacentHTML('beforeend',
                  `<div class="border">${this.borderName(country.borders[i])}</div>`
               )
         })
         bordersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('border')) this.renderBorder(e)
         })
      }
   }
   borderName(border) {
      const [matches] = jsonData.filter(el => el.alpha3Code === border)
      return matches.name.replace(/\(.*/gi, '');
   }
   renderBorder(e) {
      const neighbourName = e.target.textContent
      const [neighbour] = jsonData.filter(el => el.name.match(neighbourName))
      countryData.innerHTML = ''
      this.renderCountry(neighbour)
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
