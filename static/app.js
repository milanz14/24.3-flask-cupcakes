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
            console.log(response.data.cupcakes)
            for (let cupcake of response.data.cupcakes) {
                const flavor = cupcake.flavor;
                const image = cupcake.image;
                const size = cupcake.size;
                const rating = cupcake.rating;
                const ckContainer = document.createElement('div');
                 
                ckContainer.innerHTML = `
                <div>
                    <h3>${flavor} Cupcake</h3>
                    <h5>Rating: ${rating}</h5>
                    <h6>Size: ${size}</h6>
                    <img src='${image}' alt='cupcake' height="200" width="200">
                </div>`;

                mainContainer.append(ckContainer);
                
            };
        });
    };

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