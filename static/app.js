let getButton = document.getElementById('get-btn');
let addButton = document.getElementById('add-btn');
let flavorInput = document.querySelector('#flavor');
let ratingInput = document.querySelector('#rating');
let sizeInput = document.querySelector('#size');
let imageInput = document.querySelector('#image');
let mainContainer = document.querySelector('#cupcakes-container');
let URL = 'http://localhost:5000';

document.addEventListener('DOMContentLoaded', () => {
    const getData = async (e) => {
        e.preventDefault()

        await axios.get(`${URL}/api/cupcakes`).then(response => {
            for (let cupcake of response.data.cupcakes) {
                const flavor = cupcake.flavor;
                const image = cupcake.image;
                const size = cupcake.size;
                const rating = cupcake.rating;
                const cupcakeDiv = document.createElement('div');

                const flavorEl = document.createElement('p');
                flavorEl.textContent = flavor;
                const imageEl = document.createElement('img');
                imageEl.setAttribute('src', image);
                const sizeEl = document.createElement('p');
                sizeEl.textContent = size;
                const ratingEl = document.createElement('span')
                ratingEl.textContent = rating;
                cupcakeDiv.append(flavorEl, imageEl, sizeEl, ratingEl);

                mainContainer.appendChild(cupcakeDiv);
                
            }
        })
    }

    const postData = async (e) => {
        e.preventDefault();

        let flavor = flavorInput.value;
        let rating = ratingInput.value;
        let size = sizeInput.value;
        let image = imageInput.value;

        await axios.post(`${URL}/api/cupcakes`, {
            flavor,
            rating,
            size,
            image
        }).then(response => {
            alert('CREATED THE CUPCAKE!')
            console.log(response)
        })

        flavorInput.value = '';
        ratingInput.value = '';
        sizeInput.value = '';
        imageInput.value = '';
    }

    getButton.addEventListener('click', getData);
    addButton.addEventListener('click', postData);

});