const go = document.getElementById('search')
const searchedCity = document.getElementById('searched-city')
const cityandDate = document.getElementById('City-Name')
const currentTemp = document.getElementById('temp-now')
const currentHumid = document.getElementById('humidity-now')
const currentWindSpeed = document.getElementById('windSpeed-now')

const dayOneDate = document.getElementById('date-1')
const dayOneTemp = document.getElementById('temp-1')

const dayTwoDate = document.getElementById('date-2')
const dayTwoTemp = document.getElementById('temp-2')

const dayThreeDate = document.getElementById('date-3')
const dayThreeTemp = document.getElementById('temp-3')

const dayFourDate = document.getElementById('date-4')
const dayFourTemp = document.getElementById('temp-4')

const dayFiveDate = document.getElementById('date-5')
const dayFiveTemp = document.getElementById('temp-5')

function getCityWeather(){
  const city = searchedCity.value
  searchedCity.value = ''
  //Current weather Data...
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ city+ '&appid=4ea50440fd38b825261f9d5a75d05195&units=imperial').then(function(response){
    console.log('response, waiting to parse...', response)
    return response.json()
  }).then(function(data){

    var tempreture = data.main.temp
    let unix_timestamp = data.dt
    var fullDate = formatDate(unix_timestamp)
    cityandDate.innerHTML = `${data.name} (${fullDate})`
    currentTemp.innerHTML = `Tempreture : ${tempreture}° F`
    currentHumid.innerHTML = `Humidity: ${data.main.humidity}`
    currentWindSpeed.innerHTML = `Wind Speed: ${data.wind.speed} MPH`

  })

  //Five day forcast data...
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=4ea50440fd38b825261f9d5a75d05195&units=imperial').then(function(response){
    console.log('response, waiting to parse...', response)
    return response.json()
  })
  .then(function(data){
    console.log("Data parsed...")
    console.log(data)
    console.log(data.city.name)
    let unix_firstStamp = data.list[8].dt
    let aDateOne = formatDate(unix_firstStamp)
    dayOneDate.innerHTML = aDateOne
    dayOneTemp.innerHTML = `Temp: ${data.list[8].main.temp} °F`

    let unix_secondStamp = data.list[16].dt
    let aDatetwo = formatDate(unix_secondStamp)
    dayTwoDate.innerHTML = aDatetwo
    dayTwoTemp.innerHTML = `Temp: ${data.list[16].main.temp} °F`

    let unix_thirdStamp = data.list[24].dt
    let aDatethree = formatDate(unix_thirdStamp)
    dayThreeDate.innerHTML = aDatethree
    dayThreeTemp.innerHTML = `Temp: ${data.list[24].main.temp} °F`

    let unix_fourthStamp = data.list[32].dt
    let aDatefour = formatDate(unix_fourthStamp)
    dayFourDate.innerHTML = aDatefour
    dayFourTemp.innerHTML = `Temp: ${data.list[32].main.temp} °F`

    let unix_fiveStamp = data.list[39].dt
    let aDatefive = formatDate(unix_fiveStamp)
    dayFiveDate.innerHTML = aDatefive
    dayFiveTemp.innerHTML = `Temp: ${data.list[39].main.temp} °F`

  }).catch(function(error){
    console.log("oh no!!!", error)
  })
}

function formatDate(timeStamp){
  var date = new Date(timeStamp * 1000);
  var year = date.getFullYear()
  var month = date.getMonth()
  var day = date.getDate()
  var readableDate = `${month + 1}/${day}/${year}`
  return readableDate
}


go.addEventListener('click', getCityWeather )
