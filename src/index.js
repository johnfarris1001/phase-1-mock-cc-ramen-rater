const ramenURL = 'http://localhost:3000/ramens'

document.addEventListener('DOMContentLoaded', () => {
    fetch(ramenURL)
        .then(resp => resp.json())
        .then(data => {
            renderRamens(data)
            const detailDiv = document.getElementById('ramen-detail')
            detailDiv.children[0].src = data[0].image
            detailDiv.children[0].id = `img-${data[0].id}`
            detailDiv.children[1].textContent = data[0].name
            detailDiv.children[2].textContent = data[0].restaurant
            document.getElementById('rating-display').textContent = data[0].rating
            document.getElementById('comment-display').textContent = data[0].comment
        })

    const form = document.getElementById('new-ramen')
    form.addEventListener('submit', event => {
        event.preventDefault()
        const name = form.elements.name.value
        const restaurant = form.elements.restaurant.value
        const image = form.elements.image.value
        const rating = form.elements.rating.value
        const comment = form.elements['new-comment'].value

        addRamen(name, restaurant, image, rating, comment)

        document.getElementById('new-name').value = ''
        document.getElementById('new-restaurant').value = ''
        document.getElementById('new-image').value = ''
        document.getElementById('new-rating').value = ''
        document.getElementById('new-comment').value = ''
    })

    const updateForm = document.getElementById('edit-ramen')
    updateForm.addEventListener('submit', event => {
        event.preventDefault()
        const detailDiv = document.getElementById('ramen-detail')
        const ramenId = Number(detailDiv.children[0].id.substring(4))

        updateRamen(ramenId, event.target[0].value, event.target[1].value)

        event.target[0].value = ''
        event.target[1].value = ''
    })

    const deleteBtn = document.getElementById('delete')
    deleteBtn.addEventListener('click', () => {
        const detailDiv = document.getElementById('ramen-detail')
        const ramenId = Number(detailDiv.children[0].id.substring(4))
        deleteRamen(ramenId)
    })
})

function renderRamens(ramens) {
    const div = document.getElementById('ramen-menu')
    ramens.forEach(element => {
        const img = document.createElement('img')
        img.src = element.image
        div.appendChild(img)

        img.addEventListener('click', () => {
            const detailDiv = document.getElementById('ramen-detail')
            detailDiv.children[0].src = element.image
            detailDiv.children[0].id = `img-${element.id}`
            detailDiv.children[1].textContent = element.name
            detailDiv.children[2].textContent = element.restaurant
            document.getElementById('rating-display').textContent = element.rating
            document.getElementById('comment-display').textContent = element.comment
        })
    });
}

function renderRamen(ramen) {
    const div = document.getElementById('ramen-menu')
    const img = document.createElement('img')
    img.src = ramen.image
    div.appendChild(img)

    img.addEventListener('click', () => {
        const detailDiv = document.getElementById('ramen-detail')
        detailDiv.children[0].src = ramen.image
        detailDiv.children[0].id = `img-${ramen.id}`
        detailDiv.children[1].textContent = ramen.name
        detailDiv.children[2].textContent = ramen.restaurant
        document.getElementById('rating-display').textContent = ramen.rating
        document.getElementById('comment-display').textContent = ramen.comment
    })
}


function addRamen(name, restaurant, image, rating, comment) {
    const ramenObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            name,
            restaurant,
            image,
            rating,
            comment
        })
    }

    fetch(ramenURL, ramenObj)
        .then(resp => resp.json())
        .then(data => renderRamen(data))
}

function updateRamen(ramenId, rating, comment) {
    document.getElementById('rating-display').textContent = rating
    document.getElementById('comment-display').textContent = comment

    const ramenUpdateObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            rating,
            comment
        })
    }

    fetch(`${ramenURL}/${ramenId}`, ramenUpdateObj)
}

function deleteRamen(id) {
    fetch(`${ramenURL}/${id}`, { method: 'DELETE' })
        .then(resp => resp.json())
        .then(() => {
            fetch(ramenURL)
                .then(resp => resp.json())
                .then(data => {
                    document.getElementById('ramen-menu').innerHTML = ''
                    renderRamens(data)
                    const detailDiv = document.getElementById('ramen-detail')
                    detailDiv.children[0].src = data[0].image
                    detailDiv.children[0].id = `img-${data[0].id}`
                    detailDiv.children[1].textContent = data[0].name
                    detailDiv.children[2].textContent = data[0].restaurant
                    document.getElementById('rating-display').textContent = data[0].rating
                    document.getElementById('comment-display').textContent = data[0].comment
                })
        })
}