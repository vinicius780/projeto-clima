document.querySelector(".busca").addEventListener("submit", async (Event) => {
Event.preventDefault()

let input = document.querySelector("#searchInput").value;
console.log(input)

if(input !== "") {
    clearInfo()
showWarning("carregando...")

let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=feaf7df9b4d96c08d1f72e6c3b97d9d0&units=metric&lang=pt_br`;

let result = await fetch(url)
let json = await result.json()
console.log(json)

if(json.cod === 200) {
    showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
    })
} else {
    clearInfo()
    showWarning("Não encontramos sua localização")
}
}
})

function showInfo(json) {
    showWarning ('')
    document.querySelector(".resultado").style.display = "block"

    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed}`

    document.querySelector(".temp img").setAttribute("src" , `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle -90}deg)`
}

function clearInfo() {
    showWarning("")
    document.querySelector(".resultado").style.display = "none";
}
function showWarning(msg) {
    document.querySelector(".aviso").innerHTML = msg
}