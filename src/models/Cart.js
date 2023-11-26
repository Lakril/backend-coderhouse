export class Cart {
    constructor(cart) {
        this.items = cart.items || [];
        this.totalItems = cart.totalItems || 0;
        this.totalPrice = cart.totalPrice || 0;
    }
    // Add cart
    addItem(item, id) {
        let cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {
                item: {id:item.id ,title: item.title, price: item.price, thumbnail: item.thumbnail},
                quantity: 0,
                price: 0
            };
        }
        cartItem.quantity++;
        cartItem.price = cartItem.item.price * cartItem.quantity;
        this.totalItems++;
        this.totalPrice += cartItem.item.price;
    }
    // Get cart
    getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

    // Delete cart
    deleteProduct(id) {
        const cartItems = this.items[id];
        if (cartItems) {
            this.totalQuantity -= cartItems.quantity;
            this.totalPrice -= cartItems.totalPrice;
            delete this.items[id];
        }
    }
    // Update cart
    updateProduct(id, quantity) {
        const cartItems = this.items[id];
        if (cartItems) {
            const { item } = cartItems;
            this.totalQuantity -= cartItems.quantity;
            this.totalPrice -= cartItems.totalPrice;
            cartItems.quantity = quantity;
            cartItems.totalPrice = item.price * quantity;
            this.totalQuantity += quantity;
            this.totalPrice += item.price * quantity;
        }
        return cartItems;
    }
}