const regionSelector = document.querySelector('.region__selector')
const regionList = document.querySelector('.regions__list')
const countriesContainer = document.querySelector('.countries')

import jsonData from '/data.json' assert {type: 'json' }

regionSelector.addEventListener('click', () => {
   regionList.classList.toggle('list--invisible')
})

const formatNum = Intl.NumberFormat(navigator.language)

class App {
   constructor() {
      window.addEventListener('load', this.renderCountries)
      regionList.addEventListener('click', (e) => {
         if (e.target.classList.contains('region')) {
            this.sortByRegion(e)
            regionList.classList.add('list--invisible')
         }
      })
   }
   renderCountries() {
      const data = jsonData
      jsonData.forEach(el => {
         const html =
            `<div class="country">
               <img src="${el.flag}" alt="flag">
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
      const matchesRegion = []
      const countries = document.querySelectorAll('.country')

      countries.forEach(el => el.remove())
      jsonData.forEach(el => { if (el.region === region) matchesRegion.push(el) })

      matchesRegion.forEach(el => {
         const html =
            `<div class="country">
               <img src="${el.flag}" alt="flag">
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
}
const app = new App()
