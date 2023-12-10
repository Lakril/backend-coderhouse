const socket = io('http://localhost:8888');

Swal.fire({
    title: 'Welcome to Chat',
    input: 'text',
    // inputAttributes: {
    //   autocapitalize: "off"
    // },
    showCancelButton: true,
    confirmButtonText: 'Get in',
    allowOutsideClick: false,
}).then((result) => {
    if (result.isConfirmed) {
        startChat(result.value);
        inputMessage?.focus();
    }
});

function startChat(user) {
    const socket = io({
        auth: {
            user,
        },
    });

    socket.on('connect', () => {
        console.log('Connected to the server');

        // Emit an event to the server
        socket.emit('products-get');
    });

    const myProducts = document.querySelector('#myProducts');

    socket.on('products-get', (products) => {
        myProducts.innerHTML = `
        {{#each products}}
        <tr>
            <td>{{id}}</td>
            <td>{{title}}</td>
            <td>{{price}}</td>
            <td>{{stock}}</td>
            <td><img src="{{thumbnails.[0]}}" alt="" width="50"></td>
            </tr>
            {{/each}}`;
    });
}
