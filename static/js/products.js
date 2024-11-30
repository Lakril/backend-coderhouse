// pagination for products
function loadProducts(page, pagination = true) {
    return fetch(`/api/products?pagination=${pagination}&page=${page}`);
}

let productDiv = document.querySelector('.product'),
    CategoryListDiv = document.querySelector('.CategoryList'),
    allCat = [''],
    paginationDiv = document.querySelector('.links');

let displayPagination = async (products) => {
    paginationDiv.innerHTML = '';
    let totalPages = products.totalPages;
    for (let index = 0; index < totalPages; index++) {
        paginationDiv.innerHTML += `<a href=?page=${index + 1} class="link ${index === 0 ? 'active' : ''}">${index + 1}</a>`;
    }
};

let displayProducts = async (allCheckCat = []) => {
    productDiv.innerHTML = '';
    // pagination.innerHTML = '';
    let response = await loadProducts(true, 1);
    // console.log(response);
    let { payload: products } = await response.json();
    // console.log(products.totalPages);
    products.docs.forEach((element) => {
        // Category data
        if (!allCat.includes(element.category)) {
            CategoryListDiv.innerHTML += `<label>
                <input type="checkbox" onclick='categoryFilter()' value="${element.category}" /> ${element.category}
            </label>`;
            allCat.push(element.category);
        }
        if (allCheckCat.length == 0) {
            allCheckCat = allCat;
            // return;
        }
        if (allCheckCat.includes(element.category)) {
            // Product data
            productDiv.innerHTML += `<div class="productItems">
            <img src="${element.thumbnails}" alt="${element.title}" style="width: 200px; " />
            <h4>${element.category}</h4>
            <p>Price: ${element.price}</p>
            <h3>${element.title}</h3>
            </div>`;
        }
    });
    displayPagination(products);
    let numbers = document.querySelectorAll('.link');
    console.log(numbers);
};

displayProducts();

// let numbers = () => {
//     let links = document.querySelectorAll('.link');
//     links.forEach((link) => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             let page = e.target.textContent;
//             console.log(page);
//             displayProducts([], true, page);
//         });
//     });
// };

// numbers();
// eslint-disable-next-line no-unused-vars
let categoryFilter = () => {
    // alert('categoryFilter');
    let checkInput = document.querySelectorAll('input[type="checkbox"]');
    let checkdata = [];
    checkInput.forEach((element) => {
        if (element.checked) {
            checkdata.push(element.value);
        }
    });
    if (checkdata.length == 0) {
        displayProducts(checkdata, true, 1);
    } else {
        displayProducts(checkdata, true, 1);
    }
};

// // Selecting DOM elements
// const startBtn = document.querySelector('#startBtn'),
//     endBtn = document.querySelector('#endBtn'),
//     prevNext = document.querySelectorAll('.prevNext'),
//     numbers = document.querySelectorAll('.link');

// Setting an initial step
// let currentStep = 0;

// // Function to update the button states
// const updateBtn = () => {
//     // If we are at the last step
//     if (!hasNextPage) {
//         endBtn.disabled = true;
//         prevNext[1].disabled = true;
//     } else if (!hasPrevPage) {
//         // If we are at the first step
//         startBtn.disabled = true;
//         prevNext[0].disabled = true;
//     } else {
//         endBtn.disabled = false;
//         prevNext[1].disabled = false;
//         startBtn.disabled = false;
//         prevNext[0].disabled = false;
//     }
// };

// // Add event listeners to the number links
numbers.forEach((number, numIndex) => {
    number.addEventListener('click', (e) => {
        e.preventDefault();
        // Set the current step to the clicked number link
        currentStep = numIndex;
        console.log(`currentStep: ${currentStep}`);
        // // Remove the "active" class from the previously active number link
        // document.querySelector('.active').classList.remove('active');
        // // Add the "active" class to the clicked number link
        // number.classList.add('active');
        // updateBtn(); // Update the button states
    });
});

// // Add event listeners to the "Previous" and "Next" buttons
// prevNext.forEach((button) => {
//     button.addEventListener('click', (e) => {
//         // Increment or decrement the current step based on the button clicked
//         currentStep += e.target.id === 'next' ? 1 : -1;
//         numbers.forEach((number, numIndex) => {
//             // Toggle the "active" class on the number links based on the current step
//             number.classList.toggle('active', numIndex === currentStep);
//             updateBtn(); // Update the button states
//         });
//     });
// });

// // Add event listener to the "Start" button
// startBtn.addEventListener('click', () => {
//     // Remove the "active" class from the previously active number link
//     document.querySelector('.active').classList.remove('active');
//     // Add the "active" class to the first number link
//     numbers[0].classList.add('active');
//     currentStep = 0;
//     updateBtn(); // Update the button states
//     endBtn.disabled = false;
//     prevNext[1].disabled = false;
// });

// // Add event listener to the "End" button
// endBtn.addEventListener('click', () => {
//     // Remove the "active" class from the previously active number link
//     document.querySelector('.active').classList.remove('active');
//     // Add the "active" class to the last number link
//     numbers[4].classList.add('active');
//     currentStep = 4;
//     updateBtn(); // Update the button states
//     startBtn.disabled = false;
//     prevNext[0].disabled = false;
// });
