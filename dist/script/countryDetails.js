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
            <div class="country__details">
               <div class="flag-container">
                  <img src="${country.flags.svg}" alt="">
               </div>
               <div class="sections">
                  <div class="section section1">
                     <h1>${country.name}</h1>
                     <div class="native-name">
                        <span class="text-medium">Native Name:</span>
                        <span>${country.nativeName}</span>
                     </div>
                     <div class="population">
                        <span class="text-medium">Population:</span>
                        <span>${formatNum.format(country.population)}</span>
                     </div>
                     <div class="region">
                        <span class="text-medium">Region:</span>
                        <span>${country.region}</span>
                     </div>
                     <div class="sub-region">
                        <span class="text-medium">Sub Region:</span>
                        <span>${country.subregion}</span>
                     </div>
                     <div class="capital">
                        <span class="text-medium">Capital:</span>
                        <span>${country.capital}</span>
                     </div>
                  </div>
                  <div class="section section2">
                     <div class="top-level-domain">
                        <span class="text-medium">Top Level Domain:</span>
                        <span>${country.topLevelDomain}</span>
                     </div>
                     <div class="currencies">
                        <span class="text-medium">Currencies:</span>
                        <span>${country.currencies[0].name}</span>
                     </div>
                     <div class="languages">
                        <span class="text-medium">Languages:</span>
                        <span>${country.languages[0].name}</span>
                     </div>
                  </div>
               </div>
            </div>`;
      countryData.insertAdjacentHTML('beforeend', html)
      if (country.borders) this.insertBorder(country)
   }
   insertBorder(country) {
      const sections = document.querySelector('.sections')
      sections.insertAdjacentHTML('beforeend',
         `<div class="border__countries">
            <h1>Border Countries:</h1>
            <div class="borders"></div>
         </div>`
      );
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
