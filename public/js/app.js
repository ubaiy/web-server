const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('testing!')
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
                messageOne.textContent =  data.error
                messageTwo.textContent = ''
        }else{
                messageOne.textContent = data.location
                messageTwo.textContent =  data.Forecast
        }
        })
    })
})