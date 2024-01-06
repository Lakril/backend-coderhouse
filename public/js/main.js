// getElementsByClassName('delete-button') gets all the elements with the class delete-button.
const delElements = document.getElementsByClassName('delete-button');

// console.log(delElements[0].dataset.id);

for (let i = 0; i < delElements.length; i++) {
    // Add a click event listener to each button
    delElements[i].addEventListener('click', function () {
        // this.dataset.id gets the value of the data-id attribute of the clicked button. The this keyword refers to the clicked button.
        const id = this.dataset.id;
        // console.log(id);
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
                // window.location.href = '/api/products';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}

// modal with HTML dialog Element
// https://blog.webdevsimplified.com/2023-04/html-dialog/
const openButton = document.querySelector("div button[id='updateDetails']");
const dialog = document.querySelector('dialog');

openButton?.addEventListener('click', () => {
    dialog.showModal();
});

dialog?.addEventListener('click', (e) => {
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

    // Remove empty values
    Object.keys(data).forEach((key) => {
        if (data[key] === '') {
            delete data[key];
        }
    });

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
        setTimeout(() => {
            window.location.href = '/api/products';
        }, 1000);
    } catch (error) {
        console.error('Error:', error);
    }
};

// ✅ Check if element exists before calling addEventListener()
// (?.) to check if the element is null.
formPost?.addEventListener('submit', (event) => {
    event.preventDefault();
    submitPost();
});

//* ------------------------------------ PUT ------------------------------------ *//
const formPut = document.querySelector('.form-product');

formPut?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formPut);
    const data = Object.fromEntries(formData);
    // console.log(data)

    // get id from submit button
    const submitButton = document.getElementById('put-button');
    const id = submitButton.dataset.id;

    fetch(`/api/products/${id}`, {
        method: 'PUT',
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
            console.log(data);
            // refresh the page after deleting an element
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
