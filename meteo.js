
function fetchWeather() {
    fetch('conf.json') // Charge les données du fichier JSON
        .then(response => response.json()) // Convertion des données JSON en objet JavaScript
        .then(city => {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=${city.apikey}&units=metric&lang=fr`;

            fetch(url) // Requête vers l'API OpenWeatherMap
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    let description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);

                    document.querySelector("#city").innerHTML =
                        `<i class="fa-solid fa-city"></i> ` + data.name + ", " + data.sys.country;
                    document.querySelector("#description").innerHTML = description;
                    document.querySelector("#temp").innerHTML =
                        `<i class="fa-solid fa-temperature-three-quarters"></i> ` + data.main.temp + ' °';
                    document.querySelector("#humidity").innerHTML =
                        `<i class="fa-solid fa-droplet"></i> ` + data.main.humidity + ' %';
                    document.querySelector("#wind").innerHTML =
                        `<i class="fa-solid fa-wind"></i> ` + data.wind.speed + ' km/h';
                })
                .catch(err => console.error('Erreur lors de la récupération des données météo :', err));
        })
        .catch(err => console.error('Erreur lors du chargement du fichier JSON :', err));
}

// Appel de la fonction fetchWeather pour récupérer les données météo dès le chargement de la page
fetchWeather();

// Mise à jour des données météo toutes les heures
setInterval(fetchWeather, 3600000);
