const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;
    
    fetch(`http://localhost:3000/weather?address=${location}`)

        .then(response => {
            response.json()

                .then(data => {

                    if (data.error) {
                        messageOne.textContent = data.error;
                    } else {
                        messageTwo.textContent = data.forecast;
                        messageOne.textContent = `${data.latitude}, ${data.longitude}`;
                    }
                });
        });

});