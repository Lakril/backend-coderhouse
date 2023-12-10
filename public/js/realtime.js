

const socketClient = io(
    'http://localhost:8080',
    { autoConnect: true }
);

socketClient.on('products-realtime', (data) => {
    updateProductlist(data)
});

function updateProductlist(data) {
    console.log('Que pasa')
    console.log(data);
    const myProducts = document.querySelector('#myProducts');
    myProducts.innerHTML = '';
        data.forEach(product => {
            myProducts.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td><img src="${product.thumbnails[0]}" alt="" width="50"></td>
            </tr>`;
        });

}

