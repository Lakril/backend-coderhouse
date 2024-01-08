

//* ------------------------------------ DELETE BUTTON ------------------------------------ *//
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

//* --------------------- MODAL --------------------- //

// modal with HTML dialog Element
// https://blog.webdevsimplified.com/2023-04/html-dialog/
const openButton = document.querySelector("#updateDetails");
const dialog = document.querySelector('dialog');
const closeDialog = document.querySelector('#closeDialog');

openButton?.addEventListener('click', () => {
    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        alert("The dialog API is not supported by this browser");
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
    console.log(data)
    
    
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
}

const submitButtons = document.getElementById('post-button');


submitButtons?.addEventListener('click', (event) => {    
    event.preventDefault();
    submitPost();
    dialog.close();
})



//* ------------------------------------ PUT ------------------------------------ *//
const formPut = document.querySelector('.form-put');

const submitPut = async () => {
    const formData = new FormData(formPut);
    const data = Object.fromEntries(formData);
    console.log(data)

    // get id from submit button
    const submitButton = document.getElementById('put-button');
    const id = submitButton.dataset.id;
    console.log(id);

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
})



// //* ------------------------------------ CART ------------------------------------ *//
// // const cart = document.getElementsByClassName('add-cart');
// // const cartItems = document.querySelector('.cart-items');
// // const cartTotal = document.querySelector('.cart-total');
// // const cartButton = document.querySelector('.cart-button');
// // const cartClose = document.querySelector('.cart-close');
// // const cartContent = document.querySelector('.cart-content');
// // const cartOverlay = document.querySelector('.cart-overlay');
// // const cartDOM = document.querySelector('.cart');
// // const cartContentDOM = document.querySelector('.cart-content');

// // let buttonsDOM = [];

// // console.log(cart[0].dataset.id);

// // const buttons = [...document.querySelectorAll('.add-cart')];
// // buttonsDOM = buttons;
// // buttons.forEach((button) => {
// //     const id = button.dataset.id;
// //     console.log(id)
// //     // const inCart = cartArray.find((item) => item._id === id);
// //     // if (inCart) {
// //     //     button.innerText = 'In Cart';
// //     //     button.disabled = true;
// //     // }
// //     // button.addEventListener('click', (event) => {
// //     //     event.target.innerText = 'In Cart';
// //     //     event.target.disabled = true;
// //     //     // get product from products
// //     //     const cartItem = { ...Storage.getProduct(id), amount: 1 };
// //     //     // add product to the cart
// //     //     cartArray = [...cartArray, cartItem];
// //     //     // save cart in local storage
// //     //     Storage.saveCart(cartArray);
// //     //     // set cart values
// //     //     this.setCartValues(cartArray);
// //     //     // display cart item
// //     //     this.addCartItem(cartItem);
// //     //     // show the cart
// //     //     this.showCart();
// //     // });
// // });

// // cart
// // let cartArray = [];

// // buttons

// // get products
// // class Products {
// //     async getProducts() {
// //         try {
// //             const response = await fetch('/api/products');
// //             response.json().then((data) => {
// //                 console.log(data);
// //             });
// //             if (!response.ok) {
// //                 throw new Error(`HTTP error! status: ${response.status}`);
// //             }
// //             const result = await response.json();
// //             console.log(result);
// //             return result;
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     }
// // }

// // const products = new Products();
// // products.getProducts();
// // fetch('/api/products').then((res) => console.log(res));



// function fechData() {
//     fetch('/api/products').then(res => {
//         if (!res.ok) {
//             throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//     }).then(data => {
//         console.log(data.data);
//     })
// } 

// fechData();


// async function getProducts() {
//     try {
//         const response = await fetch('/api/products');
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const result = await response.json();
//         console.log(result)
//         return result;
//     } catch (error) {
//         console.log(error);
//     }
// }

