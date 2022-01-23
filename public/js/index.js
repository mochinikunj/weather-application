const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    msg1.textContent = 'Loading.....';
    msg2.textContent = '';

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((body) => {
            if (body.error) {
                msg1.textContent = body.error;
            } else {
                msg1.textContent = body.location;
                msg2.textContent = body.forecast;
            }
        });
    });
});