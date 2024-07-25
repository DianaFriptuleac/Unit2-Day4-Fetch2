const apiKey = 'T3zwNVRXfvMwrASAZB5B9iL8bJZnVf4H8yYPohhd1bwhyyWsaoJQbJbw';

const loadImg = (query) => {
    const url = `https://api.pexels.com/v1/search?query=${query}`;
    fetch(url, {
        headers: {
            'Authorization': apiKey
        }
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Non è andata a buon fine');
        }
    })
    .then(data => {
        console.log('data', data);
        const imageContainer = document.getElementById('imageContainer');
        const cards = imageContainer.getElementsByClassName('card');

        data.photos.forEach((photo, i) => {
            if (i < cards.length) {
                const card = cards[i];
                const imgElement = card.querySelector('.card-img-top');
                const cardTitle = card.querySelector('.card-title');
                const cardText = card.querySelector('.card-text');

                imgElement.src = photo.src.medium;
                imgElement.alt = photo.photographer;
                cardTitle.innerText = photo.photographer;
                cardText.innerText = photo.alt;
            }
        });
    })
    .catch(err => {
        console.log('errore', err);
    });
};

const pexelsFetch = () => {
    loadImg('summer');
};

const pexelsSecondFetch = () => {
    loadImg('flowers');
};

document.getElementById('load-images').addEventListener('click', pexelsFetch);
document.getElementById('load-secondary-images').addEventListener('click', pexelsSecondFetch);

// Bottoni
document.getElementById('imageContainer').addEventListener('click', (ev) => {
    if (ev.target.classList.contains('btn-edit')) {
        const buttonChange = ev.target;
        buttonChange.classList.remove('btn-edit');
        buttonChange.classList.add('btn-hide');
        buttonChange.innerText = 'Hide';
        
    } else if (ev.target.classList.contains('btn-hide')) {
        const myCard = ev.target.closest('.card');
        myCard.style.display = 'none';
    }
});
