const api = {
  apiKey: "68a3a94afcee668220cdec34c471e483",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
};

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", setQuery);

function setQuery(event) {
  event.preventDefault();
  const searchBox = document.querySelector(".search-box").value;
  getDailyResults(searchBox);
  getFiveDaysResults(searchBox);
}

  function getDailyResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.apiKey}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayDailyResults)
      .catch((err) => {
        alert(`${err}: Please enter a valid city or check your internet connection`);
      });
  }

  

  function displayDailyResults(weather) {
    console.log(weather);

  
    if (typeof(Storage) !== "undefined") {  

      localStorage.setItem('weather', JSON.stringify(weather))
  
      let city = document.querySelector(".dashboard-state"),
      now = new Date(),
      
      date = document.querySelector(".dashboard-date"),


      degrees = document.querySelector(".dashboard-deg"),


      description = document.querySelector(".description"),


      wind = document.querySelector(".parameters .wind"),


      humidity = document.querySelector(".parameters .humidity");
    

      // document.getElementById("name").innerHTML = JSON.parse( localStorage.getItem("weather") )

  
  
      let setDate = dateBuilder(now);
      localStorage.setItem('date', setDate)
      city.innerText = `${JSON.parse( localStorage.getItem("weather")).name}, \n ${JSON.parse( localStorage.getItem("weather") ).sys.country}`

      date.innerText = ` ${localStorage.getItem('date')}`;


      degrees.innerHTML = `${Math.round(JSON.parse( localStorage.getItem("weather") ).main.temp)}<span>&deg;C</span>`

      
      description.innerText = `${JSON.parse( localStorage.getItem("weather") ).weather[0].description}`

     
      wind.innerText = `${JSON.parse( localStorage.getItem("weather") ).wind.speed} m/s`;

      
      humidity.innerText = `${JSON.parse( localStorage.getItem("weather") ).main.humidity} %`;
      
      icon = `${JSON.parse( localStorage.getItem("weather") ).weather[0].icon}`
      getIcon(icon)

      // localStorage.removeItem('weather')
     }
   
     else {  
      aler(`storage is not supported`);
   }
    
      

        

  }
  



function dateBuilder(d) {
  let months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec",
    ],
    date = d.getDate(),
    month = months[d.getMonth()],
    year = d.getFullYear();

  return `\n ${date} ${month}, ${year}`;
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat" ]

  function getFiveDaysResults(query) {
      fetch(`${api.baseUrl}forecast?q=${query}&units=metric&APPID=${api.apiKey}`)
      .then((fiveDaysForecast) => {
        return fiveDaysForecast.json();
      })
      .then(displayFiveDaysResults);
  }

  function displayFiveDaysResults(fiveDaysForecast) {
  
    console.log(fiveDaysForecast);
    
    let weeklyForecastLeft=``;
    let rowCount2 = fiveDaysForecast.list.length;
     
    for ( i = 0; i < rowCount2; i+=8) {

        

      //localStorage.setItem('displayFiveDaysResults', JSON.stringify(fiveDaysForecast.list[i]));
        let 

           //timeStamp = `${JSON.parse(localStorage.getItem("displayFiveDaysResults")).dt_txt}`,
           time = new Date(fiveDaysForecast.list[i].dt_txt),

            day = `${days[time.getDay()]}, ${time.getDate()} `


            tempMin =` ${Math.round(fiveDaysForecast.list[i].main.temp_min)}`,

            
            tempMax =` ${Math.round(fiveDaysForecast.list[i].main.temp_min)}`;


            weeklyForecastLeft +=`${renderWeeklyForecastLeft(day,tempMin,tempMax)}`;
            //fiveDaysForecast.list[i].weather[0].icon = `${JSON.parse(localStorage.getItem("displayFiveDaysResults")).weather[0].icon}`

        let iconDaily0 = fiveDaysForecast.list[0].weather[0].icon; 
        let iconDaily1 = fiveDaysForecast.list[1].weather[0].icon;
        let iconDaily2 = fiveDaysForecast.list[2].weather[0].icon;
        let iconDaily3 = fiveDaysForecast.list[3].weather[0].icon;
        let iconDaily4 = fiveDaysForecast.list[4].weather[0].icon;
        getIconDaily0(iconDaily0)
        getIconDaily1(iconDaily1)
        getIconDaily2(iconDaily2)
        getIconDaily3(iconDaily3)
        getIconDaily4(iconDaily4)

           
            
    }

    document.querySelector('.weekly-forecast-left').innerHTML = weeklyForecastLeft;
    function renderWeeklyForecastLeft(day, tempMin, tempMax) {
      return `<div class="weekly-forecast">
      <p>${day}</p>
      <p>${tempMax}&deg;/${tempMin}&deg;</p>
  </div>`
    }

    return weeklyForecastLeft;
  }


  function getIcon(newIcon) {
    let skycons = new Skycons({ color: "black" });
    switch (newIcon) {
      case "01d":
        skycons.set("weatherIcon", "clear-day");
        break;
      case "01n":
        skycons.set("weatherIcon", "clear-night");
        break;
      case "02d":
        skycons.set("weatherIcon", "partly-cloudy-day");
        break;
      case "02n":
        skycons.set("weatherIcon", "partly-cloudy-night");
        break;
      case "03d":
      case "03n":  
      case "04d":
      case "04n":  
        skycons.set("weatherIcon", "cloudy");
        break;
      case "09d":
      case "10d":
      case "10n":
      case "11n":     
        skycons.set("weatherIcon", "rain");
        break;
      case "13d":
        skycons.set("weatherIcon", "snow");
        break;
      case "50d":
        skycons.set("weatherIcon", "fog");
        break;

      default:
        skycons.set("weatherIcon", "clear-day");

  }
  skycons.play();
} 
function getIconDaily0(iconDaily0) {
  let skycons = new Skycons({ color: "black" });
  switch (iconDaily0) {
    case "01d":
      skycons.set("weather0", "clear-day");
      break;
    case "01n":
      skycons.set("weather0", "clear-night");
      break;
    case "02d":
      skycons.set("weather0", "partly-cloudy-day");
      break;
    case "02n":
      skycons.set("weather0", "partly-cloudy-night");
      break;
    case "03d":
    case "03n":  
    case "04d":
    case "04n":  
      skycons.set("weather0", "cloudy");
      break;
    case "09d":
    case "10d":
    case "10n":
    case "11n":     
      skycons.set("weather0", "rain");
      break;
    case "13d":
      skycons.set("weather0", "snow");
      break;
    case "50d":
      skycons.set("weather0", "fog");
      break;

    default:
      skycons.set("weather0", "clear-day");

}
skycons.play();
} 

