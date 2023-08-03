        //Your secret key
        
        const apiKey = "b-------------------------------4";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");




        async function checkWeather(city){
            const response = await fetch(apiUrl + city +`&appid=${apiKey}`);


            if(response.status == 404){
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                document.querySelector("footer").style.display = "none";   

            }else{
                
            var data = await response.json();

            document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
            document.querySelector(".description").innerHTML = data.weather[0].description;


            // setting current date.
            let now = new Date();
            let date = document.querySelector('.weather .date');
            date.innerHTML = dateBuilder(now);


            // Fetching current weather Icon.
            weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
 
            
            
            document.querySelector(".weather").style.display = "block";
            document.querySelector("footer").style.display = "block";   

            document.querySelector(".error").style.display = "none";

        }

        }

        //adding keypress event listener to inputbox
         searchBox.addEventListener("keypress", setQuery);

         // when user enter city and and click the enter button, it fetches the current data
        function setQuery(e) {
         // 13 is key code for enter key
        if (e.keyCode == 13) {
        checkWeather(searchBox.value);
        
        }
        }

        // Adding Click to the search button.

        searchBtn.addEventListener("click", ()=>{
            checkWeather(searchBox.value);
        });

        // Fetching today's date
        function dateBuilder(d) {
          let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

          let day = days[d.getDay()];
          let date = d.getDate();
          let month = months[d.getMonth()];
          let year = d.getFullYear();

          return `${day}, ${date} ${month} ${year}`;
        }