// // get products
// getProducts().then((products) => {
//     console.log(products)
//     // const ui = new UI();
//     // ui.displayProducts(products);
//     // Storage.saveProducts(products);
//     // ui.getBagButtons();
// }

// // display products
// class UI {
//     displayProducts(products) {
//         let result = '';
//         products.forEach((product) => {
//             result += `
//             <article class="product">
//                 <div class="img-container">
//                     <img src="${product.image}" alt="${product.title}" class="product-img" />
//                     <button class="bag-btn" data-id="${product._id}">
//                         <i class="fas fa-shopping-cart"></i>
//                         add to cart
//                     </button>
//                 </div>
//                 <h3>${product.title}</h3>
//                 <h4>$${product.price}</h4>
//             </article>
//             `;
//         });
//         cartItems.innerHTML = result;
//     }

//     getBagButtons() {
//         const buttons = [...document.querySelectorAll('.bag-btn')];
//         buttonsDOM = buttons;
//         buttons.forEach((button) => {
//             const id = button.dataset.id;
//             const inCart = cartArray.find((item) => item._id === id);
//             if (inCart) {
//                 button.innerText = 'In Cart';
//                 button.disabled = true;
//             }
//             button.addEventListener('click', (event) => {
//                 event.target.innerText = 'In Cart';
//                 event.target.disabled = true;
//                 // get product from products
//                 const cartItem = { ...Storage.getProduct(id), amount: 1 };
//                 // add product to the cart
//                 cartArray = [...cartArray, cartItem];
//                 // save cart in local storage
//                 Storage.saveCart(cartArray);
//                 // set cart values
//                 this.setCartValues(cartArray);
//                 // display cart item
//                 this.addCartItem(cartItem);
//                 // show the cart
//                 this.showCart();
//             });
//         });
//     }

//     setCartValues(cart) {
//         let tempTotal = 0;
//         let itemsTotal = 0;
//         cart.map((item) => {
//             tempTotal += item.price * item.amount;
//             itemsTotal += item.amount;
//         });
//         cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
//         cartItems.innerText = itemsTotal;
//     }

//     addCartItem(item) {
//         const div = document.createElement('div');
//         div.classList.add('cart-item');
//         div.innerHTML = `
//         <img src="${item.image}" alt="${item.title}" />
//         <div>
//             <h4>${item.title}</h4>
//             <h5>$${item.price}</h5>
//             <span class="remove-item" data  -id="${item._id}">remove</span>
//         </div>
//         <div>
//             <i class="fas fa-chevron-up" data-id="${item._id}"></i>
//             <p class="item-amount">${item.amount}</p>
//             <i class="fas fa-chevron-down" data-id="${item._id}"></i>
//         </div>
//         `;
//         cartContent.appendChild(div);
//     }

//     showCart() {
//         cartOverlay.classList.add('transparentBcg');
//         cartDOM.classList.add('showCart');
//     }
// }

// // local storage
// class Storage {
//     static saveProducts(products) {
//         localStorage.setItem('products', JSON.stringify(products));
//     }

//     static getProduct(id) {
//         const products = JSON.parse(localStorage.getItem('products'));
//         return products.find((product) => product._id === id);
//     }

//     static saveCart(cart) {
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }

//     static getCart() {
//         return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
//     }
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     const ui = new UI();
//     const products = new Products();

//     // get all products
//     const productsList = await products.getProducts();
//     ui.displayProducts(productsList);
//     Storage.saveProducts(productsList);
//     ui.getBagButtons();
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const ui = new UI();
//     const products = new Products();

//     get all products
//     const productsList = products.getProducts().then((productsList) => {
//         ui.displayProducts(productsList);
//         Storage.saveProducts(productsList);
//         ui.getBagButtons();
//     });
// });

// // cart setup
// function setupAPP() {
//     cartArray = Storage.getCart();
//     ui.setCartValues(cartArray);
//     this.populateCart(cartArray);
//     cartButton.addEventListener('click', this.showCart);
//     cartClose.addEventListener('click', this.hideCart);
// }
