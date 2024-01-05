const delElements = document.getElementsByClassName('delete-button');

console.log(delElements[0].dataset.id);


for (let i = 0; i < delElements.length; i++) {
    delElements[i].addEventListener('click', function() {
        const id = this.dataset.id;
        console.log(id);

        fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}


// const title = titleElement.textContent;

// fetch('/api/products', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ title }),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => {
//     console.error('Error:', error);
// });

