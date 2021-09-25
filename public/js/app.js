console.log('Client Side Javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const error_msg = document.querySelector('#error')
const data_msg = document.querySelector('#data')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //to prevent refreshing of the web page
    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((server_data) => {
            if (server_data.error) {
                error_msg.textContent = server_data.error
                data_msg.textContent = ''
            } else {
                error_msg.textContent = ''
                data_msg.textContent = "Your Searched Location is " + server_data.data.Location +
                    ". The Current Temperature is " + server_data.data.Temperature +
                    ". However, it feels like " + server_data.data.Feels_Like +
                    ". The Precipitaion is " + server_data.data.Precipitation +
                    ". And the weather conditions are " + server_data.data.Weather_Conditions + "."
            }
        })
    })
})