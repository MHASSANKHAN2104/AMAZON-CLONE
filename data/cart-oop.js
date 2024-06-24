import { products } from "../data/products.js";
import { deliveryOptions } from "./deliveryoptions.js";


const cart = { 
    cartItems:undefined,
    loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop')); 
    
        if(!this.cartItems){

        this.cartItems=[
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            deliveryOptionId: '1',
            quantity: 2
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            deliveryOptionId: '2',
            quantity: 1
        }];
    }
    
},
        saveToLocalStorage() {
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
},

totalQuantity: cart.reduce((acc, item) => acc + item.quantity, 0),

addToCart(productId) {
    let productFound = false;

    for (let i = 0; i < this.cartItems.length; i++) {
        if (productId === this.cartItems[i].productId) {
            this.cartItems[i].quantity += 1;
            totalQuantity += 1;
            productFound = true;
            break;
        }
    }

    if (!productFound) {
        totalQuantity += 1;
        this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    this.saveToLocalStorage();
    return totalQuantity;
},

update_cart(productId) {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.saveToLocalStorage();
},

updateDeliveryOption(productId,deliveryOptionId)
{

    let matchingProduct;
    for(let i=0;i<this.cartItems.length;i++)
    {
        if(productId===this.cartItems[i].productId)
        {
            matchingProduct=this.cartItems[i];
            
        }
    }
    
    matchingProduct.deliveryOptionId=deliveryOptionId;
    this.saveToLocalStorage();
}
};


 cart.loadFromStorage();