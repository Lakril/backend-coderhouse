function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const { payload: products } = await response.json();
        console.log(products);
        const productsList = document.querySelector('.products-list');
        if (productsList) {
            productsList.innerHTML = '';
            products.forEach((product) => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-card');
                productElement.innerHTML = `
                    <img src="${sanitizeHTML(product.thumbnails)}" alt="${sanitizeHTML(product.title)}" style="width: 200px; height: 200px;" />
                    <h3>${sanitizeHTML(product.title)}</h3>
                    <p>Description: ${sanitizeHTML(product.description)}</p>
                    <p>Price: ${sanitizeHTML(product.price)}</p>
                    <button id="${sanitizeHTML(product.id)}" class="add-to-cart">Add to cart</button>
                `;
                productsList.appendChild(productElement);
            });
        }
    } catch (error) {
        console.error('Fetch error: ', error);
    }
});
