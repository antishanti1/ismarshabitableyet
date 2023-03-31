class WeatherToday{
  constructor(todayCards){
    this.todayCards = todayCards;
  }
  renderCards(cards) {
    let str = ''
    cards.forEach( e=>{
      str+=e.render()
    })
    return str;
  }
  render(){
    return `${this.renderCards(this.todayCards)}`
  }
}
class TodayCard{
  constructor(head, tag){
    this.head = head;
    this.tag = tag;
  }
  render(){
    return`
    <div class="weather__today-box">
        <h2>${this.head}</h2>
        <hr>
        <p>${this.tag}</p>
    </div> 
    `
  }
}

class WeatherWeek{
  constructor(weekCards) {
    this.weekCards = weekCards;
  }
  renderCards(cards) {
    let str = ''
    cards.forEach( e=>{
      str+=e.render()
    })
    return str;
  }
  render(){
    return `${this.renderCards(this.weekCards)}`
  }
}
class WeekCard{
  constructor(solStr, dateStr, high, low) {
    this.solStr = solStr;
    this.dateStr = dateStr;
    this.high = high;
    this.low = low;
  }
  render(){
    return`
    <div class="weather__day">
        <p>sol ${this.solStr}</p>
        <p>${this.dateStr}</p>
        <hr>
        <p>high: ${this.high} F</p>
        <p>low: ${this.low} F</p>
    </div>`
  }
}

const url = "http://api.weatherapi.com/v1"

const key = "?key=556a1be4916c42bdaf7142305233103"
const param = "&q=Beersheba&days=7"

//Forecast for the next 7 days.
//forecastArr[0] = today
let forecastArray = []; 
axios.get(`${url}/forecast.json${key}${param}`)
.then((result) => {
    console.log(result)
    var forecastObj = result.data.forecast.forecastday;
    //Iterates through the days.
    for(const key in forecastObj){
        forecastArray.push(forecastObj[`${key}`]["day"])
        console.table(forecastArray);
    }

    const today = new Date();
    const start = new Date(`February 28, 2023`);
    let sol = Math.floor(Math.floor((today - start))/(1000*60*60*24));
    
    console.log(sol)
    const dateOptions = {month:"long", day:"numeric", year:"numeric"};
    const todayWeatherDateCard = new TodayCard(`sol ${sol}`, `${today.toLocaleDateString('en-us',dateOptions)}`) 
    const todayWeatherTempCard = new TodayCard(`high ${forecastArray[0].maxtemp_f} F`, `low ${forecastArray[0].mintemp_f} F`);
    const todayWeather = new WeatherToday([todayWeatherDateCard, todayWeatherTempCard]);

    const milliDay = 8.64e+7;
    let weekCardsArr = []
    for(let i = 0; i < 7; i++){
      const weekCard = new WeekCard(sol, today.toLocaleDateString('en-us',dateOptions), forecastArray[i].maxtemp_f, forecastArray[0].mintemp_f);
      sol++;
      today.setDate(today.getDate()+1);
      weekCardsArr.push(weekCard);
    }
    const weekWeather = new WeatherWeek(weekCardsArr);

    const todaysWeather = document.querySelector(".weather__today");
    todaysWeather.innerHTML = todayWeather.render(); 
    const weatherForecast = document.querySelector(".weather__past");
    weatherForecast.innerHTML = weekWeather.render()

}).catch((err) => {
    //DIVING DEEPER A CLASS TO TELL THE USER THAT THE WEATHER COULD NOT BE RETRIEVED
    console.log(err)

});
