let getButton = document.getElementById('get-btn')
let addButton = document.getElementById('add-btn')
let flavorInput = document.querySelector('#flavor')
let ratingInput = document.querySelector('#rating')
let sizeInput = document.querySelector('#size')
let imageInput = document.querySelector('#image')

let container = document.getElementById('cupcakes-container')
let URL = 'http://localhost:5000'

const getData = async () => {
    await axios.get(`${URL}/api/cupcakes`).then(response => {
        for (let cupcake of response.data.cupcakes) {
            const flavor = cupcake.flavor
            const image = cupcake.image
            const size = cupcake.size
            const rating = cupcake.rating
            const ckContainer = document.createElement('div')
            
            // const flavorContainer = document.createElement('p')
            // const imageContainer = document.createElement('img')
            // const sizeContainer = document.createElement('p')
            // const ratingContainer = document.createElement('div')

            // flavorContainer.innerHTML = flavor
            // imageContainer.setAttribute('src', image)
            // sizeContainer.innerHTML = size
            // ratingContainer.innerHTML = rating

            // ckContainer.append(flavorContainer)
            // ckContainer.append(imageContainer)
            // ckContainer.append(sizeContainer)
            // ckContainer.append(ratingContainer)

            // container.append(ckContainer)
            
        }
    })
}

const postData = async (e) => {
    e.preventDefault();

    let flavor = flavorInput.value
    let rating = ratingInput.value
    let size = sizeInput.value
    let image = imageInput.value

    await axios.post(`${URL}/api/cupcakes`, {
        flavor,
        rating,
        size,
        image
    }).then(() => {
        alert('CREATED THE CUPCAKE!')
    })
}

getButton.addEventListener('click', getData)
addButton.addEventListener('click', postData)
