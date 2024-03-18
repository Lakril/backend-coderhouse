// eslint-disable-next-line no-unused-vars
async function deleteItem(event) {
    const cartId = document?.getElementById('root')?.dataset.cid;
    await fetch(`/api/carts/${cartId}/products/${event}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// eslint-disable-next-line no-unused-vars
async function deleteCart(event) {
    console.log(event);
    await fetch(`/api/carts/${event}/products`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

//* ---------------------------------

// const items = document.getElementById('cartItem').dataset;

// Object.entries(items).forEach(([key, value]) => {
//     console.log(`${key}: ${value}`);
// });
