// eslint-disable-next-line
const socketClient = io({});

const form = document.querySelector('form');
form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const thumbnailsValue = document.getElementById('image').value;

    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value || undefined,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        status: document.getElementById('status').checked ? true : false,
        category: document.getElementById('category').value,
        ...(thumbnailsValue ? { thumbnails: [thumbnailsValue] } : undefined),
    };

    socketClient.emit('add-product', product);
    form.reset();
});

socketClient.on('products-realtime', (data) => {
    const myProducts = document.querySelector('tbody');
    myProducts.innerHTML = '';
    data.forEach((product) => {
        myProducts.innerHTML += `
            <tr>
                <td>
                <button class="delete-button" 
                type='submit' id="${product._id}" >Delete</button></td>
                <td>${product._id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><img src="${product.thumbnails[0]}" alt="" width="50"></td>
            </tr>`;
    });

    // Select the dropdown
    const categories = document.querySelector('#category-list');
    // get all the categories
    const categoryNames = data.map((product) => product.category);
    // Remove duplicates
    const uniqueCategories = [...new Set(categoryNames)];
    // Add the categories to the dropdown
    uniqueCategories.forEach((category) => {
        // Create a new option
        const newOption = document.createElement('option');
        newOption.value = category;
        newOption.innerText = category;
        // Append the new option to the dropdown
        categories.appendChild(newOption);
    });

    // Get all the elements with tag name 'button'
    const elements = document.getElementsByClassName('delete-button');
    Array.from(elements).forEach((element) => {
        element.addEventListener('click', () => {
            const id = parseInt(element.id);
            socketClient.emit('remove-product', id);
        });
    });
});