function getIconDaily1( iconDaily1) {
  let skycons = new Skycons({ color: "black" });
  switch (iconDaily1) {
    case "01d":
      skycons.set("weather1", "clear-day");
      break;
    case "01n":
      skycons.set("weather1", "clear-night");
      break;
    case "02d":
      skycons.set("weather1", "partly-cloudy-day");
      break;
    case "02n":
      skycons.set("weather1", "partly-cloudy-night");
      break;
    case "03d":
    case "03n":  
    case "04d":
    case "04n":  
      skycons.set("weather1", "cloudy");
      break;
    case "09d":
    case "10d":
    case "10n":
    case "11n":     
      skycons.set("weather1", "rain");
      break;
    case "13d":
      skycons.set("weather1", "snow");
      break;
    case "50d":
      skycons.set("weather1", "fog");
      break;

    default:
      skycons.set("weather1", "clear-day");

}
skycons.play();
} 

function getIconDaily2( iconDaily2) {
  let skycons = new Skycons({ color: "black" });
  switch (iconDaily2) {
    case "01d":
      skycons.set("weather2", "clear-day");
      break;
    case "01n":
      skycons.set("weather2", "clear-night");
      break;
    case "02d":
      skycons.set("weather2", "partly-cloudy-day");
      break;
    case "02n":
      skycons.set("weather2", "partly-cloudy-night");
      break;
    case "03d":
    case "03n":  
    case "04d":
    case "04n":  
      skycons.set("weather2", "cloudy");
      break;
    case "09d":
    case "10d":
    case "10n":
    case "11n":     
      skycons.set("weather2", "rain");
      break;
    case "13d":
      skycons.set("weather2", "snow");
      break;
    case "50d":
      skycons.set("weather2", "fog");
      break;

    default:
      skycons.set("weather2", "clear-day");

}
skycons.play();
}

function getIconDaily3( iconDaily3) {
  let skycons = new Skycons({ color: "black" });
  switch (iconDaily3) {
    case "01d":
      skycons.set("weather3", "clear-day");
      break;
    case "01n":
      skycons.set("weather3", "clear-night");
      break;
    case "02d":
      skycons.set("weather3", "partly-cloudy-day");
      break;
    case "02n":
      skycons.set("weather3", "partly-cloudy-night");
      break;
    case "03d":
    case "03n":  
    case "04d":
    case "04n":  
      skycons.set("weather3", "cloudy");
      break;
    case "09d":
    case "10d":
    case "10n":
    case "11n":     
      skycons.set("weather3", "rain");
      break;
    case "13d":
      skycons.set("weather3", "snow");
      break;
    case "50d":
      skycons.set("weather3", "fog");
      break;

    default:
      skycons.set("weather3", "clear-day");

}
skycons.play();
}

function getIconDaily4(iconDaily4) {
  let skycons = new Skycons({ color: "black" });
  switch (iconDaily4) {
    case "01d":
      skycons.set("weather4", "clear-day");
      break;
    case "01n":
      skycons.set("weather4", "clear-night");
      break;
    case "02d":
      skycons.set("weather4", "partly-cloudy-day");
      break;
    case "02n":
      skycons.set("weather4", "partly-cloudy-night");
      break;
    case "03d":
    case "03n":  
    case "04d":
    case "04n":  
      skycons.set("weather4", "cloudy");
      break;
    case "09d":
    case "10d":
    case "10n":
    case "11n":     
      skycons.set("weather4", "rain");
      break;
    case "13d":
      skycons.set("weather4", "snow");
      break;
    case "50d":
      skycons.set("weather4", "fog");
      break;

    default:
      skycons.set("weather4", "clear-day");

}
skycons.play();
}
//   


//Registering the service worker

if (!('serviceWorker' in navigator)) {
  console.log('Service Worker not supported');

}
navigator.serviceWorker.register('./serviceWorker.js')
.then((registration) => {
  console.log('SW registered! Scope is:', registration.scope)
})
.catch((err) => {
  console.log('Oops, sorry!', err);
})

  
 
