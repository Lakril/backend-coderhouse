// eslint-disable-next-line no-undef
const socketClient = io({});

socketClient.on('products-realtime', (data) => {
    const myProducts = document.querySelector('tbody');
    myProducts.innerHTML = '';
    data.forEach((product) => {
        myProducts.innerHTML += `
            <tr>
                <td><button class="delete-button" type='submit' id="${product.id}" >Delete</button></td>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><img src="${product.thumbnails[0]}" alt="" width="50"></td>
            </tr>`;
    });

    // Get all the elements with tag name 'button'
    const elements = document.getElementsByTagName('button');
    // console.log(elements)
    Array.from(elements).forEach((element) => {
        element.addEventListener('click', () => {
            const id = element.id;
            socketClient.emit('remove-product', id);
        });
    });
});
