// getElementsByClassName('delete-button') gets all the elements with the class delete-button.
const delElements = document.getElementsByClassName('delete-button');

console.log(delElements[0].dataset.id);

for (let i = 0; i < delElements.length; i++) {
    // Add a click event listener to each button
    delElements[i].addEventListener('click', function () {
        // this.dataset.id gets the value of the data-id attribute of the clicked button. The this keyword refers to the clicked button.
        const id = this.dataset.id;
        console.log(id);
        // fetch(/api/products/${id}, {...}) sends a DELETE request to the server with the _id in the URL.
        fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // refresh the page after deleting an element
                // location.reload();
                // redirect to another webpage after deleting an element
                window.location.href = '/api/products';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}
