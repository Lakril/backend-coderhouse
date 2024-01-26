//* ----------------- DELETE BUTTON ------------------------------------ *//
const delElements = document.getElementsByClassName('delete-button');

// console.log(delElements[0].dataset.id);

for (let i = 0; i < delElements.length; i++) {
    // Add a click event listener to each button
    delElements[i].addEventListener('click', function () {
        /* this.dataset.id gets the value of the data-id attribute of the clicked button. 
         The this keyword refers to the clicked button. */
        const id = this.dataset.id;
        // console.log(id);
        /* fetch(/api/products/${id}, {...}) sends a DELETE request to 
        the server with the _id in the URL. */
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
                // window.location.href = '/api/products';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}

//* --------------------- MODAL --------------------- //

// modal with HTML dialog Element
// https://blog.webdevsimplified.com/2023-04/html-dialog/
const openButton = document.querySelector('#updateDetails');
const dialog = document.querySelector('dialog');
const closeDialog = document.querySelector('#closeDialog');

openButton?.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        alert('The dialog API is not supported by this browser');
    }
});

closeDialog?.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        dialog.close();
    }
});

//* ------------------------------------ POST ------------------------------------ *//

const formPost = document.querySelector('.form-products');

const submitPost = async () => {
    const formData = new FormData(formPost);
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(result);
        // setTimeout(() => {
        //     window.location.href = '/api/products';
        // }, 1000);
    } catch (error) {
        console.error('Error:', error);
    }
};

const submitButtons = document.getElementById('post-button');

submitButtons?.addEventListener('click', (event) => {
    event.preventDefault();
    submitPost();
    dialog.close();
});

//* ------------------------------------ PUT BY ID --------------------------------- *//
const formPut = document.querySelector('.form-put');

const submitPut = async () => {
    const formData = new FormData(formPut);
    const data = Object.fromEntries(formData);
    console.log(data);

    // get id from submit button
    const submitButton = document.getElementById('put-button');
    const id = submitButton.dataset.id;

    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(result);
        // setTimeout(() => {
        //     window.location.href = '/api/products';
        // }, 1000);
    } catch (error) {
        console.error('Error:', error);
    }
};

const submitButton = document.getElementById('put-button');
submitButton?.addEventListener('click', (event) => {
    event.preventDefault();
    submitPut();
    dialog.close();
});

//* --------------------------- FILTER ------------------------------------ *//

document.querySelector('.form-filter').addEventListener('submit', function (event) {
    event.preventDefault();
    const category = document.querySelector('#category').value;
    if (category === 'all') {
        window.location.href = '/api/products';
    } else {
        window.location.href = `/api/products?filter=category:${category}`;
    }
});

//* ------------------------------------ CART ------------------------------------ *//
const formCart = document.querySelectorAll('.form-cart');
const submitButtonsCart = document.querySelectorAll('#add-cart');
// console.log(formCart);

const submitCart = async () => {
    for (let i = 0; i < formCart.length; i++) {
        formCart[i].addEventListener('click', function (event) {
            event.preventDefault();
            const id = this.dataset.id;

            const formData = new FormData(formCart[i]);
            // formData.append('_id', id);
            const data = Object.fromEntries(formData);
            console.log(`add to cart: ${data}`);

            fetch(`/api/carts/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    const userConfirmation = confirm(
                        'Item added to cart! Would you like to view your cart now?'
                    );
                    if (userConfirmation) {
                        window.location.href = `/api/carts/${data._id}`;
                    } else {
                        // Refresh the page
                        location.reload();
                    }

                    // reset the form
                    formCart[i].reset();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    }
};

for (let i = 0; i < submitButtonsCart.length; i++) {
    submitButtonsCart[i].addEventListener('click', (event) => {
        event.preventDefault();
        submitCart();
    });
}
