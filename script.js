const go = document.getElementById('search')
const searchedCity = document.getElementById('searched-city')


function getCityWeather(){
  console.log(searchedCity.value)
  searchedCity.value = ''
}


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Florida&appid=4ea50440fd38b825261f9d5a75d05195&units=imperial', {
}).then(function(response){
  console.log('response, waiting to parse...', response)
  return response.json()
})
.then(function(data){
  console.log("Data parsed...")
  console.log(data)
  console.log(data.city.name)
  console.log(data.list[2].main.feels_like)
}).catch(function(error){
  console.log("oh no!!!", error)
})

go.addEventListener('click', getCityWeather )
